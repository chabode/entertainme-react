import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_FAVORITE } from '../queries'

const MovieCard = (props) => {
    const {_id, title, overview, poster_path, popularity, tags} = props.movie
    
    const [addToFavorite] = useMutation(ADD_FAVORITE)
    
    const addFavs = () => {
        addToFavorite({
            variables: {
                _id: _id,
                title: title,
                overview: overview,
                poster_path: poster_path,
                popularity: popularity
            }
        })
        // console.log(title)
    }

    return (
        <>
        <div key={_id} className="card">
            <img src={poster_path} alt={title} />
            <p>{title}</p>
            <p>{overview}</p>
            <p>{popularity}</p>
            <p>{tags.join(', ')}</p>
            <button className="btn btn-success" onClick={() => addFavs()}>Add To Favorites</button>
        </div>
        </>
    )
}

export default MovieCard