const { getAllProductos, getProductos, postProducto, putProducto, deleteProducto } = require('../Controles/controlProducto');
const express = require('express')

const admin = true;

const routerProductos = express.Router();

routerProductos.get('/', getAllProductos);
routerProductos.get('/:id?', getProductos);

if (admin) {
    routerProductos.post('/',  postProducto);
    routerProductos.put('/:id', putProducto);
    routerProductos.delete('/:id', deleteProducto);
} else {
    routerProductos.post('/', function(req, res) {
        res.status(401).send({Error: -1, descripción: `La ruta ${req.path} y el método ${req.method} no autorizado.`});
    });
    routerProductos.put('/:id', function(req, res) {
        res.status(401).send({Error: -1, descripción: `La ruta ${req.path} y el método ${req.method} no autorizado.`});
    });
    routerProductos.delete('/:id', function(req, res) {
        res.status(401).send({Error: -1, descripción: `La ruta ${req.path} y el método ${req.method} no autorizado.`});
    });
}





module.exports = routerProductos;