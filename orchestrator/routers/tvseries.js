const router = require('express').Router()
const tvSeriesController = require('../controllers/tvSeriesController')

router.get('/', tvSeriesController.findAll)
router.post('/', tvSeriesController.addTvSeries)
router.get('/:tvId', tvSeriesController.findOne)
router.put('/:tvId', tvSeriesController.editTvSeries)
router.delete('/:tvId', tvSeriesController.deleteTvSeries)

module.exports = router