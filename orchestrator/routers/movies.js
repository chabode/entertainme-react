const router = require('express').Router()
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.findAll)
router.post('/', moviesController.addMovie)
router.get('/:moviesId', moviesController.findOne)
router.put('/:moviesId', moviesController.editMovie)
router.delete('/:moviesId', moviesController.deleteMovie)

module.exports = router