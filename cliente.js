const { connect } = require('./db');
const { Logger } = require('./logger');

class Cliente{
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }

    async toInsert(callBack) {
        try {
            const { db, client } = await connect();

            const result = await db.collection("clientes").insertOne({
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

    static async toUpdate (filtro, novosDados) {
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

    static async toRead(filtro={}) {
        try {
            const { db, client } = await connect();
            const clientes = await db.collection("clientes").find(filtro).toArray();
            console.log("Usuário(s) encontrado(s)", clientes);
            client.close();
        } catch (error) {
            Logger.log("Erro ao buscar usuário(s): " + error);
        }
    }

    static async toDelete(filtro={}) {
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