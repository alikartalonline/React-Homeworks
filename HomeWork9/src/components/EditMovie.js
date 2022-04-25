import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


function EditMovie() {

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


    }, [])

    const navigate = useNavigate()
    //If you don't know useNavigate(), click the link below ;) 
    // (Remember: ReactRouter v6)
    // https://reactrouter.com/docs/en/v6/api


    const handleFormSubmit = (e) => {
        e.preventDefault()
        navigate("/")
    }


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
                    />
                </div>
                
                <div className='col-md-4'>
                    <label htmlFor="inputRating">Rating</label>
                    <input
                        type="text"
                        className='form-control'
                        name='rating'
                        value={movieInfo.rating}
                    />
                </div>


                <div className='col-md-12'>
                    <label htmlFor="inputImage">Image URL</label>
                    <input
                        type="text"
                        className='form-control'
                        name='imageURL'
                        value={movieInfo.imageURL}
                    />
                </div>


                <div className='col-md-12'>
                    <label htmlFor="overviewTextarea">Overview</label>
                    <textarea
                        className='form-control'
                        name="overview"
                        rows="5"
                        value={movieInfo.overview}
                    >
                    </textarea>
                </div>

                <div className='d-grid gap-2 mt-2'>
                    <input
                        type="submit"
                        className='form-control btn btn-danger '
                        value="Add Movie"
                    />
                </div>

            </form>
        </div>
    )
}

export default EditMovie