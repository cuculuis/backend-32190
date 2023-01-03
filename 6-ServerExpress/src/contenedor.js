const fs = require('fs');

class Contenedor {
    constructor(filename) {
        this.filename = filename;
        this.nextId = 1;
    }

    async save(object) {
        try {
            let data = await fs.promises.readFile(this.filename, 'utf8');

            if (!data) {
                data = {};
            } else {
                data = JSON.parse(data);
            }
    
            object.id = this.nextId++;
            data[object.id] = object;
            
            await fs.promises.writeFile(this.filename, JSON.stringify(data, null, 2));
    
            return object.id;

            } catch (e) {
                console.log("Hubo el siguiente error: " + e);
            }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.filename, 'utf8');
    
            if (!data) {
                return null;
            }
    
            data = JSON.parse(data);
    
            return data[id] || null;
            
        } catch (e) {
            console.log("Hubo el siguiente error: " + e);
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.filename, 'utf8');
    
            if (!data) {
                return [];
            }
            return Object.values(JSON.parse(data));
            
        } catch (e) {
            console.log("Hubo el siguiente error: " + e);
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(this.filename, 'utf8');
            
            if (!data) {
                return;
            }
    
            data = JSON.parse(data);
            
            delete data[id];
    
            await fs.promises.writeFile(this.filename, JSON.stringify(data, null, 2));

        } catch (e) {
            console.log("Hubo el siguiente error: " + e);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.filename, '');
            console.log("¡Borrado!");
            } catch (e) {
                console.log("Hubo el siguiente error: " + e);
            }
        }

}

module.exports = Contenedor;