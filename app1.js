let pagina = 0
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

let elMostrarBtn = document.getElementById('mostrarMercadoLibreBtn')


btnSiguiente.addEventListener('click', () => {
    pagina += 1
    cargarPeliculas()
})

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1
        cargarPeliculas()
    }
})

const cargarPeliculas = async () => {
    try {
        const respuesta = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: '2f5b3a342aed4557fb3f23d801d2a7b6',
                language: 'es-CL',
                page: pagina
            }
         //    ,
         //      headers: {
         //      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTFhNDc0YTJmZDg3OTQxYTg5MzZjNTVjM2NkMzhkNyIsInN1YiI6IjYzNGZiYTNiMzU4MThmMDA3OTkxZTMzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2is3YHv2rcrDkYzoSdvxodp_Q8FnnL9WdDONVy7o5s'
         //    }
        })

        if (respuesta.status === 200) {
            const datos = await respuesta.data

            console.log(datos)
            
            let peliculas = ''
            datos.results.forEach(pelicula => {
                peliculas += `<div class="pelicula">
                <img class="poster" src="http://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.title}</h3>
                </div>`
            })
            document.getElementById('contenedor').innerHTML = peliculas

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


elMostrarBtn.addEventListener('click', cargarPeliculas)


// cargarPeliculas()