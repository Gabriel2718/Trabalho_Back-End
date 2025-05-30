
const { Compra }= require('./compra');
const { Produto } = require('./produto'); // Não sei pq ta nao indo o compra e produto
const { Cliente } = require("./cliente");
const readlineSync = require('readline-sync');

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
    readlineSync.question("Código de barras: "),
    readlineSync.question("Nome do produto: "),
    readlineSync.question("Valor do produto: ")
  );

  p.toInsert(() => {});
  console.log('funcionando');
}

function main(){
  console.log("==========/E-commerce/==========")
  let op = 0;
  while(true) {
    op = readlineSync.question(`
Selecione uma opção
1- Cadastrar produto
2- Buscar produto
3- Remover produto
    `);

    if(op == "0") {
      console.log("Encerrando...");
      break;
    }

    switch(op) {
      case "1":
        cadastrarProduto();
        break;
      case "2":
        break;
      case "3":
        break;
    }
  }
}

main();