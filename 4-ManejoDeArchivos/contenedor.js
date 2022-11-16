const fs = require('fs')

class Contenedor {

    constructor(filename) {
        this.filename = filename
        
        this.products = []
        this.nextID = 1
    }

    async init() {
        try {
            const data = await this.readFile()
            if (data.length > 0) {
                this.products = data
                this.nextID = this.products[data.length-1].id + 1
                console.log('Data loaded from file')
            }
        } catch(e) {
            console.log('No se pudo leer la data')
        }
    }

    async save(obj) {
        obj.id = this.nextID
        this.products.push(obj)
        this.nextID++

        try{
            await this.saveFile()
        } catch(e) {
            console.log(e)
        }
    }

    getAll() {
        return this.products
    }

    saveFile() {
        return fs.promises.writeFile(this.filename, JSON.stringify(this.products, null, 2))
    }

    getById(id) {
        const data = this.products.find(p => p.id == id)
        
        return data ? data : null
    }

    async deleteById(id) {
        const idx = this.products.findIndex(p => p.id == id)
        this.products.splice(idx, 1)

        try{
            await this.saveFile()
        } catch(e) {
            console.log(e)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.filename, [])
            console.log("Borrado!")
        } catch (error) {
            console.log('No se han podido borrar todos los objetos.');
        }
    }

    readFile() {
        return fs.promises.readFile(this.filename, 'utf-8')
            .then(data => JSON.parse(data))
            .catch(e => (console.log(e)))
    }

}

const pancito = new Contenedor('productos.txt')

async function mostrarDesafio(){
    pancito.save({title: 'Pan de maiz', price: 50, thumbnail: '/img/img1.png'});
    pancito.save({title: 'Pan de coco', price: 20, thumbnail: '/img/img2.png'});
    pancito.save({title: 'Pan de jamón', price: 100, thumbnail: '/img/img3.png'});
    let productos = await pancito.getAll();
    console.log(productos);
    const producto = await pancito.getById(2);
    console.log(producto);
    const borrado = await pancito.deleteById(1)
    
}

mostrarDesafio();