const { gql, RenameRootFields } = require('apollo-server')
const axios = require('axios')
const url = 'http://localhost:3002/tv_series'
const Redis = require('ioredis')
const redis = new Redis()

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
        updateTvSeries(id: ID, update: InputTvSeries): Message
        deleteTvSeries(id: ID): Message
    }
`

const resolvers = {
    Query: {
        tvSeries: async () => {
            try {
                const tvSeriesCache = await redis.get('tvSeriesCache')
                if (tvSeriesCache){
                    console.log('tv lewat redis cache')
                    return JSON.parse(tvSeriesCache)
                } else {
                    console.log('tv lewat query')
                    const tvSeries = await axios.get(url)
                    await redis.set('tvSeriesCache', JSON.stringify(tvSeries.data))
                    return tvSeries.data
                }
            } catch(err) {
                console.log(err)
            }
        },
        getTvSeries: async (_, args) => {
            try {
                const {id} = args
                const dataTv = await redis.get('tvSeriesCache')
                if (dataTv) {
                    console.log('tv lewat redis cache')
                    let tvSeriesCache = JSON.parse(dataTv)
                    return tvSeriesCache.filter(tv => tv._id == id)[0]
                } else {
                    console.log('tv lewat query')
                    const tvSeries = await axios.get(`${url}/${id}`)
                    return tvSeries.data
                }
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
                await redis.del('tvSeriesCache')
                return newTvSeries.data.ops[0]
            } catch (error) {
                console.log(error)
            }
        },
        updateTvSeries: async(_, args) => {
            try {
                const {update, id} = args
                const tvSeries = await axios.put(`${url}/${id}`, update)
                await redis.del('tvSeriesCache')
                return tvSeries.data
            } catch (error) {
                console.log(error)
            }
        },
        deleteTvSeries: async(_, args) => {
            try {
                const { id } = args
                const tvSeries = await axios.delete(`${url}/${id}`)
                await redis.del('tvSeriesCache')
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