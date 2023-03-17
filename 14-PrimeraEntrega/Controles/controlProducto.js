const contenedorProductos = require('./contenedor')

const productos = new contenedorProductos('./DB/productos.txt');

const getProductos = async (req, res) => {
    const id = parseInt(req.params.id);
    if (id === undefined) {
        const allProductos = await productos.getAll();
        res.json(allProductos)
    }
    const producto = await productos.getById(id);
    res.json(producto);
    }


const postProducto = async (req, res) => {
    const newProducto = {
        timestamp : Date.now(),
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        codigo : req.body.codigo,
        precio : req.body.precio,
        foto : req.body.foto,
        stock : req.body.stock,
    }

    res.json(await productos.save(newProducto))
}

const putProducto = async (req, res) => {
    const updateProducto = {
        id : req.params.id,
        timestamp : Date.now(),
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        codigo : req.body.codigo,
        precio : req.body.precio,
        foto : req.body.foto,
        stock : req.body.stock,
    }

    res.json(await productos.updateById(parseInt(req.params.id), updateProducto))
}

const deleteProducto = async (req, res) => {
    res.json(await productos.deleteById(parseInt(req.params.id)))
}

module.exports = {
    productos,
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
}