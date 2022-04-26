import './App.css';

import AddMovie from './components/AddMovie';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import EditMovie from './components/EditMovie';

import { Routes, Route, } from "react-router-dom";
import { useEffect, useState } from 'react';

import axios from 'axios';




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


 // EDIT MOVIE
const editMovie = async (id, updateMovie) => {
  await axios.put(`http://localhost:3000/movies/${id}`, updateMovie)
}


  return (
    <div>

    <header>
    <Navbar />
    </header>

    <Routes>  
          <Route path="/" element={ <HomePage />} />
          <Route path="/add" element={<AddMovie onAddMovieProp={(movie) => { addMovie(movie) }} />} />
          <Route path="/edit/:id"  element={ <EditMovie updateMovieProp={(id, movie) => { editMovie(id, movie) }}  />} />
    </Routes>

    </div>
  );
}

export default App;
