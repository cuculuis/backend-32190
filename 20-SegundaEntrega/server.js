const express = require('express');
const app = express();

const productos = require('./Routers/routerProductos');
const carrito = require('./Routers/routerCarrito');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080

app.use('/api/productos', productos);
app.use('/api/carrito', carrito);

app.get('*', (req, res) => {
    const ruta = req.path;
    const metodo = req.method;
    res.send({Error: -1, descripción: `La ruta ${ruta} y el método ${metodo} no autorizado.`});
})

app.listen(PORT, () => {
    console.log('Escuchando en el servidor en el puerto: ' + PORT);
})


