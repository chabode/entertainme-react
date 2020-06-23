import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_MOVIE, ADD_TVSERIE } from '../queries'

const Create = (props) => {
    const [addMovie] = useMutation(ADD_MOVIE)
    const [addTvSeries] = useMutation(ADD_TVSERIE)
    const [type, setType] = useState('Movie')
    
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [popularity, setPopularity] = useState(0)
    const [poster_path, setPoster_path] = useState('')
    const [tag, setTag] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        let tags = tag.split(",")
        let popular = parseFloat(popularity)
        
        if(type === 'Movie'){
            addMovie({
                variables: {
                    newMovie: {
                        title: title,
                        overview: overview,
                        popularity: popular,
                        poster_path: poster_path,
                        tags: tags
                    }      
                }
            })
        } else if (type === 'Tv Series'){
            addTvSeries({
                variables: {
                    newTvSeries: {
                        title: title,
                        overview: overview,
                        popularity: popular,
                        poster_path: poster_path,
                        tags: tags
                    }
                }
            })
        }
        setTitle('')
        setOverview('')
        setPopularity(0)
        setPoster_path('')
        setTag('')
        
    }

    return (
        <>
        Create New {type}
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" value={title}
                placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Overview</label>
                <input type="text" className="form-control" name="overview" value={overview}
                placeholder="overview" onChange={(e) => setOverview(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Poster Path</label>
                <input type="text" className="form-control" name="poster_path" value={poster_path}
                placeholder="poster-path" onChange={(e) => setPoster_path(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Popularity</label>
                <input type="number" className="form-control" name="popularity" value={popularity}
                placeholder="0" onChange={(e) => setPopularity(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Tags</label>
                <input type="text" className="form-control" name="tags" value={tag}
                placeholder="tag1,tag2,tag3 no space inserted" onChange={(e) => setTag(e.target.value)}/> <br/>
            </div>
            <div className="form-group">
                <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option>Movie</option>
                    <option>Tv Series</option>
                </select>
            </div>
            <div className="form-group">
                <button className="btn btn-info">Add New</button>
            </div>
        </form>
        </>
    )
}

export default Create