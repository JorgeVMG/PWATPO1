import { useState } from "react";
import styles from "./FormularioContenido.module.css";

const FormularioContenido = ({ onAgregarContenido }) => {
    const [titulo, setTitulo] = useState("");
    const [director, setDirector] = useState("");
    const [anio, setAnio] = useState("");
    const [genero, setGenero] = useState("Ciencia ficción");
    const [rating, setRating] = useState("");
    const [tipo, setTipo] = useState("pelicula");

    const manejarSubmit = (e) => {
        e.preventDefault();

        if (
            titulo.trim() === "" ||
            director.trim() === "" ||
            anio === "" ||
            rating === ""
        ) {
            alert("Completá todos los campos.");
            return;
        }

        const nuevoContenido = {
            id: Date.now(),
            titulo: titulo.trim(),
            director: director.trim(),
            anio: Number(anio),
            genero,
            rating: Number(rating),
            tipo,
            visto: false,
        };

        onAgregarContenido(nuevoContenido);

        setTitulo("");
        setDirector("");
        setAnio("");
        setGenero("Ciencia ficción");
        setRating("");
        setTipo("pelicula");
    };

    return (
        <form id="formulario-pelicula" className={styles.formulario} onSubmit={manejarSubmit}>
            <h2 className={styles.subtitulo}>Agregar contenido</h2>

            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={styles.input}
            />

            <input
                type="text"
                placeholder="Director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className={styles.input}
            />

            <input
                type="number"
                placeholder="Año"
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
                className={styles.input}
            />

            <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className={styles.select}
            >
                <option value="Ciencia ficción">Ciencia ficción</option>
                <option value="Drama">Drama</option>
                <option value="Acción">Acción</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Comedia">Comedia</option>
            </select>

            <input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className={styles.input}
            />

            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className={styles.select}
            >
                <option value="pelicula">Película</option>
                <option value="serie">Serie</option>
            </select>

            <button type="submit" className={styles.boton}>
                Agregar
            </button>
        </form>
    );
};

export default FormularioContenido;