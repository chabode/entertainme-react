import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { GET_FAVORITE } from '../queries'

const cache = new InMemoryCache()
const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache,
    resolvers: {
        Mutation: {
            addToFavorites(_, args, context){
                let newFavs = {
                    _id: args._id,
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    __typename: "favorites"
                }
                
                let {favorites} = context.cache.readQuery({ query:GET_FAVORITE })
                
                context.cache.writeData({
                    data: {
                        favorites: favorites.concat(newFavs)
                    }
                })
            }
        }
    }
})

cache.writeData({
    data: {
        favorites: []
    }
})

export default client