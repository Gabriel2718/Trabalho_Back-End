const { connect } = require('./db');
const { Logger } = require('./logger');

class Produto{
    constructor(codigo, nome, preco) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
    }

    setCodigo(codigo) {
        this.codigo = codigo;
    }

    async toInsert(callBack) {
        try {
            const { db, client } = await connect();

            const result = await db.collection("produtos").insertOne({
                codigo: this.codigo,
                nome: this.nome,
                preco: this.preco,
            });

            console.log('Produto registrado', result.insertedId);

            client.close();

            callBack();
        } catch(error) {
            Logger.log(`Erro ao inserir dados do produto: ${error}`);
        }
    }

    static async toRead(filtro={}) {
        try {
            const { db, client } = await connect();
            const produto = await db.collection("produtos").find(filtro).toArray();
            if(produto.length == 0) {
                console.log("Não há nenhum produto com este código de barras!");
                return null;
            } else {
                console.log("\nProduto encontrado!");
            }
            client.close();
            return produto[0];
        } catch (error) {
            Logger.log("Erro ao buscar produto: " + error);
        }
    }
}

module.exports = { Produto };