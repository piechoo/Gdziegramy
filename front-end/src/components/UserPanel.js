import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Login.css"
import {Link, useHistory} from "react-router-dom";



const UserPanel =(props)=> {

    const [message, setMessage] = useState("Informacje o koncie");
    const [info, setInfo] = useState(true);
    const [email, setEmail] = useState(false);
    const [destroy, setDestroy] = useState(false);
    const [options, setOptions] = useState({isLogged:false, level:{level:0,name:"error"}});
    const [password, setPassword] = useState(false);
    const [actPassword, setActPassword] = useState('');
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [newEmail, setNewEmail] = useState('');
    let history = useHistory();


    const addItemToSession = (data) => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        Object.assign(user,data)
        sessionStorage.setItem('user', JSON.stringify(user))
    }

    useEffect(()=>  {
        if(JSON.parse(sessionStorage.getItem('user'))) {
            const ops = JSON.parse(sessionStorage.getItem('user'))
            if(!ops.isLogged) {
                addItemToSession({error: "Musisz się zalogować żeby widzieć tą stronę!"})
                history.push("/login")
            }
            setOptions(ops);
        }
        else
            history.push("/login")
        //if(!options.isLogged)
            //
    },[])

    const showInfo= ()=>{
        setEmail(false)
        setPassword(false)
        setDestroy(false)
        setInfo(true)
        setMessage("Informacje o koncie")
    }
    const showChangePassword= ()=>{
        setEmail(false)
        setPassword(true)
        setDestroy(false)
        setInfo(false)
        setMessage("Zmiana hasła")
    }
    const showChangeEmail= ()=>{
        setEmail(true)
        setPassword(false)
        setDestroy(false)
        setInfo(false)
        setMessage("Zmiana email")
    }
    const showDestroyAccount= ()=>{
        setEmail(false)
        setPassword(false)
        setDestroy(true)
        setInfo(false)
        setMessage("Usuwanie konta")
    }

    const handleDestroy = () =>{
        axios.post(`http://localhost:5000/destroyaccount/`,
            {
                username:options.username,
                userid:options.userID,
            },
        ).then(response => {
            if(response.data.success){
                addItemToSession({error:"Usunięto konto"})
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

    const handleNewPassword = () => {
        if (newPassword !== newPassword2) {
            addItemToSession({error: "Podane hasła nie są takie same!"})
            setError("Podane hasła nie są takie same!")
        } else {
            axios.post(`http://localhost:5000/ispasswordcorrect/`,
                {
                    password: actPassword,
                    userid: options.userID,
                },
            ).then(response => {
                if (response.data.success) {
                    axios.post(`http://localhost:5000/changepassword/`,
                        {
                            password: newPassword,
                            userid: options.userID,
                        },
                    ).then(response => {
                        if (response.data.success) {
                            addItemToSession({error: "Zmieniono hasło"})
                            setError("Zmieniono hasło")
                        } else {
                            addItemToSession({error: response.data.error})
                            setError(response.data.error)
                        }
                    })
                        .catch(error => {
                            console.error('There was an error!', error);
                        });

                } else {
                    addItemToSession({error: response.data.error})
                    setError(response.data.error)
                }
            })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }


    const handleNewEmail = () => {

        axios.post(`http://localhost:5000/ispasswordcorrect/`,
            {
                password: actPassword,
                userid: options.userID,
            },
        ).then(response => {
            if (response.data.success) {
                axios.post(`http://localhost:5000/changeemail/`,
                    {
                        email: newEmail,
                        userid: options.userID,
                    },
                ).then(response => {
                    if (response.data.success) {
                        addItemToSession({error: "Zmieniono email"})
                        setError("Zmieniono email")
                    } else {
                        addItemToSession({error: response.data.error})
                        setError(response.data.error)
                    }
                }).catch(error => {
                    console.error('There was an error!', error);
                });
            } else {
                addItemToSession({error: response.data.error})
                setError(response.data.error)
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });




    }



    const informations = <div className="information">
        <p>Nazwa uzytkownika: {options.username}</p>
        <p>Poziom uzytkownika: ({options.level.level}){options.level.name}</p>
    </div>

    const changePassword = <div className="information">
        <form >
            <div className="form-group">
                <input className='form-control'
                       type="password"
                       name="oldpass"
                       onChange={event => setActPassword(event.target.value )}
                       placeholder="Stare hasło"
                       required
                />
            </div>
            <div className="form-group">
                <input className='form-control'
                       type="password"
                       name="newpass"
                       onChange={event => setNewPassword(event.target.value )}
                       placeholder="Nowe hasło "
                       required
                />
            </div>
            <div className="form-group">
                <input className='form-control'
                       type="password"
                       name="newpass2"
                       onChange={event => setNewPassword2(event.target.value )}
                       placeholder="Powtórz nowe hasło"
                       required
                />
            </div>
            <div className="form-group mb-3 text-center">
                <button type='button' className="btn btn-danger "  onClick={handleNewPassword}>Zmień</button>
            </div>

        </form>
    </div>

    const changeEmail = <div className="information">
        <form >
            <div className="form-group">
                <input className='form-control'
                       type="text"
                       name="newmail"
                       onChange={event => setNewEmail(event.target.value )}
                       placeholder="Nowy email"
                       required
                />
            </div>
            <div className="form-group">
                <input className='form-control'
                       type="text"
                       name="password"
                       onChange={event => setActPassword(event.target.value )}
                       placeholder="Hasło "
                       required
                />
            </div>
            <div className="form-group mb-3 text-center">
                <button type='button' className="btn btn-danger "  onClick={handleNewEmail}>Zmień</button>
            </div>
        </form>
    </div>

    const destroyAccount = <div className="information">
        <form >
            <h2 className="text-center text-danger"> Uwaga!<br/> Tej operacji nie da się odwrócić. Czy chcesz kontynuować ?</h2>
            <div className="form-group mb-3 text-center">
                <button type='button' className="btn btn-danger "  onClick={handleDestroy}>Usuń konto</button>
            </div>
        </form>
    </div>


    const showInside = () =>{
        if(info) return informations
        else if(password) return changePassword
        else if(email) return changeEmail
        else if(destroy) return destroyAccount
        else return informations
    }

    return (
        <div>
            <div className="head">
            </div>
            <h1 className="text-center text-danger">{error}</h1>
            <div className="userpanel">
                    <h2 className="text-center title">{message}</h2>
                    <div className="options">
                        <div className="form-group mb-3 pr-3">
                            <button type='button' className="btn btn-danger btn-block"  onClick={showInfo}>Infgormacje o koncie</button>
                            <button type='button' className="btn btn-danger btn-block"  onClick={showChangePassword}>Zmień hasło</button>
                            <button type='button' className="btn btn-danger btn-block"  onClick={showChangeEmail}>Zmień email</button>
                            <button type='button' className="btn btn-danger btn-block"  onClick={showDestroyAccount}>Usuń konto</button>
                        </div>
                    </div>
                {showInside()}

            </div>
        </div>
    )
}
export default UserPanel