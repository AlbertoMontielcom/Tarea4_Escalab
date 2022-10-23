import { productos } from "./data.js"

let elMostrarBtn = document.getElementById('mostrarNativosBtn')
var elHide = document.querySelector('.paginacion');
const isOk = true

const customFetch = (time, task)  => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isOk) {
                resolve(task)
            } else {
                reject("Error")
            }
        }, time)
    })
}

const mostrarProductos = () => {
    customFetch(2000, productos).then(
        data => {


     //       let lista = document.createElement("ul")
            let peliculas = ''
            for (let i=0; i<data.length; i++) {
                peliculas += `<div class="pelicula">
                <img class="poster" src="${data[i].image}">
                <h3 class="titulo">${data[i].title}</h3>
                <h3 class="label_title">Precio: ${data[i].price} CLP</h3>
                <h3 class="label_title">Stock: ${data[i].stock}</h3>
                 </div>`
            }
            document.getElementById("contenedor").innerHTML = ""
            document.getElementById("root").innerHTML = peliculas
            elHide.style.display = 'none';

        }
    )
}

elMostrarBtn.addEventListener('click', mostrarProductos)
