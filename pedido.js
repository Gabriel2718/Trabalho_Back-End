const { connect } = require("./db");
const { Logger } = require("./logger");

class Pedido{
    constructor(codigo, emailCliente, codigoProduto) {
        this._codigo = 0;
        this._emailCliente = "";
        this._codigoProduto = 0;
    }

    getCodigo() {
        return this._codigo;
    }

    getEmailCliente() {
        return this._emailCliente;
    }

    getCodigoProduto() {
        return this._codigoProduto;
    }

    setCodigo(codigo) {
        this._codigo = codigo;
    }

    setEmailCliente(emailCliente) {
        this._emailCliente = emailCliente;
    }

    setCodigoProduto(codigoProduto) {
        this._codigoProduto = codigoProduto;
    }

    async toInsert() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("pedidos").insertOne({
                emailCliente: this.emailCliente,
                codigoProduto: this.codigoProduto,
            });
            client.close();
            return result.insertedId;
        } catch(error) {
            Logger.log(`Erro ao inserir dados do pedido: ${error}`);
            return null;
        }
    }

    static async toUpdate (filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("pedidos").updateMany(filtro, {
                $set: novosDados,
            });
            client.close();
            return result.modifiedCount;
        } catch (error) {
            Logger.log("Erro ao atualizar pedido(s): " + error);
            return null;
        }
    }

    static async toRead(filtro={}) {
        try {
            const { db, client } = await connect();
            const clientes = await db.collection("pedidos").find(filtro).toArray();
            client.close();
            return clientes;
        } catch (error) {
            Logger.log("Erro ao buscar pedido(s): " + error);
            return null;
        }
    }

    static async toDelete(filtro={}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("pedidos").deleteMany(filtro);
            client.close();
            return result.deletedCount;
        } catch (error) {
            Logger.log("Erro ao excluir pedido(s): " + error);
            return null;
        }
    }
}

module.exports = { Pedido };