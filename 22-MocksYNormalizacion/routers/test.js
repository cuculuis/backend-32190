const { Router } = require('express');
const { faker } = require('@faker-js/faker');

faker.locale = 'es';

const productosTest = Router();

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

module.exports = productosTest;