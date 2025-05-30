const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const dbName = "ecommerce";

async function connect() {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return { db, client };
}

/*const client = new MongoClient(url);

const db = client.connect();*/

module.exports = { connect };