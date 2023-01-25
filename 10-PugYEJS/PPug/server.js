const express = require('express');

const app = express();
const PORT = 8080;

const productos = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('views', './views');
app.set('view engine', 'pug');

app.get('/productos', (req, res) => {
    let exist = productos.length > 0;
    res.render('producto', { productos: productos, listExists: exist});
    console.log(productos);
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/productos')
})





const server = app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto: " + PORT);
})
