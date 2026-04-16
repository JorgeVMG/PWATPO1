import styles from "./ContenidoList.module.css";
import { CharacterCard } from "../CharacterCard/CharacterCard";

const ContenidoList = ({
    titulo,
    peliculas,
    textoBotonVisto,
    onCambiarEstado,
    onEditar,
    onEliminar
}) => {
    return (
        <section className={styles.columnaLista}>
            <h2>{titulo}</h2>
            <p>Total: {peliculas.length}</p>

            {peliculas.length === 0 ? (
                <p>No hay contenidos en esta lista.</p>
            ) : (
                peliculas.map((pelicula) => (
                    <div key={pelicula.id} className={styles.itemPelicula}>
                        <CharacterCard character={pelicula} />

                        <div className={styles.accionesCard}>
                            <button
                                className={styles.boton}
                                onClick={() => onCambiarEstado(pelicula.id)}
                            >
                                {textoBotonVisto}
                            </button>

                            <button
                                className={styles.boton}
                                onClick={() => onEditar(pelicula)}
                            >
                                Editar
                            </button>

                            <button
                                className={styles.botonEliminar}
                                onClick={() => onEliminar(pelicula.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
};

export default ContenidoList;