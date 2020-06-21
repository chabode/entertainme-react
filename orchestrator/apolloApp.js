const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const movieSchema = require('./schemas/movieSchema')
const tvSeriesSchema = require('./schemas/tvSeriesSchema')

const typeDefs = gql`
    type Query
    type Mutation
`

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, movieSchema.typeDefs, tvSeriesSchema.typeDefs],
    resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers]
})

const server = new ApolloServer({schema})

server.listen().then(({ url }) => {
    console.log(' Apollo server ready at ', url)
})