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
    foto: {
        type: String
    },
    stock: {
        type: Number,
        required: true,
        max: 5000
    }
})

const productosModel = mongoose.model('Productos', productoSchema)

module.exports = productosModel;