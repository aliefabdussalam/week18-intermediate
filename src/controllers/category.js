const categoryModel = require('../models/category_model');
const { success, failed } = require('../helpers/response');

const category = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? '2' : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      categoryModel
        .getList(search, field, typeSort, limit, offset)
        .then(async (result) => {
          const allData = await categoryModel.getAll();
          const response = {
            data: result,
            totalPage: Math.ceil(allData.length / limit),
            search,
            limit,
            page: req.query.page,
          };
          success(res, response, 200, 'Get all users success');
        })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 404, err);
    }
  },
  getDetail: (req, res) => {
    try {
      const { id } = req.params;
      categoryModel
        .getDetail(id)
        .then((result) => {
          success(res, result, 200, 'Get details user success');
        })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 404, err);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      categoryModel
        .insert(body)
        .then((result) => {
          success(res, result, 201, 'Create data user success');
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
      categoryModel
        .update(id, body)
        .then((result) => {
          success(res, result, 200, 'Update data users success');
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
      categoryModel
        .destroy(id)
        .then((result) => {
          success(res, result, 200, 'Delete data users success');
        })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 404, err);
    }
  },
};

module.exports = category;
