
const { Compra }= require('./compra');
const { Produto } = require('./produto'); // Não sei pq ta nao indo o compra e produto
const { Cliente } = require("./cliente");

async function executar() {

  const client = new Cliente("1","Teste", "teste@email.com");
  const compra = newCompra()
  await client.inserir();

  await client.buscar();

  await cleint.atualizar({id:"1"},{nome: "Teste2"}, {email:"teste2@email.com"});

  await client.deletar({nome: "Teste"}, {email:"teste@email.com"});

}

executar();