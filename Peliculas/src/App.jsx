import { useState } from 'react'
import './App.css'
import { CharacterCard } from './Components/CharacterCard/CharacterCard';
import { Info } from "./Components/CharacterCard/CharacterCard";

function App() {
  const [seleccionado, setSeleccionado] = useState(null);
  const colecionPeliculas = [
    {
      imagen: "https://www.filmofilia.com/wp-content/uploads/2010/05/inception_poster.jpg",
      titulo: "Inception",
      director: "Christopher Nolan",
      anio: 2010,
      genero: "Ciencia ficción",
      rating: 8.8,
      tipo: "pelicula"
    },
    {
      imagen: "https://artworks.thetvdb.com/banners/fanart/original/81189-63.jpg",
      titulo: "Breaking Bad",
      director: "Vince Gilligan",
      anio: 2008,
      genero: "Drama",
      rating: 9.5,
      tipo: "serie"
    },
    {
      imagen: "https://th.bing.com/th/id/R.3b55c3b96c9a8baeac7e3f7e4f7425f0?rik=sd714OAxo0uj2Q&pid=ImgRaw&r=0",
      titulo: "The Matrix",
      director: "Lana Wachowski / Lilly Wachowski",
      anio: 1999,
      genero: "Acción",
      rating: 8.7,
      tipo: "pelicula"
    },
    {
      imagen: "https://th.bing.com/th/id/R.9d7b9d01cf1f742485b850d69c93bc3a?rik=vIiEcm1347CxFw&pid=ImgRaw&r=0",
      titulo: "Stranger Things",
      director: "Hermanos Duffer",
      anio: 2016,
      genero: "Ciencia ficción",
      rating: 8.7,
      tipo: "serie"
    },
    {
      imagen: "https://wallpapercave.com/wp/wp1817975.jpg",
      titulo: "Interstellar",
      director: "Christopher Nolan",
      anio: 2014,
      genero: "Ciencia ficción",
      rating: 8.6,
      tipo: "pelicula"
    },
    {
      imagen: "https://images.hdqwalls.com/wallpapers/game-of-thrones-season-8-4k-x7.jpg",
      titulo: "Game of Thrones",
      director: "David Benioff / D. B. Weiss",
      anio: 2011,
      genero: "Fantasía",
      rating: 9.2,
      tipo: "serie"
    },
    {
      imagen: "https://media.urgente24.com/p/0946d9ae15dcf181dd5e6fdb1c28d49f/adjuntos/319/imagenes/003/285/0003285055/wwwwwwwwwwwwwwwwwpng.png",
      titulo: "Parasite",
      director: "Bong Joon-ho",
      anio: 2019,
      genero: "Drama",
      rating: 8.5,
      tipo: "pelicula"
    },
    {
      imagen: "https://www.agenciapacourondo.com.ar/sites/www.agenciapacourondo.com.ar/files/styles/destacado/public/foto_the_office.jpg?itok=BMCm4EiE",
      titulo: "The Office",
      director: "Greg Daniels",
      anio: 2005,
      genero: "Comedia",
      rating: 8.9,
      tipo: "serie"
    },
    {
      imagen: "https://img.canal1.com.co/uploads/2019/04/avengers-endgame-estreno-comentarios-pelicula.jpg?format=auto&width=1200",
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
      <div className='pelis'>
        {colecionPeliculas.map(pelicula => (
          <CharacterCard key={pelicula.titulo} character ={pelicula} onClick={() => setSeleccionado(pelicula)}
          />
        ))}
      </div>
      {seleccionado && (
        <div className="modal revelar">
          <div className="backdrop"onClick={() => setSeleccionado(null)}>
            <div className="contenido"onClick={(e) => e.stopPropagation()}>
              <div className="cabecera" style={{backgroundImage: `url(${seleccionado.imagen})`,backgroundSize: "cover",backgroundPosition: "center",width:"80%",marginLeft:"6%",height:"170px", marginTop:"10px",marginBottom:"10px", borderRadius:"7%"}}>
                <h2>{seleccionado.titulo}</h2>
                <button onClick={() => setSeleccionado(null)}>X</button>
              </div>

              <div>
                <Info character={seleccionado} />
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}
/**<div className='pelis'>
        {colecionPeliculas.map(pelicula => (
          <CharacterCard key={pelicula.titulo} onClick={()=> setSeleccionado(pelicula)}/>
        ))}
      </div>
 <div className="cuadroInfo" style={{ display: seleccionado ? "block" : "none" }}>
        {seleccionado && (
          <div className="overlay" onClick={() => setSeleccionado(null)}>
            <div onClick={(e) => e.stopPropagation()}>
              <Info character={seleccionado} />
            </div>

          </div>
        )}
      </div> */
export default App
