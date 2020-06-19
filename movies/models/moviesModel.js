const { getDB } = require('../config/mongo')
const { ObjectID } = require('mongodb')

const db = getDB()
db.createCollection('Movies', {
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
const movies = db.collection('Movies')

class moviesModel {
    static showMovies() {
        return movies.find({}).toArray()
    }

    static showOneMovie(id){
        return movies.findOne({ _id: ObjectID(id) })
    }

    static addMovie(newMovies) {
        return movies.insertOne(newMovies)
    }

    static updateMovie(id, movie){
        return movies.updateOne(
            { _id : ObjectID(id)}, {
                $set : {
                    title: movie.title, 
                    overview: movie.overview, 
                    poster_path: movie.poster_path, 
                    popularity: movie.popularity, 
                    tags: movie.tags
                }
            }
        )
    }

    static deleteMovie(id) {
        return movies.deleteOne({ _id: ObjectID(id)})
    }
}

module.exports = moviesModel