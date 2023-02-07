import React from 'react';

function EmptyTodoList() {
    return (
        <div className='text-center mt-4'>
            <button className="btn btn-warning" type="button" style={{opacity:"70%"}} disabled>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                <span className='ms-3 fw-bold'> Empty ... </span>
            </button>
        </div>
    )
}

export default EmptyTodoList;