import styles from "./ContenidoList.module.css";
import { CharacterCard } from "../CharacterCard/CharacterCard";

const ContenidoList = ({
    titulo,
    peliculas,
    conteoGeneros,
    mensajeVacio,
    textoBotonVisto,
    onCambiarEstado,
    onEditar,
    onEliminar
}) => {
    return (
        <section className={styles.columnaLista}>
            <div className="mb-4">
                <h2 className="fw-semibold mb-2">{titulo}</h2>
                <p className="text-secondary mb-3">Total: {peliculas.length}</p>

                {Object.keys(conteoGeneros).length > 0 && (
                    <div className="d-flex flex-wrap gap-2">
                        {Object.keys(conteoGeneros).map((genero) => (
                            <span
                                key={genero}
                                className="badge text-bg-light border rounded-pill px-3 py-2"
                            >
                                {genero}: {conteoGeneros[genero]}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {peliculas.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <p className="text-secondary mb-0">{mensajeVacio}</p>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-column gap-4">
                    {peliculas.map((pelicula) => (
                        <div
                            key={pelicula.id}
                            className="card border-0 shadow-sm rounded-4"
                        >
                            <div className="card-body p-4">
                                <CharacterCard character={pelicula} />

                                <div className="d-flex flex-wrap gap-2 mt-4">
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => onCambiarEstado(pelicula.id)}
                                    >
                                        {textoBotonVisto}
                                    </button>

                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => onEditar(pelicula)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onEliminar(pelicula.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ContenidoList;