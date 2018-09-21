import db from "../db/db";

module.exports = function (req, res) {

    let limit = req.body.limit || 10;

    new db.Goods.find({}).limit(limit).save((err, res) => {
        if (err)
            return res.status(500).send();

        res.send({code: 200, data: res});
    })

};