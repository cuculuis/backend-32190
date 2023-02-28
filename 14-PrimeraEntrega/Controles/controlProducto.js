const contenedorProductos = require('./contenedor')

const productos = new contenedorProductos('../DB/carrito.txt');

const getProductoById = (res, req) => {
    id = req.params.id;

    if (id === undefined) {
        res("No hay producto con ese id")
    } else {
        const producto = productos.getById(id);
        res(producto);
    }
}

const postProducto = (req, res) => {
    const newProducto = {
        timestamp : Date.now(),
        nombre : request.body.nombre,
        descripcion : request.body.descripcion,
        codigo : request.body.codigo,
        precio : request.body.precio,
        foto : request.body.foto,
        stock : request.body.stock,
    }

    res(productos.save(newProducto))
}

const putProducto = (req, res) => {

}

const deleteProducto = (req, res) => {
    res(productos.deleteById(req.params.id))
}

module.exports = {
    getProductoById,
    postProducto,
    putProducto,
    deleteProducto
}