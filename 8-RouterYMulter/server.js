const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const apiRouter = express.Router();

app.use('/api/productos/', apiRouter);

class ManejoDeProductos {
    constructor() {
        this.productos = [];
        this.index = 1
    }

    getAll() {
        return this.productos;
    }

    getById(id) {
        const producto = this.productos.find(p => p.id === id);
        if(!producto){
            return { error: 'producto no encontrado.' }
        }

        return this.productos[id]
    }

    add(producto) {
        const nuevoProducto = {...producto, id: this.index}
        this.productos.push(nuevoProducto);
        this.index++
        return nuevoProducto;
    }

    update(id, productoNow) {
        const index= this.productos.findIndex(p => p.id === id);
        if (index === -1) {
            return { error: 'producto no encontrado.'}
        };

        this.productos[index] = productoNow;
        return this.productos[index];
    }

    delete(id) {
        const index= this.productos.findIndex(p => p.id === id);
        if (index === -1) {
            return { error: 'producto no encontrado.'}
        };

        this.productos.splice(1, index);
        return {}
    }
}

const mercadito = new ManejoDeProductos();

apiRouter.get('/', (req, res) => {
    res.json(mercadito.getAll());
    });

apiRouter.get('/:id', (req, res) => {
    const producto = mercadito.getById(parseInt(req.params.id))
    res.json(producto)
})

apiRouter.post('/', (req, res) => {
    const agregarProducto = mercadito.add(req.body);
    res.json(agregarProducto);
    });

apiRouter.put('/:id', (req, res) => {
    const actualizarProducto = mercadito.update(parseInt(req.params.id), req.body);
    res.json(actualizarProducto);
    });
        
apiRouter.delete('/:id', (req, res) => {
    mercadito.delete(parseInt(req.params.id));
    res.json({});
    });



const PORT = 8080;

app.listen(PORT, () => {
    console.log('Servidor escuchando al puerto: ' + PORT);
});

