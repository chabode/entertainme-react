import React from 'react'

const TvCard = (props) => {
    const {_id, title, overview, poster_path, popularity, tags} = props.tv

    const addFavs = () => {
        console.log('MASHOOOKKKK')
    }

    return (
        <>
        <div key={_id} className="card">
            <p>{title}</p>
            <p>{overview}</p>
            <p>{poster_path}</p>
            <p>{popularity}</p>
            <p>{tags.join(', ')}</p>
            <button className="btn btn-success" onClick={() => addFavs()}>Add To Favorite</button>
        </div>
        </>
    )
}

export default TvCard