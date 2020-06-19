const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class entertainMeController{
    static async findAll(req, res) {
        try {
            let entertainme = await redis.get('entertainme')
            if (entertainme){
                console.log('-------- dari cache')
                res.status(200).json(JSON.parse(entertainme))
            } else {
                console.log('--------dari query')
                let movies = await axios.get("http://localhost:3001/movies")
                let tvseries = await axios.get("http://localhost:3002/tv_series")
                await redis.set('entertainme', JSON.stringify({movies:movies.data, tvSeries:tvseries.data}))
                res.status(200).json({
                    movies: movies.data,
                    tvSeries: tvseries.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = entertainMeController