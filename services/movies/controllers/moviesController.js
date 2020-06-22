const moviesModel = require('../models/moviesModel')

class moviesController {
    static async showMovies(req, res) {
        try {
            const movies = await moviesModel.showMovies()
            return res.status(200).json(movies)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static async showOneMovies(req, res){
        try {
            const movie = await moviesModel.showOneMovie(req.params.movieId)
            return res.status(200).json(movie)
        } catch (error) {
            console.log(error)
            return res.status(200).json(error)
        }
    }

    static async addMovie(req, res) {
        try {
            const {title, overview, poster_path, popularity, tags} = req.body
            const movie = await moviesModel.addMovie({title, overview, poster_path, popularity, tags})
            return res.status(200).json(movie)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static async updateMovie(req, res){
        try {
            const {title, overview, poster_path, popularity, tags} = req.body
            const {movieId} = req.params
            const movie = await moviesModel.updateMovie(movieId, {title, overview, poster_path, popularity, tags})
            return res.status(200).json({msg:`movies id ${movieId} has been updated`})
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static async deleteMovie(req, res){
        try {
            const {movieId} = req.params
            const movie = await moviesModel.deleteMovie(movieId)
            return res.status(200).json({msg: `movies id ${movieId} has been deleted`})
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }
}

module.exports = moviesController