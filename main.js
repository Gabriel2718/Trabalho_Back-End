const { Compra } = require("./compra");
const { Produto } = require("./produto");
const { Cliente } = require("./cliente");
const readlineSync = require("readline-sync");

/*async function executar() {

  const client = new Cliente("1","Teste", "teste@email.com");
  const compra = new Compra()
  await client.toInsert();

  await client.buscar();

  await cleint.atualizar({id:"1"},{nome: "Teste2"}, {email:"teste2@email.com"});

  await client.deletar({nome: "Teste"}, {email:"teste@email.com"});

}*/

async function cadastrarProduto() {
  p = new Produto(
    readlineSync.question("\nCódigo de barras: "),
    readlineSync.question("Nome do produto: "),
    readlineSync.question("Valor do produto: ")
  );

  await p.toInsert(() => {});
}

async function buscarProduto() {
  codigo = readlineSync.question("\nInsira o código de barras do produto: ");
  produto = await Produto.toRead({codigo: codigo});
  if(produto != null) {
    console.log(`
Código de barras: ${produto["codigo"]}
Nome: ${produto["nome"]}
Preço: ${produto["preco"]}
      `);
  }
}
async function removerProduto() {

}

async function main(){
  console.log("==========/E-commerce/==========")
  let op = 0;
  while(true) {
    op = readlineSync.question(`
Selecione uma opção
1- Cadastrar produto
2- Buscar produto
3- Remover produto
0- Sair\n`);

    if(op == "0") {
      console.log("Encerrando...");
      break;
    }

    switch(op) {
      case "1":
        await cadastrarProduto();
        break;
      case "2":
        await buscarProduto();
        break;
      case "3":
        await removerProduto();
        break;
    }
  }
}

main();