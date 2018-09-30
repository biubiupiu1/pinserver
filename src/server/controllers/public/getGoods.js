import db from "../../db/db";

module.exports = async function (req, res, validateToken) {

    let limit = req.body.limit || 10;

    let expire = await validateToken(req);

    db.Goods.find({}).limit(limit).exec((err, result) => {
        if (err)
            return res.status(500).send();

        let statusCode = !!expire ? 200 : 401;
        console.log(result);
        res.status(statusCode).send({code: 200, data: result});
    })

};