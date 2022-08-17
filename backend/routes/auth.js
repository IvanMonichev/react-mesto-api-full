const router = require('express').Router();
const {
  registerValid,
  loginValid,
} = require('../middlewares/validation');
const { createUser, loginUser, logout } = require('../controllers/users');

router.post('/signup', registerValid, createUser);
router.post('/signin', loginValid, loginUser);
router.post('/signout', logout);

module.exports = router;
