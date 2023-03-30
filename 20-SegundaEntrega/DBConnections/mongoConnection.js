const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://Cuculuis:Mango123@clustmysticshop.5ivclcv.mongodb.net/ClustMysticShop?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos', error);
    });