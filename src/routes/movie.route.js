const MovieService = require('../services/movies')

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies.schemas')

const validationHandler = require('../utils/middleware/valdationHandler')

const cacheResponse = require('../utils/cacheResponse')
const {FIVE_MINUTES_IN_SECONDS,SIXTY_MINUTES_IN_SECONDS} = require('../utils/time')

const movieAPI = (app) => {

    const movieServices = new MovieService()

    app.get('/movies',async (req, res, next) => {
        cacheResponse(res,FIVE_MINUTES_IN_SECONDS)
        try{
            const {tags} = req.body
            const movies = await movieServices.getMovies({tags})

            res.status(200).json({
                data:movies,
                message:'Movies Listed'
            })

        }catch(err){
            next(err)
        }
    })


    app.get('/movies/:movieId',validationHandler({movieId:movieIdSchema},'params'),async (req, res, next) => {
        cacheResponse(res,SIXTY_MINUTES_IN_SECONDS)
        try{
            const {movieId} = req.params
            const movies = await movieServices.getMovie({movieId})

            res.status(200).json({
                data:movies,
                message:'Movie Found'
            })

        }catch(err){
            next(err)
        }
    })

    app.post('/movies',validationHandler(createMovieSchema),async (req, res, next) => {
        try{
            const movie = req.body
            const createdMovieId = await movieServices.createMovie({movie})

            res.status(201).json({
                data:createdMovieId,
                message:'Movie Created'
            })

        }catch(err){
            next(err)
        }
    })

    app.put('/movies/:movieId',validationHandler({movieId:movieIdSchema},'params'),validationHandler(updateMovieSchema),async (req, res, next) => {
        try{
            const movieId = req.params
            const movie = req.body
            const updatedMovieId = await movieServices.updateMovie({movieId,movie})

            res.status(200).json({
                data:updatedMovieId,
                message:'Movie Updated'
            })

        }catch(err){
            next(err)
        }
    })

    app.delete('/movies/:movieId',validationHandler({movieId:movieIdSchema},'params'),async (req, res, next) => {
        try{
            const movieId = req.params
            const deletedMovieId = await movieServices.deleteMovie({movieId})

            res.status(201).json({
                data:deletedMovieId,
                message:'Movie Deleted'
            })

        }catch(err){
            next(err)
        }
    })

}

module.exports = movieAPI