import styles from './CharacterCard.module.css'
import imagen from "../../assets/cielo.jpg";

export const Info = ({ character }) => {
    return (
        <div className={styles.cuadroTexto}>
            <p>Director: {character.director}</p>
            <p>Año: {character.anio}</p>
            <p>Genero: {character.genero}</p>
            <p>Rating: {character.rating}</p>
            <p>Tipo: {character.tipo}</p>
        </div>
    );
};
export const CharacterCard = ({character,onClick}) => {
  return (
    <div className={styles.cuadro} onClick={onClick}>
      <img src={character.imagen}  />
    </div>
  ); 
};