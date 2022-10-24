const router = require('express').Router();

const { Joi, celebrate } = require('celebrate');
const {
  findUser, findByIdUser, findByUsersMe, updateInfoByIdUser,
} = require('../controllers/users');

router.get('/', findUser);

router.get('/me', findByUsersMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), findByIdUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), updateInfoByIdUser);

module.exports = router;
