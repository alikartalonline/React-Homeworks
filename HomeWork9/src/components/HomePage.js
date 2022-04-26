import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from 'axios';


function HomePage() {

    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")


    useEffect(() => {
        axios("http://localhost:3000/movies")
            .then((res) => setMovies(res.data))
            .catch(e => console.log("error:", e))
    }, [])


    // DELETE MOVIE
    const deleteMovie = async (film) => {
        axios.delete(`http://localhost:3000/movies/${film}`)
        const newMovieList = movies.filter(
            f => f.id !== film
        );
        setMovies(newMovieList)
    }


    // SEARCH MOVIE
    const searchMovie = (event) => {
        setSearch(event.target.value)
    }

    
    let filteredMovies = movies.filter(
        (movie) => {
            return movie.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        }
    ).sort( (a,b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0; 
    }); // yeni eklenen filmin en önde gözükmesini istiyorum.




    return (
        <div className='container'>
            <div className='row'>
                <div className='col-log-12'>
                    <SearchBar searchMovieProp={searchMovie} />
                </div>
            </div>

            <MovieList  movies={filteredMovies} deleteMovieProp={deleteMovie} />

        </div>
    )
}

export default HomePage