// useEffect lo usamos para ejecutar código automático cuando cambia un estado.
// En este caso, lo necesitamos para guardar las películas en localStorage
// cada vez que el array "peliculas" se actualiza.
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { CharacterCard } from "../../Components/CharacterCard/CharacterCard";
import Titulo from "../../Components/Titulo/Titulo";
import { Filtrado } from "../../Components/Filtros/Filtros";
import FormularioContenido from "../../Components/FormularioContenido/FormularioContenido";

// Estas son las películas iniciales por defecto.
// Se usan solamente si todavía no hay nada guardado en localStorage.
// O sea: la primera vez que abrimos la app, carga esta lista base.
const peliculasIniciales = [
    {
        id: 1,
        titulo: "Inception",
        director: "Christopher Nolan",
        anio: 2010,
        genero: "Ciencia ficción",
        rating: 8.8,
        tipo: "pelicula",
        visto: false,
    },
    {
        id: 2,
        titulo: "Breaking Bad",
        director: "Vince Gilligan",
        anio: 2010,
        genero: "Drama",
        rating: 9.5,
        tipo: "serie",
        visto: true,
    },
    {
        id: 3,
        titulo: "The Matrix",
        director: "Lana Wachowski / Lilly Wachowski",
        anio: 1999,
        genero: "Acción",
        rating: 8.7,
        tipo: "pelicula",
        visto: false,
    },
    {
        id: 4,
        titulo: "Stranger Things",
        director: "Hermanos Duffer",
        anio: 2016,
        genero: "Ciencia ficción",
        rating: 8.7,
        tipo: "serie",
        visto: true,
    },
    {
        id: 5,
        titulo: "Interstellar",
        director: "Christopher Nolan",
        anio: 2014,
        genero: "Ciencia ficción",
        rating: 8.6,
        tipo: "pelicula",
        visto: false,
    },
    {
        id: 6,
        titulo: "Game of Thrones",
        director: "David Benioff / D. B. Weiss",
        anio: 2011,
        genero: "Fantasía",
        rating: 9.2,
        tipo: "serie",
        visto: true,
    },
    {
        id: 7,
        titulo: "Parasite",
        director: "Bong Joon-ho",
        anio: 2019,
        genero: "Drama",
        rating: 8.5,
        tipo: "pelicula",
        visto: false,
    },
    {
        id: 8,
        titulo: "The Office",
        director: "Greg Daniels",
        anio: 2005,
        genero: "Comedia",
        rating: 8.9,
        tipo: "serie",
        visto: true,
    },
    {
        id: 9,
        titulo: "Avengers: Endgame",
        director: "Anthony Russo / Joe Russo",
        anio: 2019,
        genero: "Acción",
        rating: 8.4,
        tipo: "pelicula",
        visto: false,
    },
];

export const Home = () => {

 // ESTADO PRINCIPAL CON LOCALSTORAGE:
// Cuando la app arranca, primero intentamos leer si ya hay películas guardadas
// en localStorage bajo la clave "peliculas".
// - Si encontramos datos guardados, usamos esos.
// - Si no hay nada guardado, usamos "peliculasIniciales".
    const [peliculas, setPeliculas] = useState(() => {
    const peliculasGuardadas = localStorage.getItem("peliculas");

    if (peliculasGuardadas) {
        // localStorage guarda texto.
         // JSON.parse convierte ese texto nuevamente en un array de objetos.
        return JSON.parse(peliculasGuardadas);
    }

    return peliculasIniciales;
});

  // ESTADOS DE LOS FILTROS:
  // busqueda guarda lo que escribe el usuario en el input.
  // generoSeleccionado guarda el género elegido.
  // tipoSeleccionado guarda si quiere ver todo, películas o series.
    const [busqueda, setBusqueda] = useState("");
    const [generoSeleccionado, setGeneroSeleccionado] = useState("todos");
    const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

// FUNCIÓN PARA AGREGAR UNA NUEVA PELÍCULA O SERIE:
// Recibe el objeto nuevo desde el formulario y lo agrega al array "peliculas".
// Después cerramos el formulario.
// Como cambia el estado "peliculas", automáticamente el useEffect
// vuelve a guardar todo en localStorage.
     const agregarContenido = (nuevoContenido) => {
    setPeliculas([...peliculas, nuevoContenido]);
    setMostrarFormulario(false);
};
    // SINCRONIZACIÓN CON LOCALSTORAGE:
    // Cada vez que cambia el estado "peliculas", guardamos el array actualizado
    // en localStorage para que no se pierda al refrescar la página.
    // JSON.stringify transforma el array en texto, que es el formato que
    // localStorage puede almacenar.
    useEffect(() => {
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
    }, [peliculas]);
    useEffect(() => {
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
    }, [peliculas]);

  // FUNCIÓN PARA CAMBIAR ENTRE VISTA Y NO VISTA:
  // Recibe el id de una película, recorre el array con map
  // y cuando encuentra la correcta, invierte su valor de "visto".
  // FILTRO GENERAL:
  // Primero revisa si coincide con la búsqueda.
  // Después revisa si coincide con el género elegido.
  // Después revisa si coincide con el tipo elegido.
  // Solo entra en el array final si cumple todo.
  // SEPARAMOS EN DOS LISTAS:
  // De las películas ya filtradas, armamos una lista de vistas
  // y otra lista de no vistas.

    return (
        <div className={styles.homeContainer}>
            <Titulo texto="Gestor de películas y series" />

            {mostrarFormulario && (
                <FormularioContenido onAgregarContenido={agregarContenido} />
                )}
            <nav className={styles.barraFiltros}></nav>

            <nav className={styles.barraFiltros}>
            <ul className={styles.listaFiltros}>
                <li>
                <input
                    type="text"
                    value={busqueda}
                    className={styles.busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por titulo o director"
                />
                </li>

                <li>
                <select
                    className={styles.select}
                    value={generoSeleccionado}
                    onChange={(e) => setGeneroSeleccionado(e.target.value)}>

                    <option value="todos">Todos los géneros</option>
                    <option value="Ciencia ficción">Ciencia ficción</option>
                    <option value="Drama">Drama</option>
                    <option value="Acción">Acción</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Comedia">Comedia</option>
                </select>
                </li>

                <li>
                <select
                    className={styles.select}
                    value={tipoSeleccionado}
                    onChange={(e) => setTipoSeleccionado(e.target.value)}
                >
                    <option value="todos">Todos los tipos</option>
                    <option value="pelicula">Película</option>
                    <option value="serie">Serie</option>
                </select>
                </li>
                
                <li>
                <button
                    className={styles.botonAgregar}
                    onClick={() => setMostrarFormulario(true)}
                >
                    Agregar película
                </button>
               </li>
            </ul>
            </nav>
            <Filtrado 
                peliculas={peliculas} 
                busqueda={busqueda} 
                generoSeleccionado={generoSeleccionado} 
                tipoSeleccionado={tipoSeleccionado} 
                setPeliculas={setPeliculas}
            />
        </div>
    );
    
};

export default Home;