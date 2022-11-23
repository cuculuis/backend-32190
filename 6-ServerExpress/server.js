const Contenedor = require('./src/contenedor.js');
const productos = new Contenedor('./src/productos.txt')

async () => {
    await productos.save({title: 'Pan de maiz', price: 50, thumbnail: '/img/img1.png'});
    await productos.save({title: 'Pan de coco', price: 20, thumbnail: '/img/img2.png'});
    await productos.save({title: 'Pan de jamón', price: 100, thumbnail: '/img/img3.png'});
};

const express = require('express');
const app = express()
const PORT = 8080;

app.get('/', (req, res) => {
    res.send(`<h1 style='color: blue;'>Bienvenidos a la super clase de servidores</h1>`)
})

app.get('/productos', async (req, res) => {
        res.send(await productos.getAll())
        });

app.get('/productoRandom', async (req, res) => {
        let randomNumber = Math.floor((Math.random() * 3) + 1)
        res.json(await productos.getById(randomNumber));
        });

const server = app.listen(PORT, () => {
    console.log('Se ha iniciado el server en el puerto: ' + PORT)
})

server.on('error', (error) => console.error(error));