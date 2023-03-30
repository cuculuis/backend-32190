const mongoose = require('mongoose');
const productosModel = require('../Modules/modules');

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
                const nuevoProducto = new productosModel(object)
                await nuevoProducto.save();
                return nuevoProducto
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }

        async getById(id) {
            try {
                await productosModel.findOne({ [this.ID_FIELD] : parseInt(id)})
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }
    
        async deleteById(id) {
            try {
                return await productosModel.deleteOne({[this.ID_FIELD] : parseInt(id)})
            } catch (err) {
                console.log(err);
            }
        }

        async updateById(id, nuevoProducto) {
            try {
                await productosModel.updateOne(
                    {
                        [this.ID_FIELD] : id,
                    }, 
                    { $set: nuevoProducto }
                )
                return this.ID_FIELD
                } catch (error) {
                throw new Error(`Error al actualizar el producto: ${error}`);
                }
        }
    }

    module.exports = ProductosDAO;