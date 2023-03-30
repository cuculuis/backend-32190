const mongoose = require('mongoose');
const { productosModel } = require('../Modules/modules');

class ProductosDAO {
    
    ID_FIELD = "_id";
    
        async getAll() {
            try {
                let data = await productosModel.find();
                return JSON.parse(data);
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }

        async save(object) {
            try {
                return await productosModel.save(object);
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }

        async getById(id) {
            try {
                await productosModel.findById(parseInt(id))
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }
    
        async deleteById(id) {
            try {
                return await productosModel.findByIdAndDelete({[this.ID_FIELD] : id})
            } catch (err) {
                console.log(err);
            }
        }

        async updateById(id, nuevoProducto) {
            try {
                await productosModel.findByIdAndUpdate(
                    {
                        [this.ID_FIELD] : id,
                    }, 
                    nuevoProducto,
                    { runValidators: true }
                )
                return nuevoProducto
                } catch (error) {
                throw new Error(`Error al actualizar el producto: ${error}`);
                }
        }
    }

    module.exports = ProductosDAO;