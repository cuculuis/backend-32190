const { Router } = require('express');
const { faker } = require('@faker-js/faker');
const { crearUsuario, getUsuario, salir } = require('../Controles/ingresar')
faker.locale = 'es';


const ingresar = Router();

ingresar.get('/', getUsuario)
ingresar.post('/', crearUsuario)
ingresar.get('/salir', salir)


const productosTest = Router();

if (usuario === null || usuario === undefined){
    productosTest.get('/', (req, res) => {
        res.status(401).send({Error: -1, descripción: `La ruta ${req.path} y el método ${req.method} no autorizado.`});
    });
} else {
    productosTest.get('/', (req, res) => {
        let mensajes = []
        for (let i = 0; i < 5; i++) {
            mensajes.push(crearProducto(i+1))
        }
    
        res.render('body', {mensajes})
    })
}



function crearProducto (id) {
    return {
        id: id,
        nombre: faker.commerce.product(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price(),
        foto: faker.image.food()
    }
}

module.exports = productosTest, ingresar;