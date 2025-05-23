const { connect } = require('./db');
const { Logger } = require('./logger');

class Produto{
    constructor(id, nome, preco) {
        this._id = id;
        this.nome = nome;
        this.preco = preco;
    }

    async toInsert(callBack) {
        try {
            const { db, client } = await connect();

            const result = await db.collection("produtos").insertOne({
                _id: this._id,
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
}

module.exports = { Produto };