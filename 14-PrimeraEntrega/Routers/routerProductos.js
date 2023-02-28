const { getProducto, postProducto, putProducto, deleteProducto } = require('../Controles/controlProducto');
const express = require('express')

const admin = true;

const routerProductos = express.Router();

routerProductos.get('/:id?', getProducto);
routerProductos.post('/',  postProducto);
routerProductos.put('/:id', putProducto);
routerProductos.delete('/:id', deleteProducto);

module.exports = routerProductos;