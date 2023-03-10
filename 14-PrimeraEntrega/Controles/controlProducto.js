const contenedorProductos = require('./contenedor')

const productos = new contenedorProductos('./DB/productos.txt');

const getProductoById = async (res, req) => {
    const producto = await productos.getById(parseInt(req.params.id));
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

    res.json(await productos.updateById(parseInt(req.params.id, updateProducto)))
}

const deleteProducto = async (req, res) => {
    res.json(await productos.deleteById(parseInt(req.params.id)))
}

module.exports = {
    getProductoById,
    postProducto,
    putProducto,
    deleteProducto
}