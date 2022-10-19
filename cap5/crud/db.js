const { MongoClient, ObjectId } = require('mongodb')
async function connect() {
  if (global.db) return global.db
  const conn = await MongoClient.connect('mongodb://localhost:27017/')
  if (!conn) return new Error("Can't connect")
  global.db = await conn.db('workshop')
  return global.db
}

async function findAll() {
  const db = await connect()
  return db.collection('customers').find().toArray()
}

module.exports = { findAll }
