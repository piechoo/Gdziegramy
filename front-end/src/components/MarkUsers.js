import React, {useEffect, useState} from "react";
import "./Login.css"
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearError, fetchLogIn, setError} from "../redux/slices/optionsSlice";
import {fetchMyEvents} from "../redux/slices/eventsSlice";
import HomeTile from "./HomeTile";
import EventRow from "./EventRow";
import axios from "axios";

const MarkUsers =(props)=> {

    const [participants, setParticipants] = useState([]);
    const [showParts, setShowParticipants] = useState(false);
    const [levels, setLevels] = useState([]);
    const [users, setUsers] = useState([]);
    let history = useHistory();
    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);
    const myEvents = useSelector((state) => state.events);


    useEffect(()=>  {
        dispatch(clearError())
        dispatch(fetchMyEvents({userID:options.userID}))
    },[])

    const getParticipants = (eventID) =>{
        axios.post(`http://localhost:5000/getmyeventsparticipants/`,
            {
                event:eventID
            },
        ).then(response => {
            console.log(response)
            setParticipants(response.data.participants)
            setLevels(response.data.levels)
            setShowParticipants(true)
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const lvlNames = (number)=>{
        switch (number){
            case 1:
                return "Początkujący"
                break;
            case 2:
                return "Amator"
                break;
            case 3:
                return "Średnio-zaawansowany"
                break;
            case 4:
                return "Zaawansowany"
                break;
            case 5:
                return "Profesjonalista"
                break;
            default:
                return "Początkujący"
        }
    }

    const renderParticipants = () =>{
        return(
            <div className="log">
                <table id="participants">
                    <th> Nazwa Użytkownika</th>
                    <th> Obecna ocena</th>
                    <th> Oceń </th>
                    {participants.map( (part,index) =>
                        <tr>
                            <td>{part.user.Name} </td>
                            <td>{lvlNames(levels[index])} </td>
                            <td>

                                <input type="number" min="1" max="5" name={part.UserID} className="form-control"
                                       placeholder="Poziom" required="required"/>
                            </td>
                        </tr>
                    )}
                </table>
                <div className="form-group mb-3">
                    <button type='button' className="btn btn-danger btn-block"  onClick={()=>{}}>Oceń</button>
                    <button type='button' className="btn btn-danger btn-block"  onClick={()=>setShowParticipants(false)}>Wróć</button>
                </div>
            </div>
        )

    }

    let rendering = showParts ?
        renderParticipants() :
        <div className="log">
            <h2 className="text-center">Wydarzenia w których uczestniczyłeś: </h2>
                <table id="users">
                    <th> Nazwa wydarzenia</th>
                    <th> Adres</th>
                    <th> Czas rozpoczęcia</th>
                    <th> Sport</th>
                    <th> Więcej</th>
                    <tbody>
                    {myEvents.events.map( ev => <EventRow key={ev.EventID} name={ev.name} court={ev.court} startTime={ev.startTime} sport={ev.sport} EventID={ev.EventID} handler={getParticipants}/>)}
                    </tbody>
                </table>

        </div>



    return (
        <div className="users-table">
        {rendering}
        </div>
    )
}
export default MarkUsers