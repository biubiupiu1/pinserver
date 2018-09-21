import db from "../../db/db";

const formidable = require('formidable');

module.exports = function (req, res) {

    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = 'public';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function (err, params, files) {
        if (err || !params.img || !params.img.path)
            return res.status(500).send();

        let imgPath = params.img.path;

        new db.Images({imgPath}).save(err => {
            if(err)
                return res.status(500).send();

            res.send({code: 200, imgPath})
        })


    });


};