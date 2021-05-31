import React from "react";
import "./Login.css"

const EventRow =(props)=> {

    return (
        <tr>
            <td>{props.name} </td>
            <td>{props.court.adress.city} {props.court.adress.street} {props.court.adress.number}</td>
            <td>{props.startTime}</td>
            <td>{props.sport.name}</td>
            <td>
                <button onClick={()=>props.handler(props.EventID)} className="btn btn-sm btn-danger" name="EventID" >Uczestnicy
                </button>
            </td>
        </tr>

    )
}
export default EventRow