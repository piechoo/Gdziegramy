import React, {useEffect, useState} from "react";
import "./Login.css"
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogIn, setError} from "../redux/slices/optionsSlice";
import HomeTile from "./HomeTile";

const EventRow =(props)=> {


    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);




    return (
        <tr>
            <td>{props.name} </td>
            <td>{props.court.adress.city} {props.court.adress.street} {props.court.adress.number}</td>
            <td>{props.startTime}</td>
            <td>{props.sport.name}</td>
            <td>
                <button onClick={()=>props.handler(props.EventID)} className="btn btn-sm btn-danger" name="EventID" >Szczegóły
                </button>
            </td>
        </tr>

    )
}
export default EventRow