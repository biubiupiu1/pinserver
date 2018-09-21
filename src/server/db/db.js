const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/pinduoduo', {
    useNewUrlParser: true
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
    Users: mongoose.model('Users', userSchema),
    Goods: mongoose.model('Goods', goodsSchema),
    Images: mongoose.model('Images', imagesSchema)
};

//new Models.Admin({userName: 'biubiupiu', password: 'biubiupiu'}).save();

export default Models;