const mongoose = require('mongoose');
const productosModel = require('../Modules/modules');


class ProductosDAO {

    ID_FIELD = "_id";

        async getAll() {
            try {
                const productos = await productosModel.find();
                console.log(`Se encontraron ${productos.length} productos`);
                return productos

                } catch (error) {
                    console.error('Error al obtener productos', error);
            }
        }
        

        async save(object) {
            try {
                const nuevoProducto = new productosModel(object)
                    
                return await nuevoProducto.save()
            } catch(error) {
                console.log('Error al crear el producto. ' + err)
            }
        }

        async getById(id) {
            try {
                const productoid = await productosModel.findOne({
                    [this.ID_FIELD] : id
                })
                return productoid;
            } catch (error) {
                console.error(`Error al obtener producto con id ${id}`, error);
            }
        }
    
        async deleteById(id) {
            try {
                await productosModel.findByIdAndDelete({[this.ID_FIELD] : id})
                return `Producto con id: ${id} eliminado exitosamente`
            } catch (err) {
                console.log('Hubo un error: ' + err)
            }
        }

        async updateById(id, nuevoProducto) {
            try {
                await productosModel.findByIdAndUpdate({[this.ID_FIELD] : id}, nuevoProducto)
                return `Producto con id ${id} actualizado exitosamente`
            } catch(err) {
                console.log(`Error al actualizar el producto: ${err}`)
            }
        }
    }

    module.exports = ProductosDAO;