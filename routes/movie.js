const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegex = require("../utils/constants");

const { addMovie, getMoviesByOwner, deleteMovieById } = require('../controllers/movie');

router.get('/', getMoviesByOwner);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().trim(),
    director: Joi.string().required().trim(),
    duration: Joi.number().required(),
    year: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().trim(),
    nameEN: Joi.string().required().trim(),
  }),
}), addMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovieById);

module.exports = router;
