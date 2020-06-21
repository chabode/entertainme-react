const { gql } = require('apollo-server')
const axios = require('axios')
const url = 'http://localhost:3001/movies'

const typeDefs = gql`
    type Movies {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
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
        updateMovie(id: ID, update: InputMovie): Movies
        deleteMovie(id: ID): Movies
    }
`

const resolvers = {
    Query: {
        movies: async () => {
            try {
                const movies = await axios.get(url)
                return movies.data
            } catch(err) {
                console.log(err)
            }
        },
        getMovie: async (_, args) => {
            try {
                const { id } = args
                const movie = await axios.get(`${url}/${id}`)
                return movie.data
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
                return newMovie.data
            } catch (error) {
                console.log(error)
            }
        },
        updateMovie: async(_, args) => {
            try {
                const {update, id} = args
                const movie = await axios.put(`${url}/${id}`, update)
                return movie.data
            } catch (error) {
                console.log(error)
            }
        },
        deleteMovie: async(_, args) => {
            try {
                const { id } = args
                const movie = await axios.delete(`${url}/${id}`)
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