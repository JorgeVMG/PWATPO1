import Styles from "./Filtros.module.css"
import { CharacterCard } from "../CharacterCard/CharacterCard";
export const Filtrado = ({peliculas, busqueda, generoSeleccionado, tipoSeleccionado, setPeliculas}) =>{

    const peliculasFiltradas = peliculas.filter((pelicula) => {
        const textoBuscado = busqueda.toLowerCase();
        const coincideBusqueda = pelicula.titulo.toLowerCase().includes(textoBuscado) ||pelicula.director.toLowerCase().includes(textoBuscado);
        const coincideGenero =generoSeleccionado === "todos" || pelicula.genero === generoSeleccionado;
        const coincideTipo =tipoSeleccionado === "todos" ||pelicula.tipo === tipoSeleccionado;
        return coincideBusqueda && coincideGenero && coincideTipo;
    })

    const peliculasVistas = peliculasFiltradas.filter((pelicula) => pelicula.visto === true);
    const peliculasNoVistas = peliculasFiltradas.filter((pelicula) => pelicula.visto === false);

    const cambiarEstadoVisto = (id) => {
        const peliculasActualizadas = peliculas.map((pelicula) => {
            if (pelicula.id === id) {
                return { ...pelicula, visto: !pelicula.visto };
            }
            return pelicula;
        });

        setPeliculas(peliculasActualizadas);
    };
    return (
    <div className={Styles.contenedorListas}>
        <section className={Styles.columnaLista}>
            <h2>Películas / series por ver</h2>
            <p>Total: {peliculasNoVistas.length}</p>

            {peliculasNoVistas.length === 0 ? (
                <p>No hay contenidos por ver.</p>
            ) : (
                peliculasNoVistas.map((pelicula) => (
                    <div key={pelicula.id} className={Styles.itemPelicula}>
                        <CharacterCard character={pelicula} />
                        <button
                            className={Styles.boton}
                            onClick={() => cambiarEstadoVisto(pelicula.id)}
                        >
                            Marcar como vista
                        </button>
                    </div>
                ))
            )}
        </section>

        <section className={Styles.columnaLista}>
            <h2>Películas / series vistas</h2>
            <p>Total: {peliculasVistas.length}</p>

            {peliculasVistas.length === 0 ? (
                <p>No hay contenidos vistos.</p>
            ) : (
                peliculasVistas.map((pelicula) => (
                    <div key={pelicula.id} className={Styles.itemPelicula}>
                        <CharacterCard character={pelicula} />
                        <button
                            className={Styles.boton}
                            onClick={() => cambiarEstadoVisto(pelicula.id)}
                        >
                            Marcar como no vista
                        </button>
                    </div>
                ))
            )}
        </section>
    </div>
);
};