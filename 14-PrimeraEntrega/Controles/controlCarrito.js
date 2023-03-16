const contenedorCarrito = require('./contenedor');
const controlProducto = require('./controlProducto');

const carritos = new contenedorCarrito('./DB/carritos.txt');

const getCarritoById = async (req, res) => {
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

const postProdCarrito = async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod);

    try {
        const carrito = await getCarritoById(idCarrito);
        if (!carrito) {
            throw new Error(`Carrito no encontrado`);
        }
        const productoId = await controlProducto.getProductos(idProducto)
        if (!productoId){
            throw new Error(`Producto no encontrado`);
        }

        const ProductoEnCarrito = {
            id: productoId.id,
            timestamp: productoId.timestamp,
            nombre: productoId.nombre,
            descripcion: productoId.descripcion,
            codigo: productoId.codigo,
            foto: productoId.foto,
            precio: productoId.precio,
            stock: productoId.stock
        }
        
        carrito.productos.push(ProductoEnCarrito)
        
        await carritos.save(carrito);        
        
        res.json("Agregado: \n" + ProductoEnCarrito)

    } catch (error) {
    throw new Error(`No se pudo agregar al carrito con id ${idCarrito} el producto con id ${idProducto}: ${error}`)
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
            const borrado = carrito.productos.splice(index, 1);
            
            res.json('Se ha borrado el siguiente producto: ' + borrado)

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