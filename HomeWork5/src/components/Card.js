import React, { useState } from 'react'

function Card(props) {

    const [isloading, setIsloading] = useState(true);

    const showLoading = () => {
        setIsloading(false)
    }

    return (
        <div>
            <div className="card w-100"  >
                {
                   isloading && "LOADING..." 
                }
                <img src={props.src} className="card-img-top" alt="..." onLoad={showLoading}/>

                    <div className="card-body">
                        <h5 className="card-title">{props.cardTitle}</h5>
                        <p className="card-text">{props.cardText}</p>
                    </div>
            </div>
        </div>
    );
};

export default Card;