import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const colecionPeliculas = [
    {
      titulo: "Inception",
      director: "Christopher Nolan",
      anio: 2010,
      genero: "Ciencia ficción",
      rating: 8.8,
      tipo: "pelicula"
    },
    {
      titulo: "Breaking Bad",
      director: "Vince Gilligan",
      anio: 2008,
      genero: "Drama",
      rating: 9.5,
      tipo: "serie"
    },
    {
      titulo: "The Matrix",
      director: "Lana Wachowski / Lilly Wachowski",
      anio: 1999,
      genero: "Acción",
      rating: 8.7,
      tipo: "pelicula"
    },
    {
      titulo: "Stranger Things",
      director: "Hermanos Duffer",
      anio: 2016,
      genero: "Ciencia ficción",
      rating: 8.7,
      tipo: "serie"
    },
    {
      titulo: "Interstellar",
      director: "Christopher Nolan",
      anio: 2014,
      genero: "Ciencia ficción",
      rating: 8.6,
      tipo: "pelicula"
    },
    {
      titulo: "Game of Thrones",
      director: "David Benioff / D. B. Weiss",
      anio: 2011,
      genero: "Fantasía",
      rating: 9.2,
      tipo: "serie"
    },
    {
      titulo: "Parasite",
      director: "Bong Joon-ho",
      anio: 2019,
      genero: "Drama",
      rating: 8.5,
      tipo: "pelicula"
    },
    {
      titulo: "The Office",
      director: "Greg Daniels",
      anio: 2005,
      genero: "Comedia",
      rating: 8.9,
      tipo: "serie"
    },
    {
      titulo: "Avengers: Endgame",
      director: "Anthony Russo / Joe Russo",
      anio: 2019,
      genero: "Acción",
      rating: 8.4,
      tipo: "pelicula"
    }
  ];
  return (
    <div>
      
    </div>
  )
}

export default App
