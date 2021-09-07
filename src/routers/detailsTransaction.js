const express = require('express');
const detailsTransactionController = require('../controllers/detailsTransaction');
const authentic = require('../middleWare/authentic');
const { isAdmin } = require('../middleWare/authoriz');

const detailsTransactionRouter = express.Router();
detailsTransactionRouter.get('/details-transaction', authentic, detailsTransactionController.getList);
detailsTransactionRouter.get('/details-transaction/:id', authentic, detailsTransactionController.getDetail);
detailsTransactionRouter.post('/details-transaction', authentic, detailsTransactionController.insert);
detailsTransactionRouter.patch('/details-transaction/:id', authentic, isAdmin, detailsTransactionController.update);
detailsTransactionRouter.delete('/details-transaction/:id', authentic, isAdmin, detailsTransactionController.destroy);

module.exports = detailsTransactionRouter;
