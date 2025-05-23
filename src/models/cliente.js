const { connect } = require('./db');
const { Logger } = require('./logger');

class Cliente{
    constructor(id, nome, email) {
        this._id = id;
        this.nome = nome;
        this.email = email;
    }

    async toInsert(callBack) {
        try {
            const { db, client } = await connect();

            const result = await db.collection("clientes").insertOne({
                _id: this._id,
                nome: this.nome,
                email: this.email,
            });

            console.log('Cliente registrado', result.insertedId);

            client.close();

            callBack();
        } catch(error) {
            Logger.log("Erro ao inserir dados do cliente: " + error);
        }
    }

    static async atualizar (filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").updateMany(filtro, {
                $set: novosDados,
            });
            console.log("Usuário(s) atualizado(s)", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar usuário(s): " + error);
        }
    }

    static async buscar(filtro={}) {
        try {
            const { db, client } = await connect();
            const clientes = await db.collection("clientes").find(filtro).toArray();
            console.log("Usuário(s) encontrado(s)", clientes);
            client.close();
        } catch (error) {
            Logger.log("Erro ao buscar usuário(s): " + error);
        }
    }

    static async deletar(filtro={}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").deleteMany(filtro);
            console.log("Usuário(s) deletado(s)", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar usuário(s): " + error);
        }
    }
}

module.exports = { Cliente };