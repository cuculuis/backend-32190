const { postCarrito, deleteCarrito, postProdCarrito, getCarritoById, deletePrdCarrito } = require('../Controles/controlCarrito');
const express = require('express')

const routerCarrito = express.Router();

routerCarrito.get('/:id/productos', getCarritoById);
routerCarrito.post('/', postCarrito);
routerCarrito.post('/:id/productos/:id_prod', postProdCarrito);
routerCarrito.delete('/:id', deleteCarrito);
routerCarrito.delete('/:id/productos/:id_prod', deletePrdCarrito);

module.exports = routerCarrito;