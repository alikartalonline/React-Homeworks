import React from 'react'
import { Link } from 'react-router-dom';


function MovieList( { movies, deleteMovieProp, } ) {

    const truncatOverview = (string, maxLength) => {
        if (!string) return null;
        if (string.length <= maxLength) return string;
        return `${string.slice(0, maxLength)}...`;
    }


    return (
        <div className='row'>
            {
                movies.map((item, key) => (
                    <div className='col-lg-4' key={key} >
                        <div className="card mt-3"   >
                            <img src={item.imageURL} className="card-img-top" alt="test" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{truncatOverview(item.overview, 100)}</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <button type="button" onClick={() => deleteMovieProp(item.id)} className="btn btn-outline-danger">Delete</button>

                                    <Link to={`edit/${item.id}`} type="button" className='btn btn-outline-primary'>
                                        Edit
                                    </Link>

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