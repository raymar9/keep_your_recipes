const db = require('../utils/db_handler.js');

const dbName = 'test_db';
const collectionName = 'testing';
const testEntry= { name: "Testname", testfield: "Testfield" };

db.initialize(dbName);

db.insertEntry(testEntry, collectionName)
    .then(() => {
        return db.getEntries({ name: 'Testname' }, collectionName)
    })
    .then((docs) => {
        console.log(docs);
        db.updateEntry({ name: 'Testname' }, { testfield: 'changed' }, collectionName);
    })
    .then(() => {
        return db.getEntries({ name: 'Testname' }, collectionName)
    })
    .then((docs) => {
        console.log(docs);
        db.removeEntry(docs[0], collectionName);
    })
    .catch((error) => console.error(error.name + ' ' + error.message));
