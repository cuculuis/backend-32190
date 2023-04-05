const socket = io()

const autor = new normalizr.schema.Entity('autor',{},{idAttribute: "email"})
const messageSchema = new normalizr.schema.Entity('mensaje', {
    autores: autor
})
const messagesSchema = new normalizr.schema.Entity("messages", {
    messages: [messageSchema]
});
socket.on("menssages",data=>{
    const dataDesnor = normalizr.denormalize(data.result, messagesSchema, data.entities)    
    console.log(dataDesnor)
    const html = dataDesnor.messages.map(msj => {
        return `<div class="alert alert-info">
        <strong style="color: blue">${msj.autor.email}</strong>
        <strong style="color: brown">${msj.fecha}</strong>
        <em style="color: black">${msj.text}</em>
        </div>`
    })
    .join(" ")

    document.getElementById("messagesDeUsers").innerHTML = html
    console.log()
    })

    socket.on('compres', data => {
        const html = `<strong>${"Porcentaje de compresion: " +data}</strong>`
        document.getElementById("compresion").innerHTML = html
    })
    

function addMsj() {
    
    const message = {
        autor:{
            email: document.getElementById("correo").value,
        },
        text: document.getElementById("contenido").value,
    }
    
    socket.emit('new-message', message)
}