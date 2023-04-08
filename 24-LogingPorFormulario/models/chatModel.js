const mongoose = require('mongoose');
const {cliente} = require('../DBConnection/mongoConnection')

const chatSchema = new mongoose.Schema({
    autor:
        {
            id: String,
            email: String,
        },
    text: String,
    fecha: String,
    id:Number
    });
    
    const chatModel = mongoose.model('chat', chatSchema);
    
module.exports = chatModel;
