const router = require('express').Router()
const moviesController = require('../controllers/moviesController')

router.get('/movies',moviesController.showMovies)
router.post('/movies', moviesController.addMovie)
router.get('/movies/:movieId', moviesController.showOneMovies)
router.put('/movies/:movieId', moviesController.updateMovie)
router.delete('/movies/:movieId', moviesController.deleteMovie)

module.exports = router