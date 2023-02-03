const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.lastId = 1;
        this.checkFileExists()
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

        async getAll() {
            await this.checkFileExists()    
            try {
                let data = await fs.promises.readFile(this.fileName, 'utf-8');
                return JSON.parse(data);
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }
    
        async deleteAll() {
            await this.checkFileExists()
            try {
                await fs.promises.writeFile(this.fileName, '[]');
                this.lastId = 1;
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        }
    }


const mercado = new Contenedor('./productos.txt');


const obj1 = { nombre: 'Pan', precio: 30, thumbnail: '/img/img1.png' };
const obj2 = { nombre: 'Leche', precio: 25, thumbnail: '/img/img2.png' };
const obj3 = { nombre: 'Manteca', precio: 35, thumbnail: '/img/img3.png' };

async function test() {
    
    console.log("Prueba de save");
    console.log(await mercado.save(obj1));  
    console.log(await mercado.save(obj2));  
    console.log(await mercado.save(obj3));  
    
    console.log("-----------------------------------------------------");
    
    console.log("Prueba getById");
    console.log(await mercado.getById(2));  
    console.log(await mercado.getById(1));  
    console.log(await mercado.getById(3));  
    console.log(await mercado.getById(4));  
    
    console.log("-----------------------------------------------------");
    
    console.log("Prueba de getAll");
    console.log(await mercado.getAll());
    
    console.log("-----------------------------------------------------");
    
    console.log("Prueba de deleteById");
    console.log(await mercado.deleteById(2));
    console.log(await mercado.getAll());
    
    console.log("-----------------------------------------------------");
    
    console.log("Prueba de deleteAll");
    await mercado.deleteAll();
    console.log(await mercado.getAll());
    
    console.log("-----------------------------------------------------");
}

test();
