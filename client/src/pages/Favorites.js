import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_FAVORITE } from '../queries'
const Favorite = () => {
    const { data } = useQuery(GET_FAVORITE)
    
    return (
        <>
        Tab Favorite
        <table border='1'>
            <thead>
                <tr>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Overview</th>
                    <th>Popularity</th>
                </tr>
            </thead>
            <tbody>
            {data && 
                data.favorites.map(fav => {
                    return (
                        <tr key={fav._id}>
                            <td>{fav.poster_path}</td>
                            <td>{fav.title}</td>
                            <td>{fav.overview}</td>
                            <td>{fav.popularity}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default Favorite