import { useState } from "react";
import styles from "./Home.module.css";
import { CharacterCard } from "../../Components/CharacterCard/CharacterCard";
import Titulo from "../../Components/Titulo/Titulo";

const Home = () => {
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
  // ordenSeleccionado guarda como lo queres ordenar (añoAsc, añoDesc, ratingAsc, ratingDesc)
    const [busqueda, setBusqueda] = useState("");
    const [generoSeleccionado, setGeneroSeleccionado] = useState("todos");
    const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");
    const [ordenSeleccionado, setOrdenSeleccionado] = useState("ninguno");

  // FUNCIÓN PARA CAMBIAR ENTRE VISTA Y NO VISTA:
  // Recibe el id de una película, recorre el array con map
  // y cuando encuentra la correcta, invierte su valor de "visto".
    const cambiarEstadoVisto = (id) => {
        const peliculasActualizadas = peliculas.map((pelicula) => {
        if (pelicula.id === id) {
            return { ...pelicula, visto: !pelicula.visto };
    }

        return pelicula;
    });

    setPeliculas(peliculasActualizadas);
};

  // FILTRO GENERAL:
  // Primero revisa si coincide con la búsqueda.
  // Después revisa si coincide con el género elegido.
  // Después revisa si coincide con el tipo elegido.
  // Solo entra en el array final si cumple todo.
    const peliculasFiltradas = peliculas.filter((pelicula) => {
        const textoBuscado = busqueda.toLowerCase();

        const coincideBusqueda =
            pelicula.titulo.toLowerCase().includes(textoBuscado) ||
            pelicula.director.toLowerCase().includes(textoBuscado);

    const coincideGenero =
        generoSeleccionado === "todos" ||
        pelicula.genero === generoSeleccionado;

    const coincideTipo =
        tipoSeleccionado === "todos" ||
        pelicula.tipo === tipoSeleccionado;

    return coincideBusqueda && coincideGenero && coincideTipo;
    });

        // ORDENAMIENTO:
    // Primero hacemos una copia de peliculasFiltradas con [...peliculasFiltradas]
    // porque sort() modifica el array original y no queremos cambiar directamente
    // la lista filtrada.
    //
    // Después usamos sort(), que ordena el array comparando de a dos elementos
    // por vez. En cada comparación, "a" y "b" representan dos películas del array.
    // La función comparadora no ordena todo sola, sino que le devuelve a sort()
    // un número para indicarle cuál de las dos debe ir primero.
    //
    // - Si el resultado es negativo, "a" va antes que "b".
    // - Si el resultado es positivo, "b" va antes que "a".
    // - Si el resultado es 0, sort() las deja como están.
    //
    // Por eso:
    // - a.anio - b.anio ordena de menor a mayor (ascendente).
    // - b.anio - a.anio ordena de mayor a menor (descendente).
    // - a.rating - b.rating ordena rating de menor a mayor.
    // - b.rating - a.rating ordena rating de mayor a menor.
    //
    // Finalmente, sort() devuelve un nuevo array ya ordenado, que guardamos
    // en peliculasOrdenadas para después separar entre vistas y no vistas.

    const peliculasOrdenadas = [...peliculasFiltradas].sort((a, b) =>{
        if (ordenSeleccionado ==="anioAsc") {
            return a.anio - b.anio; 
        }
        if (ordenSeleccionado ==="anioDesc") {
            return b.anio - a.anio; 
        }
        if (ordenSeleccionado ==="ratingAsc") {
            return a.rating - b.rating; 
        }
        if (ordenSeleccionado ==="ratingDesc") {
            return b.rating - a.rating; 
        }

        return 0;
    });

  // SEPARAMOS EN DOS LISTAS:
  // De las películas ya ordenadas, armamos una lista de vistas. 
  // y otra lista de no vistas.
  // Esto es asi porque peliculas ordenadas ya incluye todo lo de peliculas filtradas pero ademas ordenado.
    const peliculasVistas = peliculasOrdenadas.filter(
        (pelicula) => pelicula.visto === true
    );

    const peliculasNoVistas = peliculasOrdenadas.filter(
        (pelicula) => pelicula.visto === false
    );
    // className le da el estilo
    // value muestra el valor actual
    // onChange guarda la opcion elegida 
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

            <li>
                
                <select
                    className={styles.select}
                    value={ordenSeleccionado}
                    onChange={(e) => setOrdenSeleccionado(e.target.value)}>
                    
                    <option value="ninguno">Sin orden</option>
                    <option value="anioAsc">Año ascendente</option>
                    <option value="anioDesc">Año descendente</option>
                    <option value="ratingAsc">Rating ascendente</option>
                    <option value="ratingDesc">Rating descendente</option>
                </select>
            </li>
        </ul>
        </nav>

        <section className={styles.seccionLista}>
        <h2>Películas / series por ver</h2>
        <p>Total: {peliculasNoVistas.length}</p>

        {peliculasNoVistas.length === 0 ? (
            <p>No hay contenidos por ver.</p>
        ) : (
            peliculasNoVistas.map((pelicula) => (
            <div key={pelicula.id} className={styles.itemPelicula}>
                <CharacterCard character={pelicula} />

            <button
                className={styles.boton}
                onClick={() => cambiarEstadoVisto(pelicula.id)}>

                Marcar como vista
            </button>
            </div>
        ))
        )}
        </section>

        <section className={styles.seccionLista}>
        <h2>Películas / series vistas</h2>
        <p>Total: {peliculasVistas.length}</p>

        {peliculasVistas.length === 0 ? (
            <p>No hay contenidos vistos.</p>
        ) : (
            peliculasVistas.map((pelicula) => (
            <div key={pelicula.id} className={styles.itemPelicula}>
                <CharacterCard character={pelicula} />

                <button
                className={styles.boton}
                onClick={() => cambiarEstadoVisto(pelicula.id)}>

                Marcar como no vista
                </button>
            </div>
        ))
        )}
        </section>
    </div>
);
};

export default Home;