const { connect } = require('./db');
const { Logger } = require('./logger');

class Compra {
    constructor(id, idCliente, idProduto) {
        this._id = id;
        this.idCliente = idCliente;
        this.idProduto = idProduto;
    }

    async toInsert(callBack) {
        try {
            const { db, client } = await connect();

            const result = await db.collection("compras").insertOne({
                _id: this._id,
                idCliente: this.idCliente,
                idProduto: this.idProduto,
            });

            console.log('Compra registrada', result.insertedId);

            client.close();

            callBack();
        } catch(error) {
            Logger.log(`Erro ao inserir dados da compra: ${error}`);
        }
    }
}

module.exports = { Compra };