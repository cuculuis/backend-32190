const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const PORT = 8080;
app.engine('handlebars', handlebars.engine());

app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const productos = []

app.get('/productos', (req, res) => {
    let exist = productos.length > 0;
    res.render('productos', { productos: productos, listExists: exist});
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/productos')
})

const server = app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto: " + PORT);
})
