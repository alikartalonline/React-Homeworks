import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import serialize from 'form-serialize';


function EditMovie( { updateMovieProp } ) {

    const { id } = useParams()
    //    console.log(id)

    const [movieInfo, setMovieInfo] = useState({
        name: "",
        rating: "",
        overview: "",
        imageURL: ""
    })

    useEffect(() => {
        axios(`http://localhost:3000/movies/${id}`)
            .then((res) => setMovieInfo({
                name: res.data.name,
                rating: res.data.rating,
                overview: res.data.overview,
                imageURL: res.data.imageURL
            }))
            .catch(e => console.log("error:", e))
    }, []);


    const navigate = useNavigate()
    //If you don't know useNavigate(), click the link below ;) 
    // (Remember: ReactRouter v6)
    // https://reactrouter.com/docs/en/v6/api


    const onIpnutChange = (e) => {
        // console.log("name:", e.target.name)
        // console.log("value:", e.target.value)

        setMovieInfo({
            [e.target.name]: e.target.value
        });
    };


    const handleFormSubmit = (e) => {
        e.preventDefault()
        navigate("/")

        // Edit => Yöntem-1: Fail
        // const { name, rating, overview, imageURL } = movieInfo

        // const updateMovie = {
        //     // name: name, => ES6'da bunu aşağıdaki şekilde kısaltarak da yazabiliriz
        //     // ( Nesnemizdeki isim-değer aynıysa yalnızca ismi bu şekilde yazabiliriz)
        //     name,
        //     rating,
        //     overview,
        //     imageURL
        // }

        // updateMovieProp(id, updateMovie)
        

        // Edit => Yöntem-2: From Serialize
        const editMovieSerialize = serialize(e.target, { hash: true });
        updateMovieProp(id, editMovieSerialize)
    };


    return (
        <div className='container mt-5'>

            <form
                action="mt-5"
                className='row g-3'
                onSubmit={handleFormSubmit}
            >
                <div className='col-md-12'>
                    <input
                        type="text"
                        className='form-control'
                        id='disabledInput'
                        placeholder='EDIT The Form To UPDATE A Movie...'
                        disabled
                    />
                </div>

                <div className='col-md-8'>
                    <label htmlFor="inputName">Name</label>
                    <input
                        type="text"
                        className='form-control'
                        name='name'
                        value={movieInfo.name}
                        onChange={onIpnutChange}
                    />
                </div>
                
                <div className='col-md-4'>
                    <label htmlFor="inputRating">Rating</label>
                    <input
                        type="text"
                        className='form-control'
                        name='rating'
                        value={movieInfo.rating}
                        onChange={onIpnutChange}
                    />
                </div>


                <div className='col-md-12'>
                    <label htmlFor="inputImage">Image URL</label>
                    <input
                        type="text"
                        className='form-control'
                        name='imageURL'
                        value={movieInfo.imageURL}
                        onChange={onIpnutChange}
                    />
                </div>


                <div className='col-md-12'>
                    <label htmlFor="overviewTextarea">Overview</label>
                    <textarea
                        className='form-control'
                        name="overview"
                        rows="5"
                        value={movieInfo.overview}
                        onChange={onIpnutChange}
                    >
                    </textarea>
                </div>

                <div className='d-grid gap-2 mt-2'>
                    <input
                        type="submit"
                        className='form-control btn btn-danger '
                        value="Edit Movie"
                    />
                </div>

            </form>
        </div>
    )
}

export default EditMovie