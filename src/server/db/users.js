module.exports = mongoose => {
    let usersSchema = new mongoose.Schema({
        userInfo: {type: Object, required: true},
        openid: {type: String, required: true},
        tel: {type: String},
    });

    return mongoose.model('Users', usersSchema);
};
