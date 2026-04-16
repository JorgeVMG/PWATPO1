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
        <section className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h4 fw-semibold mb-0">
                        {modoEdicion ? "Editar contenido" : "Agregar contenido"}
                    </h2>
                </div>

                <form onSubmit={guardarContenido}>
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <input
                                type="text"
                                name="titulo"
                                value={formulario.titulo}
                                onChange={manejarCambioFormulario}
                                placeholder="Título"
                                className="form-control"
                            />
                        </div>

                        <div className="col-12 col-md-6">
                            <input
                                type="text"
                                name="director"
                                value={formulario.director}
                                onChange={manejarCambioFormulario}
                                placeholder="Director"
                                className="form-control"
                            />
                        </div>

                        <div className="col-12 col-md-4">
                            <input
                                type="number"
                                name="anio"
                                value={formulario.anio}
                                onChange={manejarCambioFormulario}
                                placeholder="Año"
                                className="form-control"
                            />
                        </div>

                        <div className="col-12 col-md-4">
                            <select
                                name="genero"
                                value={formulario.genero}
                                onChange={manejarCambioFormulario}
                                className="form-select"
                            >
                                <option value="">Seleccionar género</option>
                                <option value="Ciencia ficción">Ciencia ficción</option>
                                <option value="Drama">Drama</option>
                                <option value="Acción">Acción</option>
                                <option value="Fantasía">Fantasía</option>
                                <option value="Comedia">Comedia</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-4">
                            <select
                                name="tipo"
                                value={formulario.tipo}
                                onChange={manejarCambioFormulario}
                                className="form-select"
                            >
                                <option value="">Seleccionar tipo</option>
                                <option value="pelicula">Película</option>
                                <option value="serie">Serie</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-4">
                            <input
                                type="number"
                                step="0.1"
                                name="rating"
                                value={formulario.rating}
                                onChange={manejarCambioFormulario}
                                placeholder="Rating"
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 justify-content-end mt-4">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={cerrarFormulario}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-dark"
                        >
                            {modoEdicion ? "Guardar cambios" : "Agregar"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default FormularioContenido; 