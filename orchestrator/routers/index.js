const router = require('express').Router()
const entertainMeController = require('../controllers/entertainMeController')
const moviesRouter = require('./movies')
const tvSeriesRouter = require('./tvseries')

router.get('/entertainme', entertainMeController.findAll)
router.use('/movies', moviesRouter)
router.use('/tv_series', tvSeriesRouter)

module.exports = router