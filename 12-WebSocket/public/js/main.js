const socket = io()

const divProducts = document.getElementById("productsMain");
const tableProducts = document.getElementById("bodyProducts");

function updateProducts(table, productsArray) {
    document.getElementById("bodyProducts").innerHTML = "";
    productsArray.forEach((element) => {
        let row = table.insertRow();
        row.insertCell().innerHTML = element.title;
        row.insertCell().innerHTML = element.price;
        row.insertCell().innerHTML = `<img src="${element.thumbnail}" alt="${element.title}" width="60px">`;
    });
}

function updateMessages(messagesArray) {
    const html = messagesArray.map(message => {
        return `<div class="alert alert-primary">
            <span style="color: blue">${message.email}</span><span style="color: brown"> [${message.dateAndTime}] </span><span style="color: green">${message.message}</span>
        </div>`
        }).join(" ")
        document.getElementById("messagesMain").innerHTML = html;
}

function addProduct() {
        const product = {
            title: document.getElementById("title").value,
            price: document.getElementById("price").value,
            thumbnail: document.getElementById("thumbnail").value,
    }


    socket.emit("newProduct", product);
    return;
    }

function sendMessage() {
        const message = {
            email: document.getElementById("email").value,
            dateAndTime: new Date(Date.now()).toLocaleString(),
            message: document.getElementById("message").value
        }

        socket.emit("newMessage", message);
            return;
        }

socket.on("productos", (data) => {
    data.length > 0
    ? updateProducts(tableProducts, data)
    : (document.getElementById("productsMain").innerHTML = `<h3 class="container alert alert-danger">NO HAY PRODUCTOS</h3>`);
});

socket.on("messages", data => {
    data.length > 0 
    ? updateMessages(data)
    : (document.getElementById("messagesMain").innerHTML = `<h3 class="container alert alert-danger">NO HAY MENSAJES</h3>`);
})