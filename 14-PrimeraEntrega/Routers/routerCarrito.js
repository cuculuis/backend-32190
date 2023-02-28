const { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } = require('../Controles/controlCarrito');
const express = require('express')

const routerCarrito = express.Router();


routerCarrito.post('/', postCarrito);
routerCarrito.delete('/:id', deleteCarrito);
routerCarrito.get('/:id/productos', getProductosCarrito);
routerCarrito.post('/:id/productos', postProductoCarrito);
routerCarrito.delete('/:id/productos/:id_prod', deleteProductoCarrito);

module.exports = routerCarrito;