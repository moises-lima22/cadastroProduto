class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
  }

  salvar() {
    let produto = this.lerDados();

    if (this.validaCampos()) {
      this.adicionar(produto);
    }
    console.log(this.arrayProdutos);

    this.enviarDados();
    // this.cancelar();
  }

  enviarDados() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let th_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_quantidade = tr.insertCell();
      let td_preco = tr.insertCell();
      let td_valorTotal = tr.insertCell();
      let td_acoes = tr.insertCell();

      th_id.innerText = this.arrayProdutos[i].id;
      td_produto.innerText = this.arrayProdutos[i].nomeProduto;
      td_quantidade.innerText = this.arrayProdutos[i].produtoQuantidade;
      td_preco.innerText = this.arrayProdutos[i].preco;
      td_valorTotal.innerText = this.arrayProdutos[i].preco;

      td_acoes.classList.add("center");

      let iconeEdit = document.createElement("i");
      iconeEdit.className = "bi bi-pencil-square";
      td_acoes.appendChild(iconeEdit);
      
      let iconeDelete = document.createElement("i");
      iconeDelete.className = "bi bi-trash3";
      td_acoes.appendChild(iconeDelete);
    }
  }

  adicionar(produto) {
    this.arrayProdutos.push(produto);
    this.id++;
  }

  lerDados() {
    let produto = {};

    produto.id = this.id;
    produto.nomeProduto = document.getElementById("produto").value;
    produto.produtoQuantidade = document.getElementById("quantidade").value;
    produto.preco = document.getElementById("preco").value;

    return produto;
  }

  validaCampos() {
    let msg = "";
    if (
      document.getElementById("produto").value == "" ||
      document.getElementById("quantidade").value == "" ||
      document.getElementById("preco").value == ""
    ) {
      msg = "Por favor, preencha todos os campos!";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  cancelar() {
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";
  }
}

const produto = new Produto();
