import { useState } from "react";
import "./App.css";
import { CharacterCard } from "./Components/CharacterCard/CharacterCard";

function App() {
  // CAMBIO 1:
  // Antes había un estado "count" que no se usaba.
  // Lo saqué y en su lugar puse un estado real para guardar las películas.
  // Esto es importante porque las películas van a cambiar de "vista" a "no vista".
  const [peliculas, setPeliculas] = useState([
    {
      id: 1, // CAMBIO 2: agregué id único para usarlo como key y para identificar cada película
      titulo: "Inception",
      director: "Christopher Nolan",
      anio: 2010,
      genero: "Ciencia ficción",
      rating: 8.8,
      tipo: "pelicula",
      visto: false, // CAMBIO 3: agregué la propiedad "visto" para separar vistas y no vistas
    },
    {
      id: 2,
      titulo: "Breaking Bad",
      director: "Vince Gilligan",
      anio: 2010,
      genero: "Drama",
      rating: 9.5,
      tipo: "serie",
      visto: true,
    },
    {
      id: 3,
      titulo: "The Matrix",
      director: "Lana Wachowski / Lilly Wachowski",
      anio: 1999,
      genero: "Acción",
      rating: 8.7,
      tipo: "pelicula",
      visto: false,
    },
    {
      id: 4,
      titulo: "Stranger Things",
      director: "Hermanos Duffer",
      anio: 2016,
      genero: "Ciencia ficción",
      rating: 8.7,
      tipo: "serie",
      visto: true,
    },
    {
      id: 5,
      titulo: "Interstellar",
      director: "Christopher Nolan",
      anio: 2014,
      genero: "Ciencia ficción",
      rating: 8.6,
      tipo: "pelicula",
      visto: false,
    },
    {
      id: 6,
      titulo: "Game of Thrones",
      director: "David Benioff / D. B. Weiss",
      anio: 2011,
      genero: "Fantasía",
      rating: 9.2,
      tipo: "serie",
      visto: true,
    },
    {
      id: 7,
      titulo: "Parasite",
      director: "Bong Joon-ho",
      anio: 2019,
      genero: "Drama",
      rating: 8.5,
      tipo: "pelicula",
      visto: false,
    },
    {
      id: 8,
      titulo: "The Office",
      director: "Greg Daniels",
      anio: 2005,
      genero: "Comedia",
      rating: 8.9,
      tipo: "serie",
      visto: true,
    },
    {
      id: 9,
      titulo: "Avengers: Endgame",
      director: "Anthony Russo / Joe Russo",
      anio: 2019,
      genero: "Acción",
      rating: 8.4,
      tipo: "pelicula",
      visto: false,
    },
  ]);

  // Este estado ya lo tenía tu compañero y sirve para la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // CAMBIO 4:
  // Función nueva para cambiar el estado de una película.
  // Si estaba en "no vista", pasa a "vista".
  // Si estaba en "vista", pasa a "no vista".
  const cambiarEstadoVisto = (id) => {
    const peliculasActualizadas = peliculas.map((pelicula) => {
      if (pelicula.id === id) {
        // ...pelicula copia todos los datos de esa película
        // y después cambia solo la propiedad "visto"
        return { ...pelicula, visto: !pelicula.visto };
      }
      return pelicula;
    });

    setPeliculas(peliculasActualizadas);
  };

  // CAMBIO 5:
  // Primero filtramos por búsqueda.
  // Busca tanto en título como en director.
  const peliculasFiltradasPorBusqueda = peliculas.filter((pelicula) => {
    const textoBuscado = busqueda.toLowerCase();

    return (
      pelicula.titulo.toLowerCase().includes(textoBuscado) ||
      pelicula.director.toLowerCase().includes(textoBuscado)
    );
  });

  // CAMBIO 6:
  // A partir de las películas ya filtradas por búsqueda,
  // separamos en dos listas:
  // una de vistas y otra de no vistas.
  const peliculasVistas = peliculasFiltradasPorBusqueda.filter(
    (pelicula) => pelicula.visto === true
  );

  const peliculasNoVistas = peliculasFiltradasPorBusqueda.filter(
    (pelicula) => pelicula.visto === false
  );

  return (
    <div>
      <nav>
        <ul>
          <li>
            <input
              type="text"
              value={busqueda}
              className="busqueda"
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por titulo o director"
            />
          </li>
        </ul>
      </nav>

      {/* LISTA DE NO VISTAS */}
      <section>
        <h2>Películas / series por ver</h2>

        {/* CAMBIO 7:
            contador simple de elementos de la lista */}
        <p>Total: {peliculasNoVistas.length}</p>

        {/* CAMBIO 8:
            renderizado condicional
            Si no hay elementos, mostramos mensaje.
            Si hay, mostramos la lista. */}
        {peliculasNoVistas.length === 0 ? (
          <p>No hay contenidos por ver.</p>
        ) : (
          peliculasNoVistas.map((pelicula) => (
            <div key={pelicula.id}>
              {/* CharacterCard sigue reutilizándose */}
              <CharacterCard character={pelicula} />

              {/* CAMBIO 9:
                  botón para cambiar el estado */}
              <button onClick={() => cambiarEstadoVisto(pelicula.id)}>
                Marcar como vista
              </button>
            </div>
          ))
        )}
      </section>

      {/* LISTA DE VISTAS */}
      <section>
        <h2>Películas / series vistas</h2>
        <p>Total: {peliculasVistas.length}</p>

        {peliculasVistas.length === 0 ? (
          <p>No hay contenidos vistos.</p>
        ) : (
          peliculasVistas.map((pelicula) => (
            <div key={pelicula.id}>
              <CharacterCard character={pelicula} />

              <button onClick={() => cambiarEstadoVisto(pelicula.id)}>
                Marcar como no vista
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;