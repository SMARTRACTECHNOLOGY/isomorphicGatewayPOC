let PouchDB = require('pouchdb');

const remote_db = 'http://54.175.223.244:5984/sync_db';
const local_db = 'sync_db';
const nano = require('nano')('http://54.175.223.244:5984');



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

const sync_db = nano.db.use('sync_db');
sync_db.list(function(err, body) {
  if (!err) {
    body.rows.forEach(function(doc) {
      sync_db.destroy(doc.key, doc.value.rev, function(err, body) {
        if (!err) console.log(body);
        else console.error(err);
      });
    });
  }
});

export default pouchDB;