const Movie = require('../models/movie');

const InputError = require('../errors/InputError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.findMovie = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    // создадим документ
    // вернём записанные в базу данные
    .then((movie) => {
      res.status(200).send(movie);
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InputError('Переданы некорректные данные при создании фильма'));
      } else next(err);
    });
};

module.exports.findByIdMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      next(new NotFoundError(`Фильм с указанным идентификатором ${movieId} не найден.`));
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Нельзя удалить чужой фильм'));
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
