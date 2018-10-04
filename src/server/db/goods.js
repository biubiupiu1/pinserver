module.exports = mongoose => {

    const types  = mongoose.Schema.Types;

    let goodsSchema = new mongoose.Schema({
        imgPath: {type: String, required: true},
        title: {type: String, required: true},
        content: {type: String, required: true},
        price: {type: Number, required: true},
        user: {type: types.ObjectId, ref: 'Users', required: true},
        isOnline: {type: Boolean, default: false},
        dateTime: {type: Date, default: Date.now},
    });

    goodsSchema.virtual('out_price').get(function () {
        return this.price.toFixed(2);
    });

    goodsSchema.set('toJSON', { virtuals: true });

    return mongoose.model('Goods', goodsSchema);

};
