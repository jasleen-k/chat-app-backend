const { register } = require('../controllers/users');
const { login } = require('../controllers/users');
const { setAvatar } = require('../controllers/users');
const { getAllUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);

router.get('/allUsers/:id', getAllUsers);
router.get('/getUser/:id', getUser);

module.exports = router;
