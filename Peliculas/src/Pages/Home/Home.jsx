import { useState } from "react";
import styles from "./Home.module.css";
import { CharacterCard } from "../../Components/CharacterCard/CharacterCard";
import Titulo from "../../Components/Titulo/Titulo";
import { Filtrado } from "../../Components/Filtros/Filtros";

export const Home = () => {

  // ESTADO PRINCIPAL:
  // Acá guardamos todas las películas y series.
  // Como están dentro de useState, React puede volver a renderizar
  // la pantalla cada vez que cambiemos algo.
    const [peliculas, setPeliculas] = useState([
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
    ]);

  // ESTADOS DE LOS FILTROS:
  // busqueda guarda lo que escribe el usuario en el input.
  // generoSeleccionado guarda el género elegido.
  // tipoSeleccionado guarda si quiere ver todo, películas o series.
    const [busqueda, setBusqueda] = useState("");
    const [generoSeleccionado, setGeneroSeleccionado] = useState("todos");
    const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");

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