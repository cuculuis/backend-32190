const mongoose = require('mongoose');
const { cliente } = require('../DBConnections/mongoConnection')

const productoSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
        default: new Date()
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

const productosModel = mongoose.model('Productos', productoSchema)

module.exports = productosModel;
