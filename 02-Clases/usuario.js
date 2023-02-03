class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }

    getFullName() {
        return `Tu nombre completo es ${this.nombre} ${this.apellido}`
    }

    addMascota(string) {
        return this.mascotas.push(string)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(titulo, autor) {
        return this.libros.push({title: titulo, author: autor})
    }

    getBookNames() {
        return this.libros.map(libro => libro.title)
    }
}

let luis = new Usuario(
    "Luis", 
    "Lopez", 
    [
        {title: "Las matemáticas", author: "Einstein"}, 
        {title: "La evolución", author: "Charles Darwing"}
    ],
    [
        "Pumba", 
        "pomcho", 
        "Galleta"
    ]
    )



console.log(luis.addBook("La gravedad como empezó", "Isaac Newton"))
console.log(luis.addMascota("Gary"))
console.log("Las mascotas son: " + luis.mascotas)
console.log(luis.getFullName())
console.log(luis.getBookNames())
console.log("Numero de mascotas: " + luis.countMascotas())
