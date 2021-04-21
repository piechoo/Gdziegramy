import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogIn, fetchAddUser, setError, clearError} from "../redux/slices/optionsSlice";
import {handleFetchAddUser} from "../redux/sagas/handlers/options";

const AddUser =(props)=> {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState('');

    const [password, setPassword] = useState('');
    let history = useHistory();
    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);


    useEffect(()=>  {
        dispatch(clearError())
        if(options.isLogged)
            history.push("/home")
    },[])

    const addUser = () => {
        //dispatch(fetchAddUser({name,password}))
        axios.post(`http://localhost:5000/adduser/`,
            {
                username:name,
                email:email,
                password:password,
            },
        ).then(response => {
            console.log(response)
            if(response.data.success){
                history.push("/login")
            }
            else {
                console.log(response.data.error)
                dispatch(setError({error:response.data.error}))
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });

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


    const canSave = Boolean(name) && Boolean(password) && Boolean(email)
    return (
        <div>
            <div className="head">
            </div>
            <h1 className="text-center text-danger">{options.error}</h1>
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