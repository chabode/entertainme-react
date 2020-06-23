import React, { useEffect, useState } from 'react'
import { useParams, useHistory} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_MOVIE, UPDATE_MOVIE, GET_MOVIES } from '../queries'

const EditMovie = () => {

    const param = useParams()
    const { id } = param
    const history = useHistory()
    
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [popularity, setPopularity] = useState(0)
    const [poster_path, setPoster_path] = useState('')
    const [tag, setTag] = useState('')

    const { loading, error, data} = useQuery(GET_MOVIE, {
        variables: {
            _id: id
        }})

    const [editMovie] = useMutation(UPDATE_MOVIE)

    useEffect(() => {
        if(data){
            setTitle(data.getMovie.title)
            setOverview(data.getMovie.overview)
            setPopularity(data.getMovie.popularity)
            setPoster_path(data.getMovie.poster_path)
            setTag(data.getMovie.tags.join(','))
        }
    },[data])

    const onSubmit = (e) => {
        e.preventDefault()
        let tags = tag.split(",")
        let popular = Number(popularity)
        // // console.log(data)
        editMovie({
            variables: {
                id: id,
                update: {
                    title: title,
                    overview: overview,
                    poster_path: poster_path,
                    popularity: popular,
                    tags: tags
                }   
            }
        })
        .then(
            history.push('/movies')
        )
    }


    return (
        <>
        Edit Movie
        {loading && <p>Please Wait</p>}
        {error && <p>Something wrong here</p>}
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" defaultValue={title}
                placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Overview</label>
                <input type="text" className="form-control" name="overview" defaultValue={overview}
                placeholder="overview" onChange={(e) => setOverview(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Poster Path</label>
                <input type="text" className="form-control" name="poster_path" defaultValue={poster_path}
                placeholder="poster-path" onChange={(e) => setPoster_path(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Popularity</label>
                <input type="number" className="form-control" name="popularity" defaultValue={popularity}
                placeholder="0" onChange={(e) => setPopularity(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Tags</label>
                <input type="text" className="form-control" name="tags" defaultValue={tag}
                placeholder="tag1,tag2,tag3 no space inserted" onChange={(e) => setTag(e.target.value)}/> <br/>
            </div>
            <div className="form-group">
                <button className="btn btn-info">Edit</button>
            </div>
        </form>
        </>
    )
}

export default EditMovie