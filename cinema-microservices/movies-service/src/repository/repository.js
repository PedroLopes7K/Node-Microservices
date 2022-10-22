const database = require('../config/database')
const { ObjectId } = require('mongodb')

async function getAllMovies() {
  const db = await database.connect()
  return db.collection('movies').find().toArray()
}

async function getMovieById(id) {
  const db = await database.connect()
  return db.collection('movies').findOne({ _id: new ObjectId(id) })
}

async function getMoviePremieres() {
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const db = await database.connect()
  return db
    .collection('movies')
    .find({ dataLancamento: { $gte: monthAgo } })
    .toArray()
}
async function getMovieByCategory(category) {
  const db = await database.connect()
  return db.collection('movies').find({ categorias: category }).toArray()
}

async function insertMovie(movieData) {
  const db = await database.connect()
  return db.collection('movies').insertOne(movieData)
}

async function deleteMovie(id) {
  const db = await database.connect()
  return db.collection('movies').deleteOne({ _id: new ObjectId(id) })
}
async function disconnect() {
  return database.disconnect()
}

module.exports = {
  getAllMovies,
  getMovieById,
  getMoviePremieres,
  disconnect,
  getMovieByCategory,
  insertMovie,
  deleteMovie
}
