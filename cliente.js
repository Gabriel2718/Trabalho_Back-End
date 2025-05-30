const { connect } = require('./db');
const { Logger } = require('./logger');

class Cliente{
    constructor(nome, email) {
        this._nome = "";
        this._email = "";
    }

    getNome() {
        return this._nome;
    }

    getEmail() {
        return this._email;
    }

    setNome(nome) {
        this._nome = nome;
    }

    setEmail(email) {
        this._email = email;
    }

    async toInsert() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").insertOne({
                nome: this.nome,
                email: this.email,
            });
            client.close();
            return result.insertedId;
        } catch(error) {
            Logger.log("Erro ao inserir dados do cliente: " + error);
            return null;
        }
    }

    static async toUpdate (filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").updateMany(filtro, {
                $set: novosDados,
            });
            client.close();
            return result.modifiedCount;
        } catch (error) {
            Logger.log("Erro ao atualizar usuário(s): " + error);
            return null;
        }
    }

    static async toRead(filtro={}) {
        try {
            const { db, client } = await connect();
            const clientes = await db.collection("clientes").find(filtro).toArray();
            client.close();
            return clientes;
        } catch (error) {
            Logger.log("Erro ao buscar usuário(s): " + error);
            return null;
        }
    }

    static async toDelete(filtro={}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").deleteMany(filtro);
            client.close();
            return result.deletedCount;
        } catch (error) {
            Logger.log("Erro ao deletar usuário(s): " + error);
            return null;
        }
    }
}

module.exports = { Cliente };
