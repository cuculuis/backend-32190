const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./handlers/contenedor.js')

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));
app.set('view engine', 'ejs');

const productosContenedor = new Contenedor('./DB/productos.txt');
const mensajesContenedor = new Contenedor('./DB/mensajes.txt');

const dbProductos = async () => {
    try {
            let data = await productosContenedor.getAll()
            return data;
        } catch (error) {console.log(error);}
    }
const dbMensajes = async () => {
    try {
            let data = await mensajesContenedor.getAll()
            return data;
        } catch (error){console.log(error);}
    }

app.get("/", async (req, res) => {
    try{
        res.render("body", {productos: await dbProductos(), mensajes: await dbMensajes()});
    }
    catch (error){
        console.log(error);
    }
});



io.on("connection", async (socket) => {
    let mensajes = await dbMensajes();
    let productos = await dbProductos();
    console.log('Se conectó un nuevo usuario');

    socket.emit("productos", productos);
    socket.emit("mensajes", mensajes);


    socket.on("newProduct", async (data) => {
        await productosContenedor.save(data);
        io.sockets.emit('productos', productos);
    });

    socket.on("newMessage", async (data) => {
        await mensajesContenedor.save(data);
        io.sockets.emit("mensajes", mensajes);
    });

    });


const server = httpServer.listen(PORT, () => {
    console.log('Servidor escuchando en el: ' + PORT);
})