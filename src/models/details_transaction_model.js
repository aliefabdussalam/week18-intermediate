const db = require('../config/db');

const detailsTransactionModel = {
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `SELECT dt.id, products_id, products.name, 
          qty,
          price, 
          transaction_id
          FROM details_transaction AS dt
          INNER JOIN products ON dt.products_id = products.id
          INNER JOIN transaction ON dt.transaction_id = transaction.id
            WHERE name LIKE "%${search}%"
            ORDER BY ${field} ${typeSort}
            LIMIT ${limit} OFFSET ${offset}`,
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
      `SELECT dt.id, products_id, products.name, 
    qty,
    price, 
    transaction_id
    FROM details_transaction AS dt
    INNER JOIN products ON dt.products_id = products.id
    INNER JOIN transaction ON dt.transaction_id = transaction.id`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getDetails: (id) => new Promise((resolve, reject) => {
    db.query(
      `SELECT details.transaction_id, products_id, products.name, 
      qty,
      price, 
      transaction_id
      FROM details_transaction
      INNER JOIN products ON details_transaction.products_id = products.id
      INNER JOIN transaction ON details_transaction.transaction_id = transaction.id WHERE details_transaction='${id}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insert: (body) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO details_transaction (
        products_id, 
    qty,
    price, 
    transaction_id
      ) VALUES (
        '${body.products_id}','${body.qty}',
        '${body.price}','${body.transaction_id}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  update: (body, id) => new Promise((resolve, reject) => {
    db.query(
      `UPDATE details_transaction set products_id=${body.products_id},
         qty='${body.qty}',price='${body.price}',transaction_id=${body.transaction_id}
        WHERE id='${id}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(
      `delete from details_transaction where id='${id}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
};

module.exports = detailsTransactionModel;
