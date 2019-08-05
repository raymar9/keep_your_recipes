const MongoClient = require('mongodb').MongoClient;

class MongoDbHandler {
    constructor(db_name) {
        if (db_name == "") {
            throw Error('Database name is empty');
        }
        this._url = "mongodb://localhost/" + db_name;
        this._client = new MongoClient(this._url, { useNewUrlParser: true });
    }

    connect() {
        this._client.connect(function(err) {
            if (err) {
                throw err;
            }
            console.debug("Connected to database");
        });
    }

    close() {
        this._client.close(function(err) {
            if (err) {
                throw err;
            }
            console.debug('Closed database connection');
        });
    }

    get db() {
        if (!this._client.isConnected()) {
            this.connect();
        }
        return this._client.db;
    }
}

module.exports = {
    MongoDbHandler
}
