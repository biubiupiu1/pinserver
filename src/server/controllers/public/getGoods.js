import db from "../../db";

module.exports = async function (req, res, validateToken) {

    let limit = req.body.limit || 10;

    let expire = await validateToken(req);

    db.Goods.find({}).limit(limit).exec((err, result) => {
        if (err)
            return res.status(500).send();

        res.setHeader('Cache-control', 'public,max-age=86400');

        let statusCode = !!expire ? 200 : 401;
        res.status(statusCode).send({code: 200, data: result});
    })

};