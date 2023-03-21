const { configDBMaria } = require('./ConnectionDB/mysqlConnection');
const { configSQL } = require('./ConnectionDB/sqlLiteConnection');
const PrdContainer = require('./Containers/prdContainer');
const ContainerChat = require('./Containers/chatContainer');

const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static("./public"));
app.set("view engine", "ejs");

const chatSQL = new ContainerChat(configSQL)
const prodSQL = new PrdContainer(configDBMaria)

chatSQL.crearTabla()
prodSQL.crearTabla()
    
const dbProductos = async () => {
    try {
        let data = await prodSQL.listarArticulos()
            return data;
        } catch (error) {console.log(error);}
    }
const dbMensajes = async () => {
    try {
        let data = await chatSQL.listarArticulos()
            return data;
        } catch (error){console.log(error);}
    }

app.get('/', async (req, res) => {
    try{
        res.render("body", {productos: await dbProductos(), mensajes: await dbMensajes()});
    }
    catch (error){
        console.log(error);
    }
})

io.on("connection", async (socket) => {
    let mensajes = await dbMensajes();
    let productos = await dbProductos();
    console.log('Se conectó un nuevo usuario');

    socket.emit("productos", productos);
    socket.emit("messages", mensajes);


    socket.on("newProduct", async (data) => {
        await prodSQL.insertarArticulos(data);
        productos = await dbProductos();
        io.sockets.emit('productos', productos);
    });

    socket.on("newMessage", async (data) => {
        await chatSQL.insertarArticulos(data);
        mensajes = await dbMensajes();
        io.sockets.emit("messages", mensajes);
    });

    socket.on("disconnect", async socket => {
        console.log("desconcetado")
        await prodSQL.close()
        await chatSQL.close()
        console.log("desconcetado")
    })

    });


const server = httpServer.listen(PORT, () => {
    console.log('Servidor escuchando en el: ' + PORT);
})