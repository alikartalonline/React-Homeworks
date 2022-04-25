import React from 'react'

{/* <div className="card" style={{width: "18px;"}}> */ }
// style={{ width: "18rem"}}    

function MovieList( { movies, deleteMovieProp, } ) {


    return (
        <div className='row'>
            {
                movies.map((item, key) => (
                    <div className='col-lg-4' key={key} >
                        <div className="card mt-3"   >
                            <img src={item.imageURL} className="card-img-top" alt="test" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.overview}</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <button type="button" onClick={() => deleteMovieProp(item.id)} className="btn btn-outline-danger">Delete</button>
                                    <h2><span className='badge bg-warning text-dark' >{item.rating}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MovieList