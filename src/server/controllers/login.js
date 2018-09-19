import db from "../db/db";
const jwt = require('jsonwebtoken');

const secret = 'BIUBIUPIUQING';

module.exports = function (req, res) {

    let userName = req.body.userName;
    let password = req.body.password;
    db.Admin.findOne({userName}, function (err, doc) {
        if (err)
            return res.status(500).send();
        if (!doc || doc.password !== password)
            res.send({code: 101});                  //密码错误
        else {
            let payload = {userName};
            let token = jwt.sign(payload, secret, {expiresIn: '1day'});
            res.send({code: 100, token});
        }
    });

};