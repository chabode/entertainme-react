const router = require('express').Router();
const tvseriesController = require('../controllers/tvseriesController')

router.get('/tv_series', tvseriesController.showTvseries)
router.post('/tv_series', tvseriesController.addTvseries)
router.get('/tv_series/:tvId', tvseriesController.showOneTvseries)
router.put('/tv_series/:tvId', tvseriesController.updateTvseries)
router.delete('/tv_series/:tvId', tvseriesController.deleteTvseries)

module.exports = router
