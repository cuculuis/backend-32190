const contenedorCarrito = require('./contenedor')

const carritos = new contenedorCarrito('./DB/carritos.txt');

const getCarritoById = async (res, req) => {
        const carrito = await carritos.getById(parseInt(req.params.id));
        res.json(carrito);
    }

const postCarrito = async (req, res) => {
    const newCarrito = {
        timestamp : Date.now(),
        productos: []
    }

    res.json(await carritos.save(newCarrito))
}

const deleteCarrito = async (req, res) => {
    res.json(await carritos.deleteById(parseInt(req.params.id)))
}

const deletePrdCarrito = async (req, res) => {
    const idProducto = parseInt(req.params.id_prod);
    const idCarrito = parseInt(req.params.id);

    try {
            const carrito = await carritos.getCarritoById(idCarrito);
            const index = carrito.productos.findIndex((prod) => prod.id === idProducto);
            if (index === -1) {
                throw new Error(`El producto con id ${idProducto} no se encuentra en el carrito n°: ${idCarrito}`);
            }
            const borrado = carrito.productos.splice(index, 1);
            
            res.json('Se ha borrado el siguiente producto: ' + borrado)

        } catch (error) {
        throw new Error(`No se pudo eliminar el producto del carrito con id ${idCarrito} y idProducto ${idProducto}: ${error}`)
    }
}

module.exports = {
    getCarritoById,
    postCarrito,
    deleteCarrito,
    deletePrdCarrito
}