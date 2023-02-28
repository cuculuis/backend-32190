const express = require('express');
const app = express();
// const routerCarrito = require('./Routers/routerCarrito');
const routerProductos = require('./Routers/routerProductos');

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', routerProductos);
// app.use('/api/carrito', routerCarrito);




app.listen(PORT, () => {
    console.log('Escuchando en el servidor en el puerto: ' + PORT);
})