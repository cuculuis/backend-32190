const { postCarrito, deleteCarrito, getCarritoById, deletePrdCarrito } = require('../Controles/controlCarrito');
const express = require('express')

const routerCarrito = express.Router();


routerCarrito.post('/', postCarrito);
routerCarrito.delete('/:id', deleteCarrito);
routerCarrito.get('/:id/productos', getCarritoById);
routerCarrito.delete('/:id/productos/:id_prod', deletePrdCarrito);

module.exports = routerCarrito;