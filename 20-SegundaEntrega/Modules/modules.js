const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
        max: 500
    },
    codigo: {
        type: String,
        required: true,
        max: 6,
        unique: true
    },
    stock: {
        type: Number,
        required: true,
        max: 5000
    },
    foto: {
        type: String
    }
})

module.exports = mongoose.model('Productos', productoSchema)