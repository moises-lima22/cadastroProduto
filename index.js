class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }

  salvar() {
    let produto = this.lerDados();

    if (this.validaCampos()) {
      if (this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.editId, produto);
      }
    }
    console.log(this.arrayProdutos);

    this.enviarDados();
    this.cancelar();
  }

  atualizar(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
        this.arrayProdutos[i].produtoQuantidade = produto.produtoQuantidade;
        this.arrayProdutos[i].preco = produto.preco;
      }
    }
  }

  editarDados(dados) {
    this.editId = dados.id;

    document.getElementById("produto").value = dados.nomeProduto;
    document.getElementById("quantidade").value = dados.produtoQuantidade;
    document.getElementById("preco").value = dados.preco;

    document.getElementById("btn-1").innerText = "Atualizar";
    
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
      iconeEdit.setAttribute(
        "onclick",
        "produto.editarDados(" + JSON.stringify(this.arrayProdutos[i]) + ")"
      );

      td_acoes.appendChild(iconeEdit);

      let iconeDelete = document.createElement("i");
      iconeDelete.className = "bi bi-trash3";
      iconeDelete.setAttribute(
        "onclick",
        "produto.deletar(" + this.arrayProdutos[i].id + ")"
      );

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

    document.getElementById("btn-1").innerText = "Salvar";
    this.editId = null;
  }

  deletar(id) {
    let tbody = document.getElementById("tbody");

    if (confirm(`Deseja deletar o item? ID = ${id}`)) {
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id === id) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }
}

const produto = new Produto();
