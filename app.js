const { Pedido } = require("./pedido");
const { Produto } = require("./produto");
const { Cliente } = require("./cliente");

/*async function executar() {

  const client = new Cliente("1","Teste", "teste@email.com");
  const compra = new Compra()
  await client.toInsert();

  await client.buscar();

  await cleint.atualizar({id:"1"},{nome: "Teste2"}, {email:"teste2@email.com"});

  await client.deletar({nome: "Teste"}, {email:"teste@email.com"});

}*/

async function cadastrarProduto(callback) {
  let p = new Produto();
  p.setCodigo(1);
  p.setNome("Produto1");
  p.setPreco(500);

  if(p.toInsert() != null) {
    callback(p);
  }
}

async function cadastrarCliente(callback) {
  let c = new Cliente();
  c.setEmail('cliente@email.com');
  c.setNome('Cliente1');

  if(c.toInsert() != null) {
    callback(c);
  }
}

async function realizarPedido(callback) {
  let p = new Pedido();

  let produtos = await Produto.toRead({codigo: 1});
  let clientes = await Cliente.toRead({nome: 'Cliente1'});

  p.setCodigo(15);
  let codigoProduto = produtos[0].codigo;
  let emailCliente = clientes[0].email;

  p.setCodigoProduto(codigoProduto);
  p.setEmailCliente(emailCliente);

  if(p.toInsert() != null) {
    callback(p);
  }
}

async function cancelarPedido(callback) {
  let produtos = await Produto.toRead({codigo: 1});
  let clientes = await Cliente.toRead({nome: 'Cliente1'});

  filtro = {
    codigoProduto: produtos[0].codigo,
    emailCliente: clientes[0].email,
  }

  if(Pedido.toDelete(filtro) != null) {
    callback();
  }
}

async function main() {
  await cadastrarProduto((produto) => {
    console.log(`Produto ${produto.getNome()} cadastrado(a) com sucesso`);
  });

  await cadastrarCliente((cliente) => {
    console.log(`Cliente ${cliente.getNome()} cadastrado(a) com sucesso`);
  });

  await realizarPedido((pedido) => {
    console.log('Pedido realizado com sucesso');
  });

  /*await cancelarPedido(() => {
    console.log('Pedido cancelado com sucesso');
  });*/
}

main();