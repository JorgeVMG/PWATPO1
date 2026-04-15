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

    // Mostrar formulario aparece en false y cuando algreguemos el boton de agregar form se pondra en true 
    // Modo edicion empieza en false y despues tocas editar en una peli, y lo cambias a true. 
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [formulario, setFormulario] = useState({
    id: null,
    titulo: "",
    director: "",
    anio: "",
    genero: "",
    rating: "",
    tipo: "",
    visto: false
});

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

// MANEJO DE CAMBIOS DEL FORMULARIO:
// Esta función sirve para actualizar cualquier campo del formulario con un solo onChange.
// React recibe el evento "e" cada vez que el usuario escribe en un input o cambia un select.
// De e.target sacamos:
// - name: el nombre del campo que cambió (por ejemplo "titulo" o "director")
// - value: el nuevo valor que el usuario ingresó o seleccionó
//
// Después usamos setFormulario para crear un nuevo objeto:
// - ...formulario copia todos los valores actuales del formulario
// - [name]: value actualiza solo la propiedad que corresponde
//
// Así, con una sola función podemos manejar todos los campos del formulario
// sin tener que crear un onChange distinto para cada input o select.
const manejarCambioFormulario = (e) => {
    const name = e.target.name;
    const value = e.target.value; 

    setFormulario({
        ...formulario,
        [name]: value
    });
};

