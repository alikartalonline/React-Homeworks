import React, { useState } from 'react';
import Homepage from './Homepage';
import Alert from './Alert';



function PersonelToDo() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userKey")) || "");
    const [form, setForm] = useState("");
    const [alert, setAlert] = useState(null);


    // FORM
    const handleSubmit = (e) => {
        e.preventDefault()


        if (form === "" || form.length < 3) {
            setAlert("Alert")
            setTimeout(() => {
                setAlert(null)
            }, 2000)
            return false;
        }

        setUser(form);
        setForm("");
        localStorage.setItem("userKey", JSON.stringify(form));
    };

    // INPUT
    const onChangeInput = (e) => {
        setForm([e.target.value].toString());
    };


    return (
            <div className='container'>
                <div className='row'>
                    {
                        user === "" ?
                            <>
                                {/* CREATE USER FORM CONTAINER START */}
                                <div className={user === "" ? 'main-box container mt-5' : 'main-box container'}>

                                    <h1 className='col-12'>Create User</h1>

                                    <form className='row'
                                        onSubmit={handleSubmit}
                                    >
                                        <div className='form-floating col-10' >
                                            <input
                                            style={{ backgroundColor: "transparent" }}
                                                className="form-control task-div col-10 fs-5 mt-2 fw-bold"
                                                placeholder="Choose Your Username"
                                                id="floatingInput"
                                                name='user'
                                                value={form}
                                                onChange={onChangeInput}
                                                autoFocus
                                            >
                                            </input>
                                            <label htmlFor="floatingInput">Choose Your Username</label>
                                        </div>

                                        <div className='col-2'>
                                            <button
                                                type='submit'
                                                value="submit"
                                                className='btn btn-primary rounded-circle add'>
                                                Create
                                            </button>
                                        </div>
                                        {
                                            alert === "Alert" ? <Alert /> : null
                                        }
                                    </form>
                                </div>
                                {/* CREATE USER FORM CONTAINER FINISH */}
                            </>
                            : <Homepage user={user} setUser={setUser} />
                    }
                </div>
            </div>
    );
}

export default PersonelToDo;