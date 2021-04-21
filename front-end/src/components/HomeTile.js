import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogIn} from "../redux/slices/optionsSlice";

const HomeTile =(props)=> {


    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);


    useEffect(()=>  {
        if(options.isLogged)
            history.push("/home")
    },)

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
        <div className="col">
            <div className="card h-100">
                <img src={props.img}
                    className="card-img-top" alt="..."/>
                    <div className="card-body text-center">
                        <Link to={props.href} className="btn btn-danger btn-lg mb-3">
                            <h5 className="card-title">{props.inside}</h5>
                        </Link>
                    </div>
            </div>
        </div>
    )
}
export default HomeTile