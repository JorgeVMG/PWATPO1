import styles from "./CharacterCard.module.css";

export const CharacterCard = ({ character }) => {
    return (
        <article className={styles.card}>
            <p className={styles.item}>
                <span className={styles.label}>Título:</span> {character.titulo}
            </p>

            <p className={styles.item}>
                <span className={styles.label}>Director:</span> {character.director}
            </p>

            <p className={styles.item}>
                <span className={styles.label}>Año:</span> {character.anio}
            </p>

            <p className={styles.item}>
                <span className={styles.label}>Género:</span> {character.genero}
            </p>

            <p className={styles.item}>
                <span className={styles.label}>Rating:</span> {character.rating}
            </p>

            <p className={styles.item}>
                <span className={styles.label}>Tipo:</span> {character.tipo}
            </p>
        </article>
    );
};