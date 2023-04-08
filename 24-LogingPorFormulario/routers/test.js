const express = require('express');
const { faker } = require('@faker-js/faker');   

faker.locale = 'es';


const productosTest = express.Router()

productosTest.get('/ingresar', (req, res) => {
    res.render('login');
})

productosTest.post('/ingresar', (req, res) => {
    const usuario = req.body.text;
    
    req.session.text = usuario;
    res.redirect('/api/productos-test');
})

productosTest.get('/salir', (req, res) => {
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

productosTest.get('/', (req, res) => {
    const user = req.session.text
    if (user) {
        let mensajes = []
        for (let i = 0; i < 5; i++) {
            mensajes.push(crearProducto(i+1))
        }
        res.render('body', { mensajes, user});
    } else {
        res.redirect('/api/productos-test/ingresar');
    }
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