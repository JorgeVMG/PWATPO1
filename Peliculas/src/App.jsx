import { useState } from 'react'
import './App.css'
import {CharacterCard } from './Components/CharacterCard/CharacterCard';

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
      anio: 2010,
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
  const listarPeliculas = (colecc) =>{
    return (
      colecc.map(pelicula =>(
        <CharacterCard key={pelicula.titulo} character={pelicula} />
      ))
    );
  }
  const cantidadPeliculas = (colecc) =>{
    return (colecc.length);
  }
  const filtoPeliculas = (colecc, propiedad, condicion) =>{
    return colecc.filter(cp => cp[propiedad] === condicion);
  }; 
  const mensaje = (colecc, propiedad, condicion) =>{
    if(filtoPeliculas(colecc, propiedad, condicion).length == 0){
      return <p>Lista vacia</p>
    }
  }
  const [busqueda, setBusqueda] = useState("");
  const peliculasTituloODirector = colecionPeliculas.filter((pelicula)  => {
    const busquedaMin = busqueda.toLowerCase();
    return (pelicula.titulo.toLowerCase().includes(busquedaMin) || pelicula.director.toLowerCase().includes(busquedaMin));
  });
  const [peliculaFiltrada,setpeliculaFiltrada] = useState(colecionPeliculas) 
  const manejarFiltro = (genero) => {
    const filtradas = colecionPeliculas.filter(p => p.genero === genero);
    setpeliculaFiltrada(filtradas);
  };
  const presentacionPeliculas =(colecc)=>{
    return;
  } 
  return (
    <div>
      <nav>
        <ul>
          <li><div className='accion'>Agregar</div></li>
          <li>
            <div className="desplegar">
              <div className='accion'>Generos</div>
              <div className="contenido">
                <div className='genero' /*onClick={() => manejarFiltro("Ciencia ficción")}*/>Ciencia ficción</div>
                <div className='genero' >Drama</div>
                <div className='genero' >Comedia</div>
              </div>
            </div>
          </li>
          <li><input type="text" value={busqueda} className='busqueda' onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar"/></li>
        </ul>
      </nav>
      <div>
        {listarPeliculas(peliculasTituloODirector)}
        <p>{busqueda.length > 0 ? busqueda : "no hay nada"}</p>
      </div>
    </div>
  )
}

export default App
