const FilterBar = ({
    busqueda,
    setBusqueda,
    generoSeleccionado,
    setGeneroSeleccionado,
    tipoSeleccionado,
    setTipoSeleccionado,
    ordenSeleccionado,
    setOrdenSeleccionado,
    abrirFormularioAgregar
}) => {
    return (
        <nav>
            <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center">
                <input
                    type="text"
                    value={busqueda}
                    className="form-control"
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por titulo o director"
                    style={{ maxWidth: "260px" }}
                />

                <select
                    className="form-select"
                    value={generoSeleccionado}
                    onChange={(e) => setGeneroSeleccionado(e.target.value)}
                    style={{ maxWidth: "180px" }}
                >
                    <option value="todos">Todos los géneros</option>
                    <option value="Ciencia ficción">Ciencia ficción</option>
                    <option value="Drama">Drama</option>
                    <option value="Acción">Acción</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Comedia">Comedia</option>
                </select>

                <select
                    className="form-select"
                    value={tipoSeleccionado}
                    onChange={(e) => setTipoSeleccionado(e.target.value)}
                    style={{ maxWidth: "160px" }}
                >
                    <option value="todos">Todos los tipos</option>
                    <option value="pelicula">Película</option>
                    <option value="serie">Serie</option>
                </select>

                <select
                    className="form-select"
                    value={ordenSeleccionado}
                    onChange={(e) => setOrdenSeleccionado(e.target.value)}
                    style={{ maxWidth: "190px" }}
                >
                    <option value="ninguno">Sin orden</option>
                    <option value="anio-asc">Año ascendente</option>
                    <option value="anio-desc">Año descendente</option>
                    <option value="rating-asc">Rating ascendente</option>
                    <option value="rating-desc">Rating descendente</option>
                </select>

                <button
                    className="btn btn-dark px-4"
                    onClick={abrirFormularioAgregar}
                >
                    Agregar contenido
                </button>
            </div>
        </nav>
    );
};

export default FilterBar;