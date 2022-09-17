class Produto {

  constructor() {
    this.id = 1;
    this.id_edit = 0;
    this.arrayProdutos = [];
    this.form = this.getElById('form_1');
    this.btnSalvar = this.getElById('btn_salvar');
    this.tbody = this.getElById('tbody');

    this.btnSalvar.addEventListener('click', function() {
      produto.salvar(0);
    });

    this.btnCancelar = this.getElById('btn_cancelar');

    this.btnCancelar.addEventListener('click', function() {
      produto.form.reset();
      this.id_edit = 0;
    });

    this.tbody.addEventListener('click', function(event) {
      event = event || window.event;
      let dataAttr = event.target.dataset;

      if (event.target.nodeName === 'A') {
        if (dataAttr.action === 'delete') {
          produto.deletar(dataAttr.id);
        }
        if (dataAttr.action === 'edit') {
          produto.editar(dataAttr.id);
        }
      }

    });

  }

  editar(id) {
    let localId = parseInt(id);
    const produto = this.arrayProdutos.find(item => item.id === localId);
    this.getElById('produto').value = produto.nome;
    this.getElById('preco').value = produto.preco;
    this.id_edit = localId;
  }

  atualizar() {
    const index = this.arrayProdutos.findIndex(item => item.id == this.id_edit);
    this.arrayProdutos[index].nome = this.getElById('produto').value;
    this.arrayProdutos[index].preco = this.getElById('preco').value;
    this.render();
    this.form.reset();
    this.id_edit = 0;

  console.log('update', this.arrayProdutos[index]);
  }

  adicionar(produto) {
    console.log('add--', this.arrayProdutos.push(produto));
    this.id++;
    this.render();
    this.form.reset();
    this.id_edit = 0;
  }

  render() {

    this.tbody.innerHTML = this.arrayProdutos.map(function(produto){
      return `<tr>
      <td>${produto.id}</td>
      <td>${produto.nome}</td>
      <td>${produto.preco}</td>
      <td class="text-end">
      <a href="#" data-id="${produto.id}" data-action="edit">editar</a>
      <a href="#" data-id="${produto.id}" data-action="delete">deletar</a>
      </td></tr>`;
    }).join('');

    console.log(this.tbody.innerHTML);
    /*
    let htmlProdutos = '';

    this.arrayProdutos.forEach(function(produto) {
      htmlProdutos += `<tr>
      <td>${produto.id}</td>
      <td>${produto.nome}</td>
      <td>${produto.preco}</td>
      <td class="text-end">
      <a href="#" data-id="${produto.id}" data-action="edit">editar</a>
      <a href="#" data-id="${produto.id}" data-action="delete">deletar</a>
      </td></tr>`;
    });

    this.tbody.innerHTML = htmlProdutos;
    */

  }

  lerDados() {
    let produto = {};
    produto.id = this.id;
    produto.nome = this.getElById('produto').value;
    produto.preco = this.getElById('preco').value;
    return produto;
  }

  salvar() {
    let produto = this.lerDados();
    let valid = this.validaCampos(produto);

    if (valid !== '') {
      alert(this.validaCampos(produto));
      return;
    }

    if (this.id_edit == 0) {
      this.adicionar(produto);
    } else {
      this.atualizar(produto);
    }
  }

  validaCampos(produto) {
    let msg = '';

    if (produto.nome == '') {
      msg += 'Informe o nome do produto \n';
    }
    if (produto.preco == '') {
      msg += 'Informe o preço do produto  \n';
    }
    return msg;
  }


  deletar(id) {
    const removeIndex = this.arrayProdutos.findIndex(item => item.id === id);
    this.arrayProdutos.splice(removeIndex, 1);
    //apps.splice( apps.findIndex(a => a.id === 37) , 1);
    this.render();
  }

  getElById(id) {
    return document.getElementById(id);
  }

}
var produto = new Produto();
//console.log(produto);
