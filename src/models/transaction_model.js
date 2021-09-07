const db = require('../config/db');

const transactionModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(
      `SELECT transaction.id, transaction.address, 
    delivery_method, 
    payment_method, 
    time,  
    remark,
    subtotal,
    shipping,
    total,
    user_id
    FROM transaction
    LEFT JOIN users ON transaction.user_id = users.id`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select transaction.id, transaction.address, 
      delivery_method, 
      payment_method, 
      time,
      remark,
      subtotal,
      shipping,
      total,
      user_id
      FROM transaction
      LEFT JOIN users ON transaction.user_id = users.id
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
  getDetails: (id) => new Promise((resolve, reject) => {
    db.query(
      `SELECT transaction.id, transaction.address, 
    delivery_method, 
    payment_method, 
    time, 
    remark,
    subtotal,
    shipping,
    total, 
    user_id
    FROM transaction
    LEFT JOIN users ON transaction.user_id = users.id WHERE id_transaction='${id}'`,
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
      `INSERT INTO transaction (
        address, 
        delivery_method, 
        payment_method, 
        time, 
        remark,
        subtotal,
        shipping,
        total, 
        user_id
      ) VALUES (
        '${body.address}','${body.delivery_method}',
        '${body.payment_method}','${body.time}',
        ,'${body.remark}','${body.subtotal}','${body.shipping}','${body.total}'
        '${body.user_id}')`,
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
      `UPDATE transaction set address=${body.address},
         delivery_method='${body.delivery_method}',payment_method='${body.payment_method}',time=${body.time},remark=${body.remark},subtotal=${body.subtotal},shipping=${body.shipping},total=${body.total},
         user_id=${body.user_id}
        where id_transaction='${id}'`,
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
    db.query(`delete from transaction where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = transactionModel;
