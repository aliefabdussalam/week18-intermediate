const express = require('express');
const sizeController = require('../controllers/size');
const authentic = require('../middleWare/authentic');
const { isAdmin } = require('../middleWare/authoriz');

const sizeRouter = express.Router();
sizeRouter.get('/size', authentic, sizeController.getList);
sizeRouter.get('/size/:id', authentic, sizeController.getDetail);
sizeRouter.post('/size', authentic, isAdmin, sizeController.insert);
sizeRouter.patch('/size/:id', authentic, isAdmin, sizeController.update);
sizeRouter.delete('/size/:id', authentic, isAdmin, sizeController.destroy);

module.exports = sizeRouter;
