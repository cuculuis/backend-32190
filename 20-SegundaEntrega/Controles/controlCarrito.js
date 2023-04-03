const CarritoDAO = require('../Contenedores/contenedorFirebase');
const ProductosDAO = require('../Contenedores/contenedorMongo');

const carritos = new CarritoDAO('carrito');
const products = new ProductosDAO();

const getCarritoById = async (req, res) => {
        const carrito = await carritos.getCarritoById(req.params.id);
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
    const idProducto = req.params.id_prod;
    const idCarrito = req.params.id;
    
    try {
        const carritoDoc = await carritos.query.doc(idCarrito).get()
        if (!carritoDoc) {
            res.json(`No se encontró el carrito con id ${idCarrito}`);
        }
        const productoId = await products.getById(idProducto)
        if (!productoId){
            res.json(`No se encontró el producto con id ${idProducto}`);
        }
        
        const productosActuales = await carritoDoc.data().productos

            await productosActuales.push(JSON.parse(JSON.stringify(productoId)));

            await carritos.updateById(idCarrito , {productos: productosActuales})

        res.json("Se agregó el producto con id: " + JSON.stringify(productoId._id))

    } catch (error) {
        res.json('No se pudo agregar al carrito con id: ' + idCarrito + ' el producto con id: ' + idProducto + ': ' + error)
    }
}

const deleteCarrito = async (req, res) => {
    res.json(await carritos.deleteById(req.params.id))
}

const deletePrdCarrito = async (req, res) => {
    const idProducto = req.params.id_prod;
    const idCarrito = req.params.id;

    try {   
            const carritoDoc = await carritos.query.doc(idCarrito).get()
                if (!carritoDoc) {
                    res.json(`No se encontró el carrito con id ${idCarrito}`);
                }
            const productosActuales = await carritoDoc.data().productos
            const index = productosActuales.findIndex((prod) => prod._id === idProducto)
                if (index === -1) {
                        throw new Error(`El producto con id ${idProducto} no se encuentra en el carrito n°: ${idCarrito}`);
                    }
            
            await productosActuales.splice(index, 1);
            await carritos.updateById(idCarrito , {productos: productosActuales})

                res.json("Se borró el producto con id: " + JSON.stringify(idProducto))
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