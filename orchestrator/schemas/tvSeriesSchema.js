const { gql } = require('apollo-server')
const axios = require('axios')
const url = 'http://localhost:3002/tv_series'

const typeDefs = gql`
    type TvSeries {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    input InputTvSeries {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String]!
    }

    extend type Query {
        tvSeries: [TvSeries]
        getTvSeries(id : ID): TvSeries
    }

    extend type Mutation {
        addTvSeries(tvSeries: InputTvSeries): TvSeries
        updateTvSeries(id: ID, update: InputTvSeries): TvSeries
        deleteTvSeries(id: ID): TvSeries
    }
`

const resolvers = {
    Query: {
        tvSeries: async () => {
            try {
                const tvSeries = await axios.get(url)
                return tvSeries.data
            } catch(err) {
                console.log(err)
            }
        },
        getTvSeries: async (_, args) => {
            try {
                const {id} = args
                const tvSeries = await axios.get(`${url}/${id}`)
                return tvSeries.data
            } catch (err) {
                console.log(err)
            }
        }
    },
    Mutation: {
        addTvSeries: async (_, args) => {
            try {
                const {tvSeries} = args
                const newTvSeries = await axios.post(url, tvSeries)
                return newTvSeries.data
            } catch (error) {
                console.log(error)
            }
        },
        updateTvSeries: async(_, args) => {
            try {
                const {update, id} = args
                const tvSeries = await axios.put(`${url}/${id}`, update)
                return tvSeries.data
            } catch (error) {
                console.log(error)
            }
        },
        deleteTvSeries: async(_, args) => {
            try {
                const { id } = args
                const tvSeries = await axios.delete(`${url}/${id}`)
                return tvSeries.data
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