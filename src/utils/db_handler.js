const MongoDb = require('mongodb');
const MongoClient = MongoDb.MongoClient;
const config = require('../config.js').DATABASE_CONFIG;

let dbClient_;
let dbName_;
let dbHandle_;

class DbHandlerError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }

function initialize(dbName) {
    if (dbClient_) {
        return;
    }
    dbClient_ = new MongoClient(`mongodb://${config.url}:${config.port}`, { useNewUrlParser: true });
    dbName_ = dbName;
}

async function connect() {
    try {
        let client = await dbClient_.connect();
        dbHandle_ = client.db(dbName_);
        console.debug('Connected to mongo database.');
        return dbHandle_;
    } catch (err) {
        throw new DbHandlerError('Could not connect to mongodb.');
    }
}

async function getCollection_(collectionName) {
    if (!dbClient_.isConnected() || !dbHandle_) {
        await connect();
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
    try {
        let coll = await getCollection_(collectionName);
        await coll.insertOne(entry);
        console.debug('Inserted a new entry into database.');
    } catch (err) {
        console.error('dbHandler InsertError: ' + err.message);
        throw new DbHandlerError('Could not insert entry.'); 
    }
}

async function removeEntrybyId(id, collectionName) {
    try {
        let coll = await getCollection_(collectionName);
        await coll.deleteOne(MongoDb.ObjectId.createFromHexString(id));
        console.debug('Removed an entry from database.');
    } catch (err) {
        console.error('dbHandler RemoveError: ' + err.message);
        throw new DbHandlerError('Could not remove entry.');
    }
}

async function getEntries(query, collectionName) {
    try {
        let coll = await getCollection_(collectionName);
        return await coll.find(query).toArray();
    } catch (err) {
        console.error('dbHandler GettingError: ' + err.message);
        throw new DbHandlerError('Could not get entries.');
    }
}

async function getEntrybyId(id, collectionName) {
    try {
        let coll = await getCollection_(collectionName);
        return await coll.findOne(MongoDb.ObjectId.createFromHexString(id));
    } catch (err) {
        console.error('dbHandler GettingByIdError: ' + err.message);
        throw new DbHandlerError('Could not get entry by id.');
    }
}

async function updateEntryById(id, newValues, collectionName) {
    try {
        let coll = await getCollection_(collectionName);
        let result = await coll.updateOne({_id: MongoDb.ObjectId.createFromHexString(id)}, { $set: newValues });
        if (result.matchedCount != 1) {
            console.warn(`dbHandler UpdateWarning: ${result.matchedCount} have been updated.`);
        } else {
            console.debug('One entry has been updated in database.');
        }
    } catch (err) {
        console.error('dbHandler UpdateByIdError: ' + err.message);
        throw new DbHandlerError('Could not update entry by id.');
    }
}

module.exports = {
    initialize, insertEntry, removeEntrybyId, getEntries, getEntrybyId, updateEntryById
}
