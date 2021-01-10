const APIRouter = require('express').Router();
APIRouter.use('/student', require('./Student'));

module.exports = APIRouter;
