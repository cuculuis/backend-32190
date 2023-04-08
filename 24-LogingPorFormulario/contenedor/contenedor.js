const mongoose = require('mongoose');
const chatModel = require('../models/chatModel');


class Container {
    
    async AgregaralChat(nuevoMensaje) {
        try {
            const mensaje = new chatModel(nuevoMensaje);
            const mensajeAgregado = await mensaje.save();

            console.log('Nuevo mensaje agregado al chat:', mensajeAgregado);

            return mensajeAgregado
        } catch (error) {
            console.error('Error al agregar mensaje al chat:', error);
        }
    }
    
    async MostrarChat() {
        try {
            const mensajes = await chatModel.find({}, {_id:0, __v:0});
            console.log('Mensajes del chat:', mensajes);
            return mensajes;
        } catch (error) {
            console.error('Error al mostrar mensajes del chat:', error);
        }
    }
}

module.exports = Container;
