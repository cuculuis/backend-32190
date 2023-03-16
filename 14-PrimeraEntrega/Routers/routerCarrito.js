const { postCarrito, deleteCarrito, postProdCarrito, getCarritoById, deletePrdCarrito } = require('../Controles/controlCarrito');
const express = require('express')

const routerCarrito = express.Router();


routerCarrito.post('/', postCarrito);
routerCarrito.post('/:id/producto/:id_prod', postProdCarrito);
routerCarrito.delete('/:id', deleteCarrito);
routerCarrito.get('/:id/productos', getCarritoById);
routerCarrito.delete('/:id/productos/:id_prod', deletePrdCarrito);

module.exports = routerCarrito;