const express = require('express');
const usersController = require('../controllers/users');
const authentic = require('../middleWare/authentic');
const { isAdmin, isUser } = require('../middleWare/authoriz');
const upload = require('../middleWare/upload');

const usersRouter = express.Router();
usersRouter.get('/users', authentic, usersController.getList);
usersRouter.get('/users/:id', authentic, usersController.getDetail);
usersRouter.post('/users', upload, usersController.insert);
usersRouter.post('/login', usersController.login);
usersRouter.patch('/users/:id', authentic, isAdmin, isUser, usersController.update);
usersRouter.delete('/users/:id', authentic, isAdmin, usersController.destroy);

module.exports = usersRouter;
