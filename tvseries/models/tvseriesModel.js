const { getDB } = require('../config/mongo')
const { ObjectId, ObjectID} = require('mongodb')

const db = getDB()
db.createCollection('tvseries', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['title','overview','poster_path','popularity','tags'],
            properties: {
                title: {
                    bsonType: 'string',
                    description: 'must be string and is required'
                },
                overview: {
                    bsonType: 'string',
                    description: 'must be string and is required'
                },
                poster_path: {
                    bsonType: 'string',
                    description: 'must be string and is required'
                },
                popularity: {
                    bsonType: 'double',
                    description: 'must be double and is required'
                },
                tags: {
                    bsonType: ['array', 'string'],
                    description: 'must be string or an array of string and is required'
                }
            }
        }
    }
})
const tvSeries = db.collection('tvseries')

class tvseriesModel {
    static showTvseries() {
        return tvSeries.find({}).toArray()
    }

    static showOneTvseries(id) {
        return tvSeries.findOne({ _id: ObjectId(id) })
    }

    static addTvseries(tv) {
        return tvSeries.insertOne(tv)
    }

    static updateTvseries(id, tv){
        return tvSeries.updateOne({ _id : ObjectId(id)}, {$set : {title: tv.title, overview: tv.overview, poster_path: tv.poster_path, popularity: tv.popularity, tags: tv.tags}} )
    }

    static deleteTvseries(id){
        return tvSeries.deleteOne({ _id: ObjectId(id)})
    }
}

module.exports = tvseriesModel