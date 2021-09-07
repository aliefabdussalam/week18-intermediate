const express = require('express');
const categoryController = require('../controllers/category');
const authentic = require('../middleWare/authentic');
const { isAdmin } = require('../middleWare/authoriz');

const categoryRouter = express.Router();
categoryRouter.get('/category', authentic, categoryController.getList);
categoryRouter.get('/category/:id', authentic, categoryController.getDetail);
categoryRouter.post('/category', authentic, isAdmin, categoryController.insert);
categoryRouter.patch('/category/:id', authentic, isAdmin, categoryController.update);
categoryRouter.delete('/category/:id', authentic, isAdmin, categoryController.destroy);

module.exports = categoryRouter;
