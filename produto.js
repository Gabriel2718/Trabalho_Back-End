const { connect } = require('./db');
const { Logger } = require('./logger');

class Produto{
    constructor() {
        this._codigo = 0;
        this._nome = "";
        this._preco = 0.0;
    }

    getCodigo() {
        return this._codigo;
    }

    getNome() {
        return this._nome;
    }

    getPreco() {
        return this._preco;
    }

    setCodigo(codigo) {
        this._codigo = codigo;
    }

    setNome(nome) {
        this._nome = nome;
    }

    setPreco(preco) {
        this._preco = preco;
    }

    async toInsert() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produtos").insertOne({
                codigo: parseInt(this.codigo),
                nome: this.nome,
                preco: parseFloat(this.preco),
            });
            client.close();
            return result.insertedId;
        } catch(error) {
            Logger.log(`Erro ao inserir dados do produto: ${error}`);
            return null;
        }
    }

    static async toRead(filtro={}) {
        try {
            const { db, client } = await connect();
            const produto = await db.collection("produtos").find(filtro).toArray();
            client.close();
            return produto;
        } catch (error) {
            Logger.log("Erro ao buscar produto: " + error);
            return null;
        }
    }

    static async toUpdate (filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produtos").updateMany(filtro, {
                $set: novosDados,
            });
            client.close();
            return result.modifiedCount;
        } catch (error) {
            Logger.log("Erro ao atualizar produto(s): " + error);
            return null;
        }
    }

    static async toDelete(filtro={}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produtos").deleteMany(filtro);
            client.close();
            return result.deletedCount;
        } catch (error) {
            Logger.log("Erro ao excluir produto(s): " + error);
            return null;
        }
    }
}

module.exports = { Produto };
