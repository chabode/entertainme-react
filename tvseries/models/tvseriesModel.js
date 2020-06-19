const { getDB } = require('../config/mongo')
const { ObjectID } = require('mongodb')

const db = getDB()
db.createCollection('TvSeries', {
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
                    bsonType: 'array',
                    description: 'must be an array of string and is required'
                }
            }
        }
    }
})
const tvSeries = db.collection('TvSeries')

class tvseriesModel {
    static showTvseries() {
        return tvSeries.find({}).toArray()
    }

    static showOneTvseries(id) {
        return tvSeries.findOne({ _id: ObjectID(id) })
    }

    static addTvseries(tv) {
        return tvSeries.insertOne(tv)
    }

    static updateTvseries(id, tv){
        return tvSeries.updateOne(
            { _id : ObjectID(id)}, 
            {$set : 
                {   title: tv.title, 
                    overview: tv.overview, 
                    poster_path: tv.poster_path, 
                    popularity: tv.popularity, 
                    tags: tv.tags
                }
            }
        )
    }

    static deleteTvseries(id){
        return tvSeries.deleteOne({ _id: ObjectID(id)})
    }
}

module.exports = tvseriesModel