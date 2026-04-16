import styles from "./FormularioContenido.module.css";

const FormularioContenido = ({
    mostrarFormulario,
    modoEdicion,
    formulario,
    manejarCambioFormulario,
    cerrarFormulario,
    guardarContenido
}) => {
    if (!mostrarFormulario) {
        return null;
    }

    return (
        <section className={styles.formularioContainer}>
            <h2 className={styles.subtitulo}>
                {modoEdicion ? "Editar contenido" : "Agregar contenido"}
            </h2>

            <form className={styles.formulario} onSubmit={guardarContenido}>
                <input
                    type="text"
                    name="titulo"
                    value={formulario.titulo}
                    onChange={manejarCambioFormulario}
                    placeholder="Título"
                    className={styles.input}
                />

                <input
                    type="text"
                    name="director"
                    value={formulario.director}
                    onChange={manejarCambioFormulario}
                    placeholder="Director"
                    className={styles.input}
                />

                <input
                    type="number"
                    name="anio"
                    value={formulario.anio}
                    onChange={manejarCambioFormulario}
                    placeholder="Año"
                    className={styles.input}
                />

                <select
                    name="genero"
                    value={formulario.genero}
                    onChange={manejarCambioFormulario}
                    className={styles.select}
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
                    step="0.1"
                    name="rating"
                    value={formulario.rating}
                    onChange={manejarCambioFormulario}
                    placeholder="Rating"
                    className={styles.input}
                />

                <select
                    name="tipo"
                    value={formulario.tipo}
                    onChange={manejarCambioFormulario}
                    className={styles.select}
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
    );
};

export default FormularioContenido;