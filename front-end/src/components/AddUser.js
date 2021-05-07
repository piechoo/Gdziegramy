import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import {addItemToSession} from "./frontFunctions";


const AddUser =(props)=> {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [options, setOptions] = useState({isLogged:false});
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let history = useHistory();


    useEffect(()=>  {
        addItemToSession({error: ""})
        if(JSON.parse(sessionStorage.getItem('user'))) {
            const ops = JSON.parse(sessionStorage.getItem('user'))
            if(ops.isLogged) {
                history.push("/home")
            }
            setOptions(ops);
        }
    },[])

    const addUser = () => {
        axios.post(`http://localhost:5000/adduser/`,
            {
                username:name,
                email:email,
                password:password,
            },
        ).then(response => {
            if(response.data.success){
                addItemToSession({error:"Dodano użytkownika"})
                history.push("/login")
            }
            else {
                addItemToSession({error:response.data.error})
                setError(response.data.error)
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const canSave = Boolean(name) && Boolean(password) && Boolean(email)
    return (
        <div>
            <div className="head">
            </div>
            <h1 className="text-center text-danger">{error}</h1>
            <div className="login-form">
                <form >
                    <h2 className="text-center">Zarejestruj się</h2>
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
                               type="text"
                               name="email"
                               value={ email }
                               onChange={event => setEmail(event.target.value )}
                               placeholder="Email "
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
                        <button type='button' className="btn btn-danger btn-block" disabled={!canSave} onClick={addUser}>Wyślij</button>
                    </div>
                    <p className="text-center"><Link to="/login" className="text-danger">Zaloguj się</Link></p>
                </form>
            </div>
        </div>
    )
}
export default AddUser