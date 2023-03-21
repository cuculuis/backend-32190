const knex = require('knex');

class ContainerChat {

    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        this.knex.schema.dropTableIfExists('chat')
            .then(() => {
                return this.knex.schema.createTable('chat', table => {
                    table.string('message', 20).notNullable()
                    table.string('email').notNullable()
                    table.string("dateAndTime").notNullable()      
                })
            .catch((err) => {
                console.log(err)
            })
        })
}

    insertarArticulos(articulos) {
        return this.knex('chat').insert(articulos)
    }

    listarArticulos() {
        return this.knex('chat').select('*')
    }

    borrarArticulos(id) {
        return this.knex.from('chat').where('id', '=', id).del()
    }

    actualizarStock(obj, id) {
        return this.knex.from("chat").where('id', '=', id).update({obj})
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = ContainerChat