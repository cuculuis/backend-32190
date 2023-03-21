const knex = require('knex');

class PrdContainer {

    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        return this.knex.schema.dropTableIfExists('productos')
            .then(() => {
                return this.knex.schema.createTable('productos', table => {
                    table.increments('id').primary()
                    table.string('title', 20).notNullable()
                    table.float('price').notNullable()
                    table.string('thumbnail', 30).notNullable()
                })
            })
            .catch((err) => {console.log(err);})
        }


    insertarArticulos(articulos) {
        return this.knex('productos').insert(articulos)
    }

    listarArticulos() {
        return this.knex('productos').select('*')
    }

    borrarArticulos(id) {
        return this.knex.from('productos').where('id', '=', id).del()
    }

    actualizarStock(obj, id) {
        return this.knex.from("productos").where('id', '=', id).update({obj})
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = PrdContainer