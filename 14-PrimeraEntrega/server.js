const express = require('express');
const app = express();
const routerCarrito = require('./Routers/routerCarrito');
const routerProductos = require('./Routers/routerProductos');

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.get('*', (req, res) => {
    const ruta = req.path;
    const metodo = req.method;
    res.send({Error: -1, descripción: `La ruta ${ruta} y el método ${metodo} no autorizado.`});
})




app.listen(PORT, () => {
    console.log('Escuchando en el servidor en el puerto: ' + PORT);
})