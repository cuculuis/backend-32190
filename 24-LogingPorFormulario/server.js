const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const productosTest = require('./routers/test');
const { normalize, denormalize, schema } = require('normalizr');
const util = require ('util');
const Container = require('./contenedor/contenedor');

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology:true}

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://cuculuis:mango123@clustmysticshop.5ivclcv.mongodb.net/messenger?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: "BackEnd",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: 60000}
}))


app.use('/api/productos-test', productosTest);
app.set('view engine', 'ejs')

app.get('*', (req, res) => {
    const ruta = req.path;
    const metodo = req.method;
    res.send({Error: -1, descripción: `La ruta ${ruta} y el método ${metodo} no autorizado.`});
})



const chat = new Container();

io.on('connection', async socket =>{
    const listaMensajes = await chat.MostrarChat()
    const strin = JSON.stringify(listaMensajes)
    const data = JSON.parse(strin)
    const mensajesId = {
        id: 'backendCoder',
        messages: data
    };
    const autor = new schema.Entity('autor',{},{idAttribute: "email"})
    const messageSchema = new schema.Entity('mensaje', {
        autores: autor
    })
    const messagesSchema = new schema.Entity("messages", {
        messages: [messageSchema]
    });

    const messagesNorm = normalize(mensajesId, messagesSchema);

    print(messagesNorm)

    const compresion = 100 - (JSON.stringify(messagesNorm).length * 100 / JSON.stringify(mensajesId).length) + "%"


    socket.emit('menssages', messagesNorm)
    socket.emit("compres",compresion)
    socket.on('new-message', async data => {

        if (listaMensajes.length === 0) {
            return await chat.AgregaralChat({...data, id: 1,fecha:new Date().toLocaleString()
            })
        }
            await chat.AgregaralChat({...data, id: listaMensajes.length +1, fecha: new Date().toLocaleString(),
            })
    
        io.sockets.emit('menssages', listaMensajes)
    })
    })

    function print(objeto) {
        console.log(util.inspect(objeto,false,12,true))
    }


const PORT = 8080;

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
