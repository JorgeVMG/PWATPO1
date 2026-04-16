import styles from "./ContenidoList.module.css";
import { CharacterCard } from "../CharacterCard/CharacterCard";

const ContenidoList = ({
    titulo,
    peliculas,
    conteoGeneros,
    textoBotonVisto,
    onCambiarEstado,
    onEditar,
    onEliminar
}) => {
    return (
        <section className={styles.columnaLista}>
            <h2>{titulo}</h2>
            <p>Total: {peliculas.length}</p>

            {/* RESUMEN POR GÉNERO:
                Primero usamos Object.keys(conteoGeneros) para obtener un array
                con los nombres de los géneros cargados en el objeto.
                Si el objeto no está vacío, recorremos esas claves con map().
            
                En cada vuelta:
                - "genero" representa el nombre de una clave, por ejemplo "Drama"
                - conteoGeneros[genero] busca la cantidad asociada a esa clave
            
                Así podemos mostrar en pantalla algo como:
                Drama: 2
                Comedia: 1
            */}
            {Object.keys(conteoGeneros).length > 0 && (
                <div className={styles.resumenGeneros}>
                    {Object.keys(conteoGeneros).map((genero) => (
                        <p key={genero} className={styles.generoItem}>
                            {genero}: {conteoGeneros[genero]}
                        </p>
                    ))}
                </div>
            )}

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