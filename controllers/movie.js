const httpConstants = require('http2').constants;
const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(httpConstants.HTTP_STATUS_OK).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMoviesByOwner = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail()
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Фильмы не найдены'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм не найден'));
      } else {
        if (!movie.owner.equals(req.user._id)) {
          throw new ForbiddenError('Фильм другого пользователя');
        }
        Movie.deleteOne(movie)
          .orFail()
          .then(() => {
            res
              .status(httpConstants.HTTP_STATUS_OK)
              .send({ message: 'Фильм удален' });
          })
          .catch((err) => {
            if (err instanceof mongoose.Error.DocumentNotFoundError) {
              next(
                new NotFoundError(
                  `Фильм с таким id ${req.params.cardId} не найден`,
                ),
              );
            } else {
              next(err);
            }
          });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Неккоректный id фильма'));
      } else {
        next(err);
      }
    });
};
