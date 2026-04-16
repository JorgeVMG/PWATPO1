import styles from "./FilterBar.module.css";

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
                        onChange={(e) => setGeneroSeleccionado(e.target.value)}
                    >
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
    );
};

export default FilterBar;