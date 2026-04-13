export const CharacterCard = ({character}) => {
    return (
        <div>
            <p>
                titulo: {character.titulo} <br />
                director: {character.director}
            </p>
        </div>
    );
}