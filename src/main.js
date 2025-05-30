
const { Compra }= require('./compra');
const { Produto } = require('./produto'); // Não sei pq ta nao indo o compra e produto
const { Cliente } = require("./cliente");

/*async function executar() {

  const client = new Cliente("1","Teste", "teste@email.com");
  const compra = newCompra()
  await client.inserir();

  await client.buscar();

  await cleint.atualizar({id:"1"},{nome: "Teste2"}, {email:"teste2@email.com"});

  await client.deletar({nome: "Teste"}, {email:"teste@email.com"});

}*/

function cadastrarProduto() {
  p = new Produto(
    prompt("Código de barras: "),
    prompt("Nome do produto: "),
    prompt("Valor do produto: ")
  );

  p.toInsert(() => {});
}

function main(){
  console.log("==========/E-commerce/==========")
  while(true) {
    op = prompt(`
      Selecione uma opção\n
      1- Cadastrar produto\n
      2- Buscar produto\n
      3- Remover produto\n
    `);

    if(op == 0) {
      break;
    }

    switch(op) {
      case 1:
        cadastrarProduto();
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }
}

main();