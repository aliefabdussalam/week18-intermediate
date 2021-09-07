const db = require('../config/db');

const productsModel = {
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `SELECT products.id, products.name AS name_product, products.image, size.size, size.price, products.description, products.stock, products.discount, category.name AS category, products.delivery_days, products.delivery_time FROM products INNER JOIN size_products AS size ON size.code_products = products.id INNER JOIN category ON products.category_id=category.id WHERE products.name LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getAll: () => new Promise((resolve, reject) => {
    db.query(
      'SELECT products.id, products.name AS name_product, products.image, size.size, size.price, products.description, products.stock, products.discount, category.name, products.delivery_days, products.delivery_time FROM products INNER JOIN size_products AS size ON size.code_products = products.id INNER JOIN category ON products.category_id=category.id ORDER BY products.id ASC',
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getDetail: (id) => new Promise((resolve, reject) => {
    db.query(`SELECT products.id, products.name, products.image, size.size, size.price, products.description, products.stock, products.discount, category.name AS category, products.delivery_days, products.delivery_time FROM products LEFT JOIN size_products AS size ON size.code_products = products.id INNER JOIN category ON products.category_id=category.id WHERE products.id=${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body, image) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO products (name, image, description, stock, discount, category_id, delivery_days, delivery_time) VALUE ("${body.name}", "${image}", "${body.description}", ${body.stock}, ${body.discount}, ${body.category_id}, "${body.delivery_days}", "${body.delivery_time}")`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  update: (id, body) => new Promise((resolve, reject) => {
    db.query(
      `UPDATE products SET name="${body.name}", image="${body.image}", description="${body.description}", stock=${body.stock}, discount=${body.discount}, category_id=${body.category}, delivery_days="${body.delivery_days}", delivery_time="${body.delivery_time}" WHERE id='${id}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  destroy: (id) => new Promise((resolve, reject) => {
    db.query(`DELETE FROM products WHERE id= '${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = productsModel;
