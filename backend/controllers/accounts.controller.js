const db = require("../models/model");
const Accounts = db.accounts;
const Op = db.Sequelize.Op;

const accounts_validators = require('../validators/accounts.validator');

exports.sign_up = (req, res) => {
    data = accounts_validators.sign_up(req.body);
    if (!data.flag) {
        res.status(200).json({'response': data.data});
        return;
    }
    const account = data.data;
    Accounts.create(account).then(response => {
      res.send(response);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
    console.log(req.body);

};
