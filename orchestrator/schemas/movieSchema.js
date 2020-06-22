const { gql } = require('apollo-server')
const axios = require('axios')
const url = 'http://localhost:3001/movies'
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
    type Movies {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    type Message {
        msg: String
    }

    input InputMovie {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String]!
    }

    extend type Query {
        movies: [Movies]
        getMovie(id : ID): Movies
    }

    extend type Mutation {
        addMovie(movie: InputMovie): Movies
        updateMovie(id: ID, update: InputMovie): Message
        deleteMovie(id: ID): Message
    }
`

const resolvers = {
    Query: {
        movies: async () => {
            try {
                const movieCache = await redis.get('moviesCache')
                if (movieCache){
                    console.log('movie lewat redis cache')
                    return JSON.parse(movieCache)
                } else {
                    console.log('movie lewat query')
                    const movies = await axios.get(url)
                    await redis.set('moviesCache', JSON.stringify(movies.data))
                    return movies.data
                }
            } catch(err) {
                console.log(err)
            }
        },
        getMovie: async (_, args) => {
            try {
                const { id } = args
                const dataMovie = await redis.get('moviesCache')
                if(dataMovie) {
                    console.log('movie lewat redis cache')
                    let movieCache = JSON.parse(dataMovie)
                    return movieCache.filter(movie => movie._id == id)[0]
                } else {
                    console.log('movie lewat query')
                    const movie = await axios.get(`${url}/${id}`)
                    return movie.data
                }
            } catch (err) {
                console.log(err)
            }
        }
    },
    Mutation: {
        addMovie: async (_, args) => {
            try {
                const {movie} = args
                const newMovie = await axios.post(url, movie)
                await redis.del('moviesCache')
                console.log(newMovie.data)
                return newMovie.data.ops[0]
            } catch (error) {
                console.log(error)
            }
        },
        updateMovie: async(_, args) => {
            try {
                const {update, id} = args
                const movie = await axios.put(`${url}/${id}`, update)
                await redis.del('moviesCache')
                console.log(movie.data)
                return movie.data
            } catch (error) {
                console.log(error)
            }
        },
        deleteMovie: async(_, args) => {
            try {
                const { id } = args
                const movie = await axios.delete(`${url}/${id}`)
                await redis.del('moviesCache')
                console.log(movie.data)
                return movie.data
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}