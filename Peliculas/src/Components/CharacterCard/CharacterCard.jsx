export const CharacterCard = ({ character }) => {
    return (
        <article className="text-start">
            <h3 className="h5 fw-semibold mb-3">{character.titulo}</h3>

            <div className="d-flex flex-column gap-2">
                <p className="mb-0">
                    <span className="fw-semibold">Director:</span> {character.director}
                </p>

                <p className="mb-0">
                    <span className="fw-semibold">Año:</span> {character.anio}
                </p>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
                <span className="badge text-bg-light border rounded-pill px-3 py-2">
                    {character.genero}
                </span>

                <span className="badge text-bg-light border rounded-pill px-3 py-2 text-capitalize">
                    {character.tipo}
                </span>

                <span className="badge text-bg-light border rounded-pill px-3 py-2">
                    Rating: {character.rating}
                </span>
            </div>
        </article>
    );
};