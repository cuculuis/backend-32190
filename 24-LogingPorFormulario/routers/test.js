const express = require('express');
const { faker } = require('@faker-js/faker');   

faker.locale = 'es';


const ingresar = express.Router()

ingresar.get('/ingresar', (req, res, next) => {
    res.render('login');
})

ingresar.post('/ingresar', (req, res, next) => {
    const usuario = req.body.text;
    
    req.session.text = usuario;
    res.redirect('body');
})

ingresar.post('/salir', (req, res) => {
    const usuario = req.session.text;
    const despedida = `Hasta luego ${usuario}`;
    req.session.destroy((err) => {
    if (err) {
        res.json({ error: 'algo hiciste mal', descripcion: err });
    } else {
        res.render('despedida', { despedida });
        }
    });
})


const productosTest = express.Router()

productosTest.get('/', (req, res) => {
    const user = req.session.text
    let mensajes = []
    for (let i = 0; i < 5; i++) {
        mensajes.push(crearProducto(i+1))
    }
    
    res.render('body', {user, mensajes})
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