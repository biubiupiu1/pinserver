import db from "../../db/db";
import {secret} from "../../config/index";

const jwt = require('jsonwebtoken');

module.exports = function (req, res) {

    if(!req.body.query)
        return res.status(500).send();

};