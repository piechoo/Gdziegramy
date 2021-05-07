import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Login.css"
import {Link, useHistory} from "react-router-dom";

const Login =()=> {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [options, setOptions] = useState({isLogged:false});
    let history = useHistory();

    useEffect(()=>  {
        if(JSON.parse(sessionStorage.getItem('user'))) {
            const ops = JSON.parse(sessionStorage.getItem('user'))
            if(ops.isLogged) {
                history.push("/home")
            }
            setOptions(ops);
        }
    },[])

    const login = () => {
        console.log(options)
        if(options.isLogged)
            history.push("/home")
        axios.post(`http://localhost:5000/login/`,
            {
                username:name,
                password:password,
            },
        ).then(response => {
            console.log(response.data)
            const {isLogged,userID,username,error,level}=response.data
            if(isLogged){
                sessionStorage.setItem('user', JSON.stringify({username,userID,isLogged,error,level}));
                history.push("/home")
            }
            else {
                console.log(response.data.error)
                sessionStorage.setItem('user', JSON.stringify({username,userID,isLogged,error,level}));
                setOptions(JSON.parse(sessionStorage.getItem('user')));
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });

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