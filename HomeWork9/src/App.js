import './App.css';
import AddMovie from './components/AddMovie';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";

import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {

  const [movies, setMovies] = useState([])
  

  useEffect(() => {
    axios("http://localhost:3000/movies")
        .then((res) => setMovies(res.data))
        .catch(e => console.log("error:", e))
}, [])



// ADD MOVIE
const addMovie = async (movie) => {
  await axios.post(`http://localhost:3000/movies/`, movie)
  setMovies(movies.concat([movie]))
}


  return (
    <div>


    <header>
    <Navbar />
    </header>

    <Routes>  
          <Route path="/" element={ <HomePage />} />
          <Route path="/add" element={<AddMovie onAddMovieProp={(movie) => { addMovie(movie) }} />} />
    </Routes>

    </div>
  );
}

export default App;