// RESETEO DEL FORMULARIO:
// Esta función devuelve el formulario a su estado inicial.
// Se usa después de agregar o editar un contenido, o también si el usuario cancela.
// setFormulario reemplaza todo el objeto por uno nuevo con los valores vacíos o iniciales.
// Además, setModoEdicion(false) asegura que la aplicación salga del modo edición
// y vuelva a comportarse como formulario de carga normal.
const resetearFormulario = () => {
    setFormulario({
        id: null,
        titulo: "",
        director: "",
        anio: "",
        genero: "",
        rating: "",
        tipo: "",
        visto: false
    });

    setModoEdicion(false);
};
    // APERTURA Y CIERRE DEL FORMULARIO:
    // abrirFormularioAgregar prepara el formulario para cargar un contenido nuevo.
    // Primero lo resetea para limpiar datos anteriores y después lo muestra.
    //
    // cerrarFormulario también resetea los datos, pero además oculta el formulario.
    // Esto sirve si el usuario cancela o si queremos volver al estado inicial.

    const abrirFormularioAgregar = () => {
        resetearFormulario();
        setMostrarFormulario(true);
    };
        const cerrarFormulario = () => {
        resetearFormulario();
        setMostrarFormulario(false);
    };

    // ABRIR FORMULARIO EN MODO EDICIÓN:
    // Esta función recibe una película existente, copia sus datos dentro
    // del estado formulario, activa el modo edición y muestra el formulario.
    // Así el usuario puede ver los datos actuales y modificarlos.
    const abrirFormularioEditar = (pelicula) => {
        setFormulario({
            id: pelicula.id,
            titulo: pelicula.titulo,
            director: pelicula.director,
            anio: pelicula.anio,
            genero: pelicula.genero,
            rating: pelicula.rating,
            tipo: pelicula.tipo,
            visto: pelicula.visto
        });

        setModoEdicion(true);
        setMostrarFormulario(true);
    };

    // GUARDAR CONTENIDO:
    // Esta función se usa para manejar el envío del formulario.
    // Primero evita que el form recargue la página.
    // Después revisa si estamos en modo edición o en modo alta.
    //
    // - Si modoEdicion es true, recorre el array peliculas con map,
    //   busca la película que tenga el mismo id que formulario.id
    //   y reemplaza sus datos por los nuevos valores cargados.
    //
    // - Si modoEdicion es false, crea un objeto nuevo a partir del formulario
    //   y lo agrega al final del array peliculas.
    //
    // En ambos casos, anio y rating se convierten a número porque desde
    // los inputs llegan como texto.
    // Finalmente, se resetea el formulario y se oculta de la pantalla.

    const guardarContenido = (e) => {
        e.preventDefault();

        if (modoEdicion) {
            const peliculasActualizadas = peliculas.map((pelicula) => {
                if (pelicula.id === formulario.id) {
                    return {
                        ...formulario,
                        anio: Number(formulario.anio),
                        rating: Number(formulario.rating)
                    };
                }

                return pelicula;
            });

            setPeliculas(peliculasActualizadas);
        } else {
            const nuevoContenido = {
                ...formulario,
                id: Date.now(),
                anio: Number(formulario.anio),
                rating: Number(formulario.rating),
                visto: false
            };

            setPeliculas([...peliculas, nuevoContenido]);
        }

        resetearFormulario();
        setMostrarFormulario(false);
    };

    // ELIMINAR CONTENIDO CON CONFIRMACIÓN:
    // Esta función recibe el id de una película o serie.
    // Primero muestra una ventana de confirmación con window.confirm().
    // Si el usuario acepta, se arma un nuevo array filtrando todas las películas
    // excepto la que tiene ese id, y luego se actualiza el estado.
    // Si el usuario cancela, no se hace ningún cambio.
    const eliminarContenido = (id) => {
        const confirmarEliminacion = window.confirm(
            "¿Seguro que querés eliminar este contenido?"
        );

        if (confirmarEliminacion) {
            const peliculasActualizadas = peliculas.filter(
                (pelicula) => pelicula.id !== id
            );

            setPeliculas(peliculasActualizadas);
        }
    };

    // className le da el estilo
    // value muestra el valor actual
    // onChange guarda la opcion elegida 
    return (
    <div className={styles.homeContainer}>
        <Titulo texto="Gestor de películas y series" />
                        {mostrarFormulario && (
                <section className={styles.formularioContainer}>
                    <h2>
                        {modoEdicion ? "Editar contenido" : "Agregar contenido"}
                    </h2>

                    <form className={styles.formulario} onSubmit={guardarContenido}>
                        <input
                            type="text"
                            name="titulo"
                            value={formulario.titulo}
                            onChange={manejarCambioFormulario}
                            placeholder="Título"
                            className={styles.inputFormulario}
                        />

                        <input
                            type="text"
                            name="director"
                            value={formulario.director}
                            onChange={manejarCambioFormulario}
                            placeholder="Director"
                            className={styles.inputFormulario}
                        />

                        <input
                            type="number"
                            name="anio"
                            value={formulario.anio}
                            onChange={manejarCambioFormulario}
                            placeholder="Año"
                            className={styles.inputFormulario}
                        />

                        <select
                            name="genero"
                            value={formulario.genero}
                            onChange={manejarCambioFormulario}
                            className={styles.inputFormulario}
                        >
                            <option value="">Seleccionar género</option>
                            <option value="Ciencia ficción">Ciencia ficción</option>
                            <option value="Drama">Drama</option>
                            <option value="Acción">Acción</option>
                            <option value="Fantasía">Fantasía</option>
                            <option value="Comedia">Comedia</option>
                        </select>

                        <input
                            type="number"
                            name="rating"
                            value={formulario.rating}
                            onChange={manejarCambioFormulario}
                            placeholder="Rating"
                            className={styles.inputFormulario}
                        />

                        <select
                            name="tipo"
                            value={formulario.tipo}
                            onChange={manejarCambioFormulario}
                            className={styles.inputFormulario}
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="pelicula">Película</option>
                            <option value="serie">Serie</option>
                        </select>

                        <div className={styles.accionesFormulario}>
                            <button
                                type="button"
                                className={styles.boton}
                                onClick={cerrarFormulario}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className={styles.boton}
                            >
                                {modoEdicion ? "Guardar cambios" : "Agregar"}
                            </button>
                        </div>
                    </form>
                </section>
            )}
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
                        <li>
                <select
                    className={styles.select}
                    value={ordenSeleccionado}
                    onChange={(e) => setOrdenSeleccionado(e.target.value)}
                >
                    <option value="ninguno">Sin orden</option>
                    <option value="anio-asc">Año ascendente</option>
                    <option value="anio-desc">Año descendente</option>
                    <option value="rating-asc">Rating ascendente</option>
                    <option value="rating-desc">Rating descendente</option>
                </select>
            </li>

            <li>
                <button
                    className={styles.botonAgregar}
                    onClick={abrirFormularioAgregar}
                >
                    Agregar contenido
                </button>
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
                    <div className={styles.accionesCard}>
                        <button
                            className={styles.boton}
                            onClick={() => cambiarEstadoVisto(pelicula.id)}
                        >
                            Marcar como vista
                        </button>

                        <button
                            className={styles.boton}
                            onClick={() => abrirFormularioEditar(pelicula)}
                        >
                            Editar
                        </button>
                        <button
                            className={styles.botonEliminar}
                            onClick={() => eliminarContenido(pelicula.id)}
                        >
                            Eliminar
                        </button>
                    </div>
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
                    <div className={styles.accionesCard}>
                        <button
                            className={styles.boton}
                            onClick={() => cambiarEstadoVisto(pelicula.id)}
                        >
                            Marcar como no vista
                        </button>

                        <button
                            className={styles.boton}
                            onClick={() => abrirFormularioEditar(pelicula)}
                        >
                            Editar
                        </button>
                        <button
                            className={styles.botonEliminar}
                            onClick={() => eliminarContenido(pelicula.id)}
                        >
                            Eliminar
                        </button>
                    </div>
            </div>
        ))
        )}
        </section>
    </div>
);
};

export default Home;