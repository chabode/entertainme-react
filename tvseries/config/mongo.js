const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'prime_fox'

var db
const client = new MongoClient(url, {useUnifiedTopology: true})

function connect(callback) {
    client.connect(function (error) {
        if (error) {
            console.log('Gagal terkoneksi ke database')
        } else {
            console.log('terhubung dengan database')
            db = client.db(dbName)
        }
        callback(error)
    })
}

function getDB() {
    return db
}

module.exports = {
    connect,
    getDB
}