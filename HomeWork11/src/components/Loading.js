import React from 'react';

function Loading() {
    return (
        <div className="text-center mt-5">
            <div className="spinner-border text-warning " role="status">
                <span className="ms-3">Loading</span>
            </div>
        </div>
    );
}

export default Loading;