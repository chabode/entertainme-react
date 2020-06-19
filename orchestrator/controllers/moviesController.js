const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class moviesController {
    static async findAll(req, res){
        try {
            let moviesCache = await redis.get('moviesCache')
            if(moviesCache){
                console.log('masuk cache')
                res.status(200).json(JSON.parse(moviesCache))
            } else {
                console.log('masuk query')
                const movies = await axios.get('http://localhost:3001/movies')
                await redis.set('moviesCache', JSON.stringify(movies.data))
                res.status(200).json(movies.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async findOne(req, res){
        try {
            const { moviesId } = req.params
            const dataMovie = await axios.get(`http://localhost:3001/movies/${moviesId}`)
            res.status(200).json(dataMovie.data)
        } catch (error) {
            console.log(error)
        }
    }

    static async addMovie(req, res){
        try {
            const {title, overview, poster_path, popularity, tags} = req.body
            const dataMovie = await axios.post(`http://localhost:3001/movies`, {
                title, overview, poster_path, popularity, tags
            })
            await redis.del('moviesCache')
            await redis.del('entertainme')
            res.status(201).json(dataMovie.data)
        } catch (error) {
            console.log(error)
        }
    }

    static async editMovie(req, res){
        try {
            const { movieId } = req.params
            const {title, overview, poster_path, popularity, tags} = req.body
            const dataMovie = await axios.put(`http://localhost:3001/movies/${movieId}`, {
                title, overview, poster_path, popularity, tags
            })
            await redis.del('moviesCache')
            await redis.del('entertainme')
            res.status(200).json(dataMovie.data)
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteMovie(req, res){
        try {
            const {movieId} = req.params
            const dataMovie = await axios.delete(`http://localhost:3001/movies/${movieId}`)
            await redis.del('moviesCache')
            await redis.del('entertainme')
            res.status(200).json(dataMovie.data)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = moviesController