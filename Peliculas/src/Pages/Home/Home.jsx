// useEffect lo usamos para ejecutar código automático cuando cambia un estado.
// En este caso, lo necesitamos para guardar las películas en localStorage
// cada vez que el array "peliculas" se actualiza.
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import ContenidoList from "../../Components/ContenidoList/ContenidoList";
import FormularioContenido from "../../Components/FormularioContenido/FormularioContenido";
import FilterBar from "../../Components/FilterBar/FilterBar";

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

    // FUNCIÓN PARA AGREGAR UNA NUEVA PELÍCULA O SERIE:
    // Recibe el objeto nuevo desde el formulario y lo agrega al array "peliculas".
    // Después cerramos el formulario.
    // Como cambia el estado "peliculas", automáticamente el useEffect
    // vuelve a guardar todo en localStorage.
    /**const agregarContenido = (nuevoContenido) => {
        setPeliculas([...peliculas, nuevoContenido]);
        setMostrarFormulario(false);
    };*/
    // SINCRONIZACIÓN CON LOCALSTORAGE:
    // Cada vez que cambia el estado "peliculas", guardamos el array actualizado
    // en localStorage para que no se pierda al refrescar la página.
    // JSON.stringify transforma el array en texto, que es el formato que
    // localStorage puede almacenar.
    
    useEffect(() => {
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
    }, [peliculas]);

    const peliculasVistasOriginales = peliculas.filter(
    (pelicula) => pelicula.visto === true
    );

    const peliculasNoVistasOriginales = peliculas.filter(
        (pelicula) => pelicula.visto === false
    );

  // FUNCIÓN PARA CAMBIAR ENTRE VISTA Y NO VISTA:
  // Recibe el id de una película, recorre el array con map
  // y cuando encuentra la correcta, invierte su valor de "visto".
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

    const mensajeNoVistas =
    peliculasNoVistasOriginales.length === 0
        ? "No hay contenidos por ver."
        : "No hay resultados por ver con los filtros actuales.";

    const mensajeVistas =
        peliculasVistasOriginales.length === 0
            ? "No hay contenidos vistos."
            : "No hay resultados vistos con los filtros actuales.";
// CONTADOR POR GÉNERO:
// Esta función recibe una lista de películas/series y arma un objeto
// con la cantidad de contenidos que hay por cada género.
//
// Primero crea un objeto vacío llamado "conteo".
// Después recorre la lista con forEach().
// En cada película:
// - toma su género
// - si ese género ya existe en el objeto, le suma 1
// - si no existe, lo crea con valor 1
//
// Al final devuelve el objeto completo con el resumen por género.
    const contarPorGenero = (lista) => {
    const conteo = {};

    lista.forEach((pelicula) => {
        const genero = pelicula.genero;

        if (conteo[genero]) {
            conteo[genero] = conteo[genero] + 1;
        } else {
            conteo[genero] = 1;
        }
    });

    return conteo;
};
    const conteoGenerosNoVistas = contarPorGenero(peliculasNoVistas);
    const conteoGenerosVistas = contarPorGenero(peliculasVistas);

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
    const cambiarEstadoVisto = (id) => {
        const peliculasActualizadas = peliculas.map((pelicula) => {
            if (pelicula.id === id) {
                return { ...pelicula, visto: !pelicula.visto };
            }
            return pelicula;
        });

        setPeliculas(peliculasActualizadas);
    };
    // className le da el estilo    
    // value muestra el valor actual
    // onChange guarda la opcion elegida 
    return (
    <main className="container py-5" style={{ maxWidth: "1200px" }}>
        <header className="mb-5 text-center">
            <Titulo texto="Gestor de películas y series" />
        </header>

        <section className="mb-4">
            <FormularioContenido
                mostrarFormulario={mostrarFormulario}
                modoEdicion={modoEdicion}
                formulario={formulario}
                manejarCambioFormulario={manejarCambioFormulario}
                cerrarFormulario={cerrarFormulario}
                guardarContenido={guardarContenido}
            />
        </section>

        <section className="mb-5">
            <FilterBar
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                generoSeleccionado={generoSeleccionado}
                setGeneroSeleccionado={setGeneroSeleccionado}
                tipoSeleccionado={tipoSeleccionado}
                setTipoSeleccionado={setTipoSeleccionado}
                ordenSeleccionado={ordenSeleccionado}
                setOrdenSeleccionado={setOrdenSeleccionado}
                abrirFormularioAgregar={abrirFormularioAgregar}
            />
        </section>

        <section className="row g-4 align-items-start">
            <div className="col-12 col-lg-6">
                <ContenidoList
                    titulo="Películas / series por ver"
                    peliculas={peliculasNoVistas}
                    conteoGeneros={conteoGenerosNoVistas}
                    mensajeVacio={mensajeNoVistas}
                    textoBotonVisto="Marcar como vista"
                    onCambiarEstado={cambiarEstadoVisto}
                    onEditar={abrirFormularioEditar}
                    onEliminar={eliminarContenido}
                />
            </div>

            <div className="col-12 col-lg-6">
                <ContenidoList
                    titulo="Películas / series vistas"
                    peliculas={peliculasVistas}
                    conteoGeneros={conteoGenerosVistas}
                    mensajeVacio={mensajeVistas}
                    textoBotonVisto="Marcar como no vista"
                    onCambiarEstado={cambiarEstadoVisto}
                    onEditar={abrirFormularioEditar}
                    onEliminar={eliminarContenido}
                />
            </div>
        </section>
    </main>
);
}

export default Home