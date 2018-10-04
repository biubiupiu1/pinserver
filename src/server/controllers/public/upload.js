import db from "../../db";

const path = require('path');
const formidable = require('formidable');
const uploadDir = path.resolve(__dirname, '../../public');

module.exports = function (req, res) {

    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function (err, params, files) {
        if (err)
            return res.status(500).send();

        let imgPath = 'public/' + path.basename(files.file.path);

        new db.Images({imgPath}).save(err => {
            if(err)
                return res.status(500).send();

            res.send({code: 200, imgPath})
        })

    });


};