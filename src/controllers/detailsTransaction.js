const redis = require('redis');
const _ = require('lodash');
const detailsTransactionModel = require('../models/details_transaction_model');
const { success, failed } = require('../helpers/response');

const client = redis.createClient();
const redisAction = require('../helpers/redis');

const detailsTransaction = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      // eslint-disable-next-line radix
      const limit = query.limit === undefined ? '5' : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      client.get('detailsTransaction', (err, resultRedis) => {
        if (!resultRedis) {
          // eslint-disable-next-line max-len
          detailsTransactionModel.getList(search, field, typeSort, limit, offset).then(async (result) => {
            const allData = await detailsTransactionModel.getAll();
            redisAction.set('detailsTransaction', JSON.stringify(allData));
            const response = {
              data: result,
              totalPage: Math.ceil(allData.length / limit),
              search,
              limit,
              page: req.query.page,
            };
            success(res, response, 200, 'Get all details Transaction success');
          });
        } else {
          const dataRes = JSON.parse(resultRedis);
          const sort = _.sortBy(dataRes, typeSort);
          const pagination = _.slice(sort, offset, offset + limit);
          const response = {
            data: pagination,
            totalPage: Math.ceil(dataRes.length / limit),
            search,
            limit,
            page: req.query.page,
          };
          success(res, response, 200, 'Get all details Transaction success');
        }
      });
    } catch (err) {
      failed(res, 404, err);
    }
  },
  getDetail: (req, res) => {
    try {
      const { id } = req.params;
      client.get('detailsTransaction', (err, resultRedis) => {
        if (!resultRedis) {
          detailsTransactionModel
            .getDetail(id)
            .then((result) => {
              success(res, result, 200, 'Get details Transaction success');
            })
            .catch((error) => {
              failed(res, 404, error);
            });
        } else {
          const dataRes = JSON.parse(resultRedis);
          success(res, dataRes, 200, 'Get Details Transaction Succes');
        }
      });
    } catch (err) {
      failed(res, 404, err);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;

      detailsTransactionModel
        .insert(body)
        .then((result) => {
          client.del('detailsTransaction');
          success(res, result, 201, 'Insert data details Transaction success');
        })
        .catch((err) => {
          failed(res, 400, err);
        });
    } catch (err) {
      failed(res, 400, err);
    }
  },
  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      detailsTransactionModel
        .update(id, body)
        .then((result) => {
          client.del('detailsTransaction');
          success(res, result, 200, 'Update data details Transaction success');
        })
        .catch((err) => {
          failed(res, 400, err);
        });
    } catch (err) {
      failed(res, 400, err);
    }
  },
  destroy: (req, res) => {
    try {
      const { id } = req.params;
      detailsTransactionModel
        .destroy(id)
        .then((result) => {
          client.del('detailsTransaction');
          success(res, result, 200, 'Delete data details Transaction success');
        })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 404, err);
    }
  },
};

module.exports = detailsTransaction;
