
const { MongoClient } = require('mongodb');
const config = require('../config');

module.exports = (async () => {
  // Use connect method to connect to the server
  console.info('connection string =>', config.connectionString);
  const client = await MongoClient.connect(config.connectionString, {
    useNewUrlParser: true,
    replicaSet: process.env.DB_REPLSET || undefined
  });
  console.info('Connected successfully to server');
  return {
    client,
    db: client.db(process.env.DB_NAME)
  };
})();
