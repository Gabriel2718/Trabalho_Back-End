const { connect } = require('./db');
const { Logger } = require('./logger');

class Compra {
    constructor(codigo, idCliente, idProduto) {
        this.codigo = codigo;
        this.idCliente = idCliente;
        this.idProduto = idProduto;
    }

    async toInsert(callBack) {
        try {
            const { db, client } = await connect();

            const result = await db.collection("compras").insertOne({
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