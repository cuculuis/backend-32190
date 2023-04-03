const ProductosDAO = require('../Contenedores/contenedorMongo');
const Productos = require('../Modules/modules')

const productos = new ProductosDAO();

const getAllProductos = async (req, res) => {
    res.json(await productos.getAll());
}

const getProductos = async (req, res) => {
    const id = req.params.id
    if (id === undefined) {
        const allProductos = await productos.getAll();
        res.json(allProductos)
    }
    const producto = await productos.getById(id);
    res.json(producto);
    }


const postProducto = async (req, res) => {
    const newProducto = new Productos({
        timestamp : Date.now(),
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        codigo : req.body.codigo,
        precio : req.body.precio,
        foto : req.body.foto,
        stock : req.body.stock,
    })

    const producto = await newProducto.save()

    res.json(await producto)
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

    res.json(await productos.updateById(req.params.id, updateProducto))
}

const deleteProducto = async (req, res) => {
    res.json(await productos.deleteById(req.params.id))
}

module.exports = {
    getAllProductos,
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
}