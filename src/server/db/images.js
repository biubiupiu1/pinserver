module.exports = mongoose => {

    let imagesSchema = new mongoose.Schema({
        imgPath: {type: String, required: true},
        date: {type: Date, default: Date.now},
    });

    return mongoose.model('Image', imagesSchema);

};