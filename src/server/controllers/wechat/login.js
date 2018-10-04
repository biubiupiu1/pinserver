import db from "../../db";
import {secret} from "../../config/index";

const request = require('request');
const qs = require('querystring');
const jwt = require('jsonwebtoken');

module.exports = function (req, res) {

    if (!req.body.code || !req.body.userInfo)
        return res.status(500).send();

    let data = {
        appid: 'wxe32f356d3913a405',
        secret: '8905c81d4df7d4a4d140b177b9ccc57e',
        js_code: req.body.code,
        grant_type: 'authorization_code'
    };

    request('https://api.weixin.qq.com/sns/jscode2session?' + qs.stringify(data), function (error, response, body) {

        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            let openid = body.openid;
            let userInfo = req.body.userInfo;

            db.Users.findOne({openid}, function (err, doc) {

                if (err)
                    return res.status(500).send();
                if (doc) {

                    doc.userInfo = userInfo;
                    db.Users(doc).save(function (err) {
                        if (err)
                            return res.status(500).send();
                        onSuccess(res, openid);
                    });

                } else {
                    new db.Users({openid, userInfo}).save(function (err) {
                        if (err) {
                            console.log(err);
                            return res.status(500).send();
                        }
                        onSuccess(res, openid);
                    })
                }

            });

        }
    });
};

function onSuccess(res, openid) {

    let token = jwt.sign({openid}, secret, {expiresIn: '1day'});
    res.send({code: 200, token})

}