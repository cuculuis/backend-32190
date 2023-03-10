const { getProductoById, postProducto, putProducto, deleteProducto } = require('../Controles/controlProducto');
const express = require('express')

const admin = true;

const routerProductos = express.Router();

routerProductos.get('/:id?', getProductoById);
routerProductos.post('/',  postProducto);
routerProductos.put('/:id', putProducto);
routerProductos.delete('/:id', deleteProducto);

module.exports = routerProductos;