import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogIn,clearError} from "../redux/slices/optionsSlice";

const Login =(props)=> {


    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);


    useEffect(()=>  {
        dispatch(clearError())
        if(options.isLogged)
            history.push("/home")
    },[options.isLogged])

    const login = () => {
        dispatch(fetchLogIn({name,password}))
        if(options.isLogged)
            history.push("/home")

        /*
        axios.post(`http://localhost:5000/login/`,
            {
                username:name,
                password:password,
            },
        ).then(response => {
            if(response.data.loggedin){
                history.push("/home")
            }
            else {
                console.log(response.data.error)
                setError(response.data.error)
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
*/
    }


    const canSave = Boolean(name)  && Boolean(password)
    return (
        <div>
            <div className="head">
            </div>
            <h1 className="text-center text-danger">{options.error}</h1>
            <div className="login-form">
                <form >
                    <h2 className="text-center">Zaloguj się</h2>
                    <div className="form-group">
                            <input className='form-control'
                                   type="text"
                                   name="username"
                                   value={ name }
                                   onChange={event => setName(event.target.value )}
                                   placeholder="Nazwa użytkownika "
                                   required
                            />
                    </div>
                    <div className="form-group">
                            <input className='form-control'
                                   type="password"
                                   name="password"
                                   value={ password }
                                   onChange={event => setPassword(event.target.value )}
                                   placeholder="Hasło"
                                   required
                            />
                    </div>
                    <div className="form-group mb-3">
                        <button type='button' className="btn btn-danger btn-block" disabled={!canSave} onClick={login}>Zaloguj</button>
                    </div>
                    <p className="text-center"><Link to="/adduser" className="text-danger">Utwórz nowe konto</Link></p>
                </form>
            </div>
        </div>
    )
}
export default Login