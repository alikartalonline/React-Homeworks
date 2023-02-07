import React from 'react';

function ErrorRedux({ message }) {
    return (
        <div className='text-center mt-4'>
           <span className='h5 fw-bold text-danger'> Error Message: </span> 
           <br/> 
           <span className='h4'>{message}</span>
        </div>
    );
}

export default ErrorRedux;