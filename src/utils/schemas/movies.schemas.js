const join = require('@hapi/joi')

const movieIdSchema = join.string().regex(/^[0-9a-fA-F]{24}$/)
const movieTitleSchema = join.string().max(80)
const movieYearSchema = join.number().min(1800).max(9999)
const movieCoverchema = join.string().uri()
const movieDescriptionSchema = join.string().max(300)
const movieDurationSchema = join.string().min(1).max(300)
const movieContentRatingSchema = join.string().max(5)
const movieSourceSchema = join.string().uri()
const movieTagsSchema = join.array().items(join.string().max(50))

const createMovieSchema ={
    title:movieTitleSchema.required(),
    year:movieYearSchema.required(),
    cover:movieCoverchema.required(),
    description:movieDescriptionSchema.required(),
    duration:movieDurationSchema.required(),
    contentRating:movieContentRatingSchema.required(),
    source: movieSourceSchema.required(),
    tags:movieTagsSchema
}

const updateMovieSchema = {
    title:movieTitleSchema,
    year:movieYearSchema,
    cover:movieCoverchema,
    description:movieDescriptionSchema,
    duration:movieDurationSchema,
    contentRating:movieContentRatingSchema,
    source: movieSourceSchema,
    tags:movieTagsSchema
}

module.exports = {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
}