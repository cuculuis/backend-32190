const CarritoDAO = require('../Contenedores/contenedorFirebase');
const ProductosDAO = require('../Contenedores/contenedorMongo');

const carritos = new CarritoDAO('carrito');
const products = new ProductosDAO();

const getCarritoById = async (req, res) => {
        const carrito = await carritos.getCarritoById(parseInt(req.params.id));
        res.json(carrito);
    }

const postCarrito = async (req, res) => {
    const newCarrito = {
        timestamp : Date.now(),
        productos: []
    }

    res.json(await carritos.crearCarrito(newCarrito))
}

const postProdCarrito = async (req, res) => {
    const idProducto = parseInt(req.params.id_prod);
    const idCarrito = parseInt(req.params.id);
    
    try {

        const carrito = await carritos.getCarritoById(idCarrito);
        if (!carrito) {
            res.json(`No se encontró el carrito con id ${idCarrito}`);
        }
        const productoId = await products.getById(idProducto)
        if (!productoId){
            res.json(`No se encontró el producto con id ${idProducto}`);
        }
        
        await carritos.productos.push(productoId)
        
        await carritos.updateById(idCarrito, carrito);        
        
        res.json("Se agregó el producto con id: " + JSON.stringify(productoId.id))

    } catch (error) {
        res.json('No se pudo agregar al carrito con id: ' + idCarrito + ' el producto con id: ' + idProducto + ': ' + error)
    }
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
            await carrito.productos.splice(index, 1);

            await carritos.updateById(idCarrito, carrito)
            
            res.json('Se ha borrado el siguiente producto con el id: ' + idProducto)

        } catch (error) {
        throw new Error(`No se pudo eliminar el producto del carrito con id ${idCarrito} y idProducto ${idProducto}: ${error}`)
    }
}

module.exports = {
    getCarritoById,
    postCarrito,
    postProdCarrito,
    deleteCarrito,
    deletePrdCarrito
}