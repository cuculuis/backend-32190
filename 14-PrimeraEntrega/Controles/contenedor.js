const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.lastId = this.lastId;
        this.checkFileExists();
    }
    
    async checkFileExists() {
        try {
        await fs.promises.access(this.fileName);
        } catch (err) {
            await fs.promises.writeFile(this.fileName, "[]")
            console.log(`El archivo ${this.fileName} no existe`);
        }
    }

        async save(object) {
            await this.checkFileExists()
            try {
                let data = await this.getAll();
                object.id = this.lastId;
                data.push(object);
                this.lastId++;
                await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
                return object.id;
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }

        async getById(id) {
            await this.checkFileExists()
            try {
                let data = await this.getAll();
                let object = data.find((item) => item.id === id);
                if (object) {
                    return object;
                } else {
                    return null;
                }
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }
    
        async deleteById(id) {
            await this.checkFileExists()
            try {
                let data = await this.getAll()
                let newData = data.filter((item) => item.id !== id)
                await fs.promises.writeFile(this.fileName, JSON.stringify(newData))
            } catch (err) {
                console.log(err);
            }
        }

        async updateById(id, nuevoProducto) {
            await this.checkFileExists()
            try {
                let data = await this.getAll();
                const index = data.findIndex((producto) => producto.id === id);
            
                if (index === -1) throw new Error('Producto no encontrado');
            
                data = productos[index] = { id, timestamp: Date.now(), ...nuevoProducto };
            
                this.save(data)
            
                return nuevoProducto;
                } catch (error) {
                throw new Error(`Error al actualizar el producto: ${error}`);
                }
            }


        async getAll() {
            await this.checkFileExists()    
            try {
                let data = await fs.promises.readFile(this.fileName, 'utf-8');
                return JSON.parse(data);
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }
    }

    module.exports = Contenedor;