import { gql } from 'apollo-boost'

export const GET_MOVIES = gql`
{
    movies{
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

export const GET_TVSERIES = gql`
{
    tvSeries{
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

export const GET_MOVIE = gql`
query getMovie($_id: ID){
    getMovie(id: $_id){
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

export const GET_TVSERIE = gql`
query getTvSeries($_id: ID){
    getTvSeries(id: $_id){
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

export const ADD_MOVIE = gql`
mutation addNewMovie($newMovie: InputMovie){
    addMovie(movie: $newMovie){
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

export const ADD_TVSERIE = gql`
mutation addNewTvSeries($newTvSeries: InputTvSeries){
    addTvSeries(tvSeries: $newTvSeries){
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

export const UPDATE_MOVIE = gql`
mutation updateMovie($id: ID, $update: InputMovie){
    updateMovie(id: $id, update: $update){
        msg
    }
}
`
/*
export const UPDATE_TVSERIE = gql`
{
    updateTvSeries(){
        msg
    }
}
`
*/
export const DELETE_MOVIE = gql`
mutation deleteMovie($id: ID){
    deleteMovie(id: $id){
        msg
    }
}
`

export const DELETE_TVSERIE = gql`
mutation deleteTvSeries($id: ID){
    deleteTvSeries(id: $id){
        msg
    }
}
`

export const GET_FAVORITE = gql`
query {
    favorites @client {
        _id
        title
        overview
        popularity
        poster_path
    }
}
`

export const ADD_FAVORITE = gql`
mutation addToFavorite($_id: ID, $title: String, $overview: String, $poster_path: String, $popularity: String){
    addToFavorites(_id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity) @client{
        _id
        title
        overview
        poster_path
        popularity
    }
}
`
