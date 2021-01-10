const studentRouter = require('express').Router();
studentRouter.use('/register', require('./register'));
studentRouter.use('/login', require('./login'));
studentRouter.use('/location', require('./location'));

module.exports = studentRouter;
