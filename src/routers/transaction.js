const express = require('express');
const transactionController = require('../controllers/transaction');
const authentic = require('../middleWare/authentic');
const { isAdmin } = require('../middleWare/authoriz');

const transactionRouter = express.Router();
transactionRouter.get('/transaction', authentic, transactionController.getList);
transactionRouter.get('/transaction/:id', authentic, transactionController.getDetail);
transactionRouter.post('/transaction', authentic, transactionController.insert);
transactionRouter.patch('/transaction/:id', authentic, isAdmin, transactionController.update);
transactionRouter.delete('/transaction/:id', authentic, isAdmin, transactionController.destroy);

module.exports = transactionRouter;
