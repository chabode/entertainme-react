const tvseriesModel = require('../models/tvseriesModel')

class tvseriesController {
    static async showTvseries(req, res) {
        try {
            const tvseries = await tvseriesModel.showTvseries()
            return res.status(200).json(tvseries)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static async showOneTvseries(req, res){
        try {
            const tvseries = await tvseriesModel.showOneTvseries(req.params.tvId)
            return res.status(200).json(tvseries)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static async addTvseries(req, res){
        try {
            const {title, overview, poster_path, popularity, tags} = req.body
            const tvseries = await tvseriesModel.addTvseries({title, overview, poster_path, popularity, tags})
            return res.status(200).json(tvseries)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static async updateTvseries(req, res){
        try {
            const {title, overview, poster_path, popularity, tags} = req.body
            const {tvId} = req.params
            const tvseries = await tvseriesModel.updateTvseries(tvId, {title, overview, poster_path, popularity, tags})
            return res.status(200).json({msg: `tvseries id ${tvId} has been updated`})
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static async deleteTvseries(req, res){
        try {
            const {tvId} = req.params
            const tvseries = await tvseriesModel.deleteTvseries(tvId)
            return res.status(200).json({msg : `tvseries id ${tvId} has been deleted`})
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }
}

module.exports = tvseriesController