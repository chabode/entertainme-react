import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_MOVIES, DELETE_MOVIE } from '../queries'
import { useHistory } from 'react-router-dom'

const Movies = () => {

    const {loading, error, data, refetch } = useQuery(GET_MOVIES)
    const history = useHistory()
    const [deleteMovie] = useMutation(DELETE_MOVIE)

    function movePageAdd(){
        history.push({pathname:"/create"})
    }

    const deleteItem = (value) => {
        deleteMovie({
            variables: {
                id: value
            }
        })
        refetch()
    }

    const editItem = (value) => {
        history.push(`/movies/${value}`)
    }

    return (
        <>
        Movies List
        <button className="button" onClick={() => movePageAdd()}>Add New Movie</button>
        {loading && <p>Please Wait</p>}
        {error && <p>Something wrong here</p>}
        <table border='1'>
            <thead>
                <tr>
                    <th>Picture</th>
                    <th>Title</th>
                    <th>Overview</th>
                    <th>Popularity</th>
                    <th>Tags</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data && 
                    data.movies.map(movie => {
                        return (
                            <tr key={movie._id}>
                                <td>{movie.poster_path}</td>
                                <td>{movie.title}</td>
                                <td>{movie.overview}</td>
                                <td>{movie.popularity}</td>
                                <td>{movie.tags.join(', ')}</td>
                                <td>
                                    <button className="btn btn-info"
                                    onClick={() => editItem(movie._id)}>Edit</button>
                                    <button className="btn btn-danger"
                                    onClick={() => deleteItem(movie._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    
        </>
    )
}

export default Movies