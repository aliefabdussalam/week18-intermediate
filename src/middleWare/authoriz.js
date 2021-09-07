const db = require('../config/db');
const { failed, errLogin } = require('../helpers/response');

const authorization = {
  isAdmin: (req, res, next) => {
    const id = req.idUser;
    db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
      if (err) {
        failed(res, 404, err);
      } else {
        const { level } = result[0];
        if (level === 1) {
          errLogin(res, 'Anda Bukan Admin');
        } else {
          next();
        }
      }
    });
  },
  isUser: (req, res, next) => {
    const id = req.idUser;
    db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
      if (err) {
        failed(res, 404, err);
      } else {
        const { level } = result[0];
        if (level === 1) {
          next();
        } else {
          errLogin(res, 'Anda Bukan User');
        }
      }
    });
  },
};

module.exports = authorization;
