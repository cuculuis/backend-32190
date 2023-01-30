const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productos = [];

app.set("view engine", "ejs");

app.get("/productos", async (req, res) => {
    let exist = productos.length > 0;
    res.render("body", {productos: productos, listExists: exist});
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/productos')
})

const server = app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto: " + PORT);
})