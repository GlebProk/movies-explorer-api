const router = require('express').Router();

const { Joi, celebrate } = require('celebrate');
const {
  findUser, findByIdUser, findByUsersMe, updateInfoByIdUser,
} = require('../controllers/users');

router.get('/api/users', findUser);

router.get('/api/users/me', findByUsersMe);

router.get('/api/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), findByIdUser);

router.patch('/api/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateInfoByIdUser);

module.exports = router;
