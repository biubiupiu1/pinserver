module.exports = mongoose => {

    const types  = mongoose.Schema.Types;

    let chatsSchema = new mongoose.Schema({
        users: [{type: types.ObjectId, ref: 'Users', required: true}],
        records: [{type: types.ObjectId, ref: 'Record', required: true}],

    });

    return mongoose.model('Chats', chatsSchema);
};