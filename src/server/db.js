/* eslint-disable no-console */
const PouchDB = require('pouchdb');

const remoteDB = 'http://54.175.223.244:5984/sync_db';
const LOCAL_DB_FOLDER = 'sync_db';
const nano = require('nano')('http://54.175.223.244:5984');

const pouchDB = new PouchDB(`./${LOCAL_DB_FOLDER}`);

pouchDB.sync(remoteDB, {
  live: true,
  retry: true,
  since: 0,
}).on('change', (change) => {
  console.log('change', change);
  // yo, something changed!
}).on('paused', (info) => {
  console.log('paused', info);
  // replication was paused, usually because of a lost connection
}).on('active', (info) => {
  console.log('active', info);
  // replication was resumed
})
  .on('error', (err) => {
    console.error('error', err);
  // totally unhandled error (shouldn't happen)
  });

const syncDB = nano.db.use(LOCAL_DB_FOLDER);
syncDB.list((err, body) => {
  console.log('try to delete the remoteDB');
  console.log(body);
  if (!err) {
    body.rows.forEach((doc) => {
      syncDB.destroy(doc.key, doc.value.rev, (err, body) => {
        console.log(body);
        if (!err) console.log(body);
        else console.error(err);
      });
    });
  }
});

export default pouchDB;
