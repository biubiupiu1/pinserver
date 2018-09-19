const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');


mongoose.connect('mongodb://localhost:27017/pinduoduo', {
    useMongoClient: true,
});

let adminSchema = new mongoose.Schema({
    userName: String,
    password: String
});

let goodsSchema = new mongoose.Schema({
    imgPath: String,
    title: String,
    content: String,
    price: Number,
    isOnline: {type: Boolean, default: false},
    dateTime: {type: Date, default: Date.now},
});

let Models = {
    Admin: mongoose.model('Admin', adminSchema),
    Goods: mongoose.model('Goods', goodsSchema)
};

export default Models;