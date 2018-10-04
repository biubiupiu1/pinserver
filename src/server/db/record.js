module.exports = mongoose => {
    const types  = mongoose.Schema.Types;

    let recordSchema = new mongoose.Schema({
        content: {type: String, required: true},
        date: {type: Date, default: Date.now},
        user: {type: types.ObjectId, ref: 'Users', required: true}
    });

    return mongoose.model('Record', recordSchema);
};