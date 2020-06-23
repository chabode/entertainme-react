import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <Link className="text" to="/">Home</Link>
            <Link className="text" to="/movies">Movies</Link>
            <Link className="text" to="/tv_series">Tv Series</Link>
            <Link className="text" to="/favorite">Favorites</Link>
        </div>
    )
}

export default Navbar