const MongoClient = require('mongodb').MongoClient;

class MongoDbHandler {
    constructor(db_name) {
        if (db_name == "") {
            throw Error('Database name is empty');
        }
        this._url = 'mongodb://localhost:27017';
        this._db_name  = db_name;
        this._client = new MongoClient(this._url, { useNewUrlParser: true });
    }

    async connect() {
        let promise = this._client.connect();
        promise.catch(function(error) { 
            console.error('Could not connect to database.'); 
            throw new Error('Could not connect to database. Abort!'); 
        });
        const client = await promise;
        console.debug("Connected to mongo database");
        return client;
    }

    close() {
        this._client.close(function(err) {
            if (err) {
                throw err;
            }
            console.debug('Closed database connection');
        });
    }

    get database() {
        if (!this._client.isConnected()) {
            this.connect();
        }
        return this._client.db(this._db_name);
    }
}

module.exports = {
    MongoDbHandler
}
