import React from 'react';

function NewTodoLoading() {
    return (
        <div className="spinner-grow text-primary" style={{height:"60px", width:"60px"}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default NewTodoLoading;