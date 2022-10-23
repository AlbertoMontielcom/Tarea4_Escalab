let precio = ""
let pagina = 0
let stock = ""
let currency = ""
// const btnAnterior = document.getElementById('btnAnterior')
// const btnSiguiente = document.getElementById('btnSiguiente')

let elMostrarPruebaBtn = document.getElementById('mostrarPruebaBtn')



btnSiguiente.addEventListener('click', () => {
    pagina += 50
    cargarPeliculas1()
})

btnAnterior.addEventListener('click', () => {
    if (pagina > 0) {
        pagina -= 50
        cargarPeliculas1()
    }
})

const cargarPeliculas1 = async () => {
    try {
        const respuesta = await axios.get('https://api.mercadolibre.com/sites/MLC/search?q=Vino tinto&', {
            params: {
//                api_key: '2f5b3a342aed4557fb3f23d801d2a7b6',
  //              language: 'es-CL',
                offset: pagina,
                price: precio,
                available_quantity: stock,
                currency_id: currency
            }
         //    ,
         //      headers: {
         //      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTFhNDc0YTJmZDg3OTQxYTg5MzZjNTVjM2NkMzhkNyIsInN1YiI6IjYzNGZiYTNiMzU4MThmMDA3OTkxZTMzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2is3YHv2rcrDkYzoSdvxodp_Q8FnnL9WdDONVy7o5s'
         //    }
        })

        //console.log(respuesta)

        if (respuesta.status === 200) {
            const datos = await respuesta.data
           
            document.getElementById("root").innerHTML = ""
            console.log(datos)
           
            let peliculas = ''
            datos.results.forEach(pelicula => {
                peliculas += `<div class="pelicula">
                <img class="poster" src="${pelicula.thumbnail}">
                <h3 class="titulo">${pelicula.title}</h3>
               <h3 class="label_title">Precio: ${pelicula.price}${pelicula.currency_id}</h3>
               <h3 class="label_title">Stock: ${pelicula.available_quantity}</h3>

                </div>`
            })
            document.getElementById('contenedor').innerHTML = peliculas
            //console.log(peliculas)
            var elHide = document.querySelector('.paginacion')
            elHide.style.display = 'flex';
        } else if (respuesta.status === 401) {
            console.log('You don\'t have access to this resource')
        } else if (respuesta.status === 404) {
            console.log('The película que solicitaste no pudo ser encontrada')
        } else {
            console.log('Algo malo ocurrió...')
        }
    }
    catch (err) {
        console.log('Error => ' , err)
    }
}


elMostrarPruebaBtn.addEventListener('click', cargarPeliculas1)



// cargarPeliculas()