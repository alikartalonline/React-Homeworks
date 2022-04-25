import React from 'react'
import serialize from 'form-serialize';
import { useNavigate  } from "react-router-dom";


function AddMovie({ onAddMovieProp }) {

    const navigate = useNavigate()
    //If you don't know useNavigate(), click the link below ;) 
    // (Remember: ReactRouter v6)
    // https://reactrouter.com/docs/en/v6/api


    const handleFormSubmit = (e) => {
        e.preventDefault()
        const newMovie = serialize(e.target, { hash: true });
        // console.log(newMovie)
        onAddMovieProp(newMovie)
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
                        placeholder='Fill The Form To Add A Movie...'
                        disabled
                    />
                </div>

                <div className='col-md-8'>
                    <label htmlFor="inputName">Name</label>
                    <input
                        type="text"
                        className='form-control'
                        name='name'
                    />
                </div>
                <div className='col-md-4'>
                    <label htmlFor="inputRating">Rating</label>
                    <input
                        type="text"
                        className='form-control'
                        name='rating'
                    />
                </div>


                <div className='col-md-12'>
                    <label htmlFor="inputImage">Image URL</label>
                    <input
                        type="text"
                        className='form-control'
                        name='imageURL'
                    />
                </div>


                <div className='col-md-12'>
                    <label htmlFor="overviewTextarea">Overview</label>
                    <textarea
                        className='form-control'
                        name="overview"
                        rows="5">
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

export default AddMovie