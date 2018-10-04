const db = require('../../db');

module.exports = function (req, res) {

    let title = req.body.title;
    let content = req.body.content;
    let price = req.body.price;
    let imgPath = req.body.imgPath;
    let user = req.body.user;

    if (!title || !content || !price || !imgPath || !user)
        return res.send({code: 101, msg: '参数缺少'});     //参数缺少（code 101）

    new db.goods({title, content, price, imgPath, user}).save(err => {
        if (err)
            return res.status(500).send();

        db.images.deleteOne({imgPath});

        res.send({code: 200})
    })

};