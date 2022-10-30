const router = require('express').Router();

const { Joi, celebrate, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const {
  findMovie, createMovie, findByIdMovie,
} = require('../controllers/movies');

router.get('/api/movies', findMovie);

router.post('/api/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('Необходимо указать ссылку');
      }
      return value;
    }),
    trailerLink: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('Необходимо указать ссылку');
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('Необходимо указать ссылку');
      }
      return value;
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().integer().required(),
  }),
}), createMovie);

router.delete('/api/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), findByIdMovie);

module.exports = router;
