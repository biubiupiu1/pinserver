const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');


mongoose.connect('mongodb://localhost:27017/pinduoduo', {
    useMongoClient: true,
});

let userSchema = new mongoose.Schema({
    userInfo: {type: Object, required: true},
    tel: {type: String},

});

let adminSchema = new mongoose.Schema({
    userName: String,
    password: String
});

let imagesSchema = new mongoose.Schema({
    imgPath: {type: String, required: true},
    date: {type: Date, default: Date.now},
});

let goodsSchema = new mongoose.Schema({
    imgPath: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    price: {type: String, required: true},
    user: {type: Object, required: true},
    isOnline: {type: Boolean, default: false},
    dateTime: {type: Date, default: Date.now},
});

let Models = {
    Admin: mongoose.model('Admin', adminSchema),
    Goods: mongoose.model('Goods', goodsSchema),
    Images: mongoose.model('Images', imagesSchema)
};

export default Models;