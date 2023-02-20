const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.id = 1;
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