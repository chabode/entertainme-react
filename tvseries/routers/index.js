const router = require('express').Router();
const tvseriesController = require('../controllers/tvseriesController')

router.get('/tv', tvseriesController.showTvseries)
router.get('/tv/:tvId', tvseriesController.showOneTvseries)
router.post('/tv', tvseriesController.addTvseries)
router.put('/tv/:tvId', tvseriesController.updateTvseries)
router.delete('/tv/:tvId', tvseriesController.deleteTvseries)

module.exports = router
