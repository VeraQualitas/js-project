const db = require("../models/model");
const People = db.people;
const Op = db.Sequelize.Op;


exports.add_person = (req, res) => {
    res.setTimeout(1000, function(){
        console.log('Request ghas timed out.');
            res.sendStatus(407);
    });
};

exports.edit_person = (req, res) => {};

exports.remove_person = (req, res) => {};

exports.people = (req, res) => {};