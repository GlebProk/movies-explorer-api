const router = require('express').Router();

const { Joi, celebrate } = require('celebrate');

const {
  findMovie, createMovie, findByIdMovie,
} = require('../controllers/movies');

const UrlType = /^http(s)?:\/\/(www.)?([0-9A-Za-z.@:%_/+-~#=]+)+(.[a-zA-Z]{2,3})(\/[0-9A-Za-z.@:%_/+-~#=]+)*$/;

router.get('/', findMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(UrlType),
    trailerLink: Joi.string().required().pattern(UrlType),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(UrlType),
    movieId: Joi.number().integer().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), findByIdMovie);

module.exports = router;
