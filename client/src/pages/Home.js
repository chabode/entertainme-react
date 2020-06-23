import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_MOVIES, GET_TVSERIES } from '../queries'
import MovieCard from '../components/movieCard'
import TvCard from '../components/tvSeriesCard'

const Home = () => {

    const {loading, error, data:dataMovie } = useQuery(GET_MOVIES)
    const { data:dataTv } = useQuery(GET_TVSERIES)
    // console.log(data)
    
    return (
        <>
        Home Section
        {loading && <p>Please wait...</p>}
        {error && <p>{error.message}</p>}
        
        <p>Movie Section</p>
        <div className="separator">
            { dataMovie &&
                dataMovie.movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)
            }
        <br/>
        </div>

        <p>TV Section</p>
        <div className="separator">
            { dataTv &&
                dataTv.tvSeries.map(tv => <TvCard key={tv._id} tv={tv}></TvCard>)
            }
        </div>
        </>
    )
}

export default Home