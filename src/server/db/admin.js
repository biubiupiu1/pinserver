module.exports = mongoose => {

    let adminSchema = new mongoose.Schema({
        userName: String,
        password: String
    });

    return mongoose.model('Admin', adminSchema);

};