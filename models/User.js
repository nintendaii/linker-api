const {Schema, model,Types} = require('mongoose');

const schema= new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tables: [{type: Types.ObjectId, ref:'Table'}]
})

module.exports = model('User',schema);