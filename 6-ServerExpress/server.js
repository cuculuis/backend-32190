const Contenedor = require('./src/contenedor.js')
const express = require('express');
const app = express();
const PORT = 8080;

const productos = new Contenedor('./src/productos.txt');

const obj1 = { nombre: 'Pan', precio: 30, thumbnail: '/img/img1.png' };
const obj2 = { nombre: 'Leche', precio: 25, thumbnail: '/img/img2.png' };
const obj3 = { nombre: 'Manteca', precio: 35, thumbnail: '/img/img3.png' };
const obj4 = { nombre: 'Pera', precio: 10, thumbnail: '/img/img4.png' };
const obj5 = { nombre: 'Goma', precio: 2, thumbnail: '/img/img5.png' };

const guardandoproductos =  async () => {

    await productos.save(obj1);
    await productos.save(obj2);
    await productos.save(obj3);
    await productos.save(obj4);
    await productos.save(obj5);
    }

guardandoproductos();

app.get('/productos', async (req, res) => {
    const allProductos = await productos.getAll();
    res.send({productos: allProductos});
});

app.get('/productoRandom', async (req, res) => {
    const allProductos = await productos.getAll();
    const index = parseInt(Math.floor((Math.random() * allProductos.length) + 1));
    const productoId = await productos.getById(index);
    res.send({productoRandom: productoId});
});


const server = app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto 8080');
});

server.on('error', (error) => console.error(error));