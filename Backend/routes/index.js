const express = require('express');
const UserRoute = require('./user/userRoute');

const router = express.Router();

// user Route
router.use('/user', UserRoute);

module.exports = router;
