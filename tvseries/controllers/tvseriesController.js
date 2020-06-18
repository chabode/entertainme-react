const tvseriesModel = require('../models/tvseriesModel')

class tvseriesController {
    static async showTvseries(req, res) {
        try {
            const tvseries = await tvseriesModel.showTvseries()
            return res.status(200).json(tvseries)
        } catch (error) {
            console.log(error)
        }
    }

    static async showOneTvseries(req, res){
        try {
            const tvseries = await tvseriesModel.showOneTvseries(req.params.tvId)
            return res.status(200).json(tvseries)
        } catch (error) {
            console.log(error)
        }
    }

    static async addTvseries(req, res){
        try {
            const tvseries = await tvseriesModel.addTvseries(req.body)
            return res.status(200).json(tvseries)
        } catch (error) {
            console.log(error)
        }
    }

    static async updateTvseries(req, res){
        try {
            const tvseries = await tvseriesModel.updateTvseries(req.params.tvId, req.body)
            return res.status(200).json(tvseries)
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteTvseries(req, res){
        try {
            const tvseries = await tvseriesModel.deleteTvseries(req.params.tvId)
            return res.status(200).json(tvseries)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = tvseriesController