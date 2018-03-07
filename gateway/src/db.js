let PouchDB = require('pouchBD');

const remote_db = 'http://54.175.223.244:5984/sync_db';
const local_db = 'sync_db';

let pouchDB = new PouchDB('./'+local_db);

pouchDB.sync(remote_db, {
  live: true,
  retry: true,
  since: 0
}).on('change', function (change) {
  console.log('change', change)
  // yo, something changed!
}).on('paused', function (info) {
  console.log('paused', info)
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  console.log('active', info)
  // replication was resumed
}).on('error', function (err) {
  console.error('error', err)
  // totally unhandled error (shouldn't happen)
});

exports.pouchDB = pouchDB;