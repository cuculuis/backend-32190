const fs = require('fs');

class Contenedor {
    productArray = new Array();
    typeId;


    constructor(fileName) {
        this.fileName = fileName;

        if (fs.existsSync(fileName)) {
            this.productArray = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
            this.typeId = this.#detId();
            console.log("Archivo Existente");
        } else {
            this.typeId = 0;
            fs.writeFileSync(this.fileName, JSON.stringify(this.productArray));    
            console.log("Archivo NO existente");
        }
    }

    #detId() {
        if (this.productArray.length > 0) {
            let riseId = this.productArray.reduce((acc, item) => {
                return Math.max(acc, item.id)
            }, 0)
            return riseId + 1;
        } else {
            return 0;
        }
    }

    async save(Object) {
        try {
            if (!this.#thisIs(Object)) {
                Object["id"] = this.typeId + 1;
                this.typeId++;
                this.productArray.push(Object);
                await fs.promises.writeFile(this.fileName, JSON.stringify(this.productArray));
                console.log("Se ha guardado el desayuno: " + Object.id + ".");
                return Promise.resolve(Object.id);
            }
            else {
                console.log("Se han guardado los cambios");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    #thisIs(obje) {
        let resp = false;
        this.productArray.filter(component => {
            if (component.title == obje.title && component.price == obje.price && component.img == obje.img) {
                resp = true;
            }
        });
        return resp;
    }

    getById(id) {
        return this.productArray.find(p => p.id == id) || null
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.fileName, "utf-8");
            this.productArray = JSON.parse(data);
            console.log(this.productArray);

        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {

        this.productArray = this.productArray.filter(p => p.id !== id)

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.productArray))
            return { id }
        }
        catch (error) {
            console.log(error);
        }

    }

    async deleteAll() {
        this.productArray = [];
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.productArray))
            console.log("Todo borrado");
        }
        catch (error) {
            console.log(error);
        }
    }
}




let desayuno = { title: "Desayuno Caja de Madera", price: 20, img: "./producto1.jpg" };
let desayuno2 = { title: "Desayuno Romántico", price: 10, img: "./producto2.jpg" };
let desayuno3 = { title: "Desayuno Cumpleaños", price: 4.000, img: "./producto3.jpg" };
let desayuno4 = { title: "Desayuno Cumpleaños", price: 4.000, img: "./producto3.jpg" };



const desayunosCordoba = new Contenedor("./productos.txt");
action = () => {

    desayunosCordoba.getAll()
        .then(() => desayunosCordoba.save(desayuno))
        .then(() => desayunosCordoba.save(desayuno2))
        .then(() => desayunosCordoba.save(desayuno3))
        .then(() => desayunosCordoba.save(desayuno4))
        .then(() => {
            console.log(desayunosCordoba.getById(8));
        })
}

action();