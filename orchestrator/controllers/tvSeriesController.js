const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class tvSeriesController {
    static async findAll(req, res){
        try {
            let tvSeriesCache = await redis.get('tvSeriesCache')
            if(tvSeriesCache){
                console.log('masuk cache')
                res.status(200).json(JSON.parse(tvSeriesCache))
            } else {
                console.log('masuk query')
                const tvSeries = await axios.get('http://localhost:3002/tv_series')
                await redis.set('tvSeriesCache', JSON.stringify(tvSeries.data))
                res.status(200).json(tvSeries.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async findOne(req, res){
        try {
            const { tvId } = req.params
            const dataTvSeries = await axios.get(`http://localhost:3002/tv_series/${tvId}`)
            res.status(200).json(dataTvSeries.data)
        } catch (error) {
            console.log(error)
        }
    }

    static async addTvSeries(req, res){
        try {
            const {title, overview, poster_path, popularity, tags} = req.body
            const dataTvSeries = await axios.post(`http://localhost:3002/tv_series`, {
                title, overview, poster_path, popularity, tags
            })
            await redis.del('tvSeriesCache')
            await redis.del('entertainme')
            res.status(201).json(dataTvSeries.data)
        } catch (error) {
            console.log(error)
        }
    }

    static async editTvSeries(req, res){
        try {
            const { tvId } = req.params
            const {title, overview, poster_path, popularity, tags} = req.body
            const dataTvSeries = await axios.put(`http://localhost:3002/tv_series/${tvId}`, {
                title, overview, poster_path, popularity, tags
            })
            await redis.del('tvSeriesCache')
            await redis.del('entertainme')
            res.status(200).json(dataTvSeries.data)
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteTvSeries(req, res){
        try {
            const {tvId} = req.params
            const dataTvSeries = await axios.delete(`http://localhost:3002/tv_series/${tvId}`)
            await redis.del('tvSeriesCache')
            await redis.del('entertainme')
            res.status(200).json(dataTvSeries.data)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = tvSeriesController