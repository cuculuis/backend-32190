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


const mercado = new Contenedor('productos.txt');


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
    await mercado.deleteById(2);
    console.log(await mercado.getAll());
    
    console.log("-----------------------------------------------------");
    
    console.log("Prueba de deleteAll");
    await mercado.deleteAll();
    console.log(await mercado.getAll());
    
    console.log("-----------------------------------------------------");
}

test();
