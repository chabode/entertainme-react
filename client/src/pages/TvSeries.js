import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TVSERIES, DELETE_TVSERIE } from '../queries'

const TvSeries = () => {

    const {loading, error, data, refetch } = useQuery(GET_TVSERIES)
    const history = useHistory()
    const [deleteTvSeries] = useMutation(DELETE_TVSERIE)

    function movePageAdd(){
        history.push({pathname:"/create"})
    }

    const deleteItem = (value) => {
        deleteTvSeries({
            variables: {
                id: value
            }
        })
        refetch()
    }
    return (
        <>
        Ini Tv series
        <button className="button" onClick={() => movePageAdd()}>Add New Tv Series</button>
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
                    data.tvSeries.map(tv => {
                        return (
                            <tr key={tv._id}>
                                <td>{tv.poster_path}</td>
                                <td>{tv.title}</td>
                                <td>{tv.overview}</td>
                                <td>{tv.popularity}</td>
                                <td>{tv.tags.join(', ')}</td>
                                <td>
                                    <button className="btn btn-info">Edit</button>
                                    <button className="btn btn-danger"
                                    onClick={() => deleteItem(tv._id)}>Delete</button>
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

export default TvSeries