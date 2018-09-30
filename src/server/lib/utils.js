const jwt = require('jsonwebtoken');
import {secret} from "../config";

const validateToken = req => {
    return new Promise((resolve, reject) => {
        jwt.verify(req.headers.authorization, secret, (error, decoded) => {
            if (error)
                resolve(false);
            resolve(decoded);
        });
    });
};

export {
    validateToken
};