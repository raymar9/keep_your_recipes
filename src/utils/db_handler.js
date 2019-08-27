const MongoClient = require('mongodb').MongoClient;
const config = require('../config.js').DATABASE_CONFIG;

let dbClient_;
let dbName_;
let dbHandle_;

function initialize(dbName) {
    if (dbClient_) {
        console.warn('Database is already initialized.');
        return;
    }
    dbClient_ = new MongoClient(`mongodb://${config.url}:${config.port}`, { useNewUrlParser: true });
    dbName_ = dbName;
}

async function connect() {
    try {
        let client = await dbClient_.connect();
        if (client.isConnected()) {
            console.debug('Connected to mongo database.');
        }
        dbHandle_ = client.db(dbName_);
        return dbHandle_;
    } catch (error) {
        throw new Error('Could not connect to mongodb!');
    }
}

async function getCollection_(collectionName) {
    if (!dbClient_.isConnected() || !dbHandle_) {
        try {
            await connect();
        } catch {
            throw new Error('Error while connecting to db!');
        }
    }

    let collPromise = function (collName) {
        return new Promise((resolve, reject) => {
            let cb = function(error, collection) {
                if (error) reject(error);
                else resolve(collection);
            }
            dbHandle_.collection(collName, cb);
        });
    }
    return collPromise(collectionName);
}

async function insertEntry(entry, collectionName) {
    return getCollection_(collectionName)
        .then(coll => coll.insertOne(entry))
        .then(() => console.debug('Inserted one entry into database.'))
        .catch(err => { throw new Error('Error while inserting entry! ' + err.message) });
}

async function removeEntry(query, collectionName) {
    return getCollection_(collectionName)
        .then(coll => coll.deleteOne(query))
        .then(() => console.debug('Removed one entry from database.'))
        .catch(err => {throw new Error('Error while deleting entry! ' + err.message)})
}

async function getEntries(query, collectionName) {
    try {
        let coll = await getCollection_(collectionName);
        let docs = await coll.find(query).toArray();
        return docs;
    } catch (error) {
        throw Error('Error while getting entries! ' + error.message);
    }
}

async function updateEntry(query, newValues, collectionName) {
    try {
        let coll = await getCollection_(collectionName);
        return await coll.updateOne(query, { $set: newValues });
    } catch (error) {
        throw Error('Error while updating entry! ' + error.message);
    }
}

module.exports = {
    initialize, insertEntry, removeEntry, getEntries, updateEntry
}
