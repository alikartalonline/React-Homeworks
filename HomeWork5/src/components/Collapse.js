import React, { useState } from 'react'


// Collapse:
// props = href = "" 
// children = <Card />

function Collapse(props) {

    const [show, setShow] = useState(false);

    const showMore = () => {
        setShow(!show)
    }

    return (
        <div>
            <button
                style={{ marginTop: "25%" }}
                className="btn btn-primary w-100"
                onClick={showMore}
            >

                {props.children.props.cardTitle}

            </button>

            {
                show && (
                    <div className="collapse show">
                        {props.children}
                    </div>
                )
            }

        </div>
    );
};

export default Collapse;