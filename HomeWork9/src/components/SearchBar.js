import React from 'react'
import { Link } from "react-router-dom";

function SearchBar({ searchMovieProp }) {


  const handleSubmit = (event) => {
    event.preventDefault();
  }


  return (
      <form onSubmit={handleSubmit}>
        <div className="form-row mb-3 mt-5">

          <div className="col-12 input-group">
            <input
              onChange={searchMovieProp}
              type="text"
              className="form-control"
              placeholder='Search a movie'
            />
            <Link to="/add"
              type='button'
              className='btn btn-md btn-danger'
              style={{ float: "right" }}
            >
              Add Movie
            </Link>
          </div>

        </div>
      </form>
  )
}

export default SearchBar