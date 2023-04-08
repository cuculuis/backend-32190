const express = require('express');
const { faker } = require('@faker-js/faker');   
const { crearUsuario, getUsuario, salir } = require('../Controles/ingresar')
faker.locale = 'es';


const ingresar = express.Router()

ingresar.get('/ingresar', getUsuario)
ingresar.post('/ingresar', crearUsuario)
ingresar.get('/salir', salir)


const productosTest = express.Router()

productosTest.get('/', (req, res) => {
    let mensajes = []
    for (let i = 0; i < 5; i++) {
        mensajes.push(crearProducto(i+1))
    }
    
    res.render('body', {mensajes})
})


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