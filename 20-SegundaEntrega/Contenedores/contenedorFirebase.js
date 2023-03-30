const {db} = require('../DBConnections/firebaseConnection');

class CarritoDAO {
    constructor(collection)
    { 
        this.query = db.collection(collection)
    }

    async crearCarrito(obj) {
        try {
            const prod = await this.query.add(obj)
            return prod
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAll() {
        try {
            const prods = await this.query.get()
            const allprods = []
            prods.forEach((doc) => allprods.push(doc.data()))
            return allprods
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCarritoById(id) {
        try {
            const carritoId = await this.query.doc(id).get()
            const carrito = carritoId.data()
            return carrito
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(obj) {
        try {
            const prodUp = await this.query.doc(obj.id).update(obj)
            return prodUp
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        try {
            const prodDel = await this.query.doc(id).delete()
            return prodDel
        } catch (error) {
            throw new Error(error)
        }
    }

}

module.exports = CarritoDAO