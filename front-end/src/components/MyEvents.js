import React, {useEffect, useState} from "react";
import "./Login.css"
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearError, fetchLogIn, setError} from "../redux/slices/optionsSlice";
import {fetchMyEvents} from "../redux/slices/eventsSlice";
import HomeTile from "./HomeTile";
import EventRow from "./EventRow";
import axios from "axios";

const MyEvents =(props)=> {

    const [participants, setParticipants] = useState([]);
    const [showParts, setShowParticipants] = useState(false);
    const [levels, setLevels] = useState([]);
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(0);
    let history = useHistory();
    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);
    const myEvents = useSelector((state) => state.events);


    useEffect(()=>  {
        getCreatedEvents()
    },[])

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
    const getCreatedEvents = () =>{
        axios.post(`http://localhost:5000/createdevents/`,
            {
                usrID:options.userID
            },
        ).then(response => {
            console.log(response)
            setEvents(response.data.events)

        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
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
            setCurrentEvent(eventID)
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const kickParticipant = (eventID,userID) =>{
        console.log(userID)
        axios.post(`http://localhost:5000/kickplayer/`,
            {
                event:eventID,
                user:userID
            },
        ).then(response => {
            console.log(response)
            getParticipants(eventID)
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const renderParticipants = () =>{
        return(
            <div className="log">
                <table id="participants">
                    <th> Nazwa Użytkownika</th>
                    <th> Poziom</th>
                    <th> Opcje </th>
                    {participants.map( (part,index) =>
                        <tr>
                            <td>{part.user.Name} </td>
                            <td>{lvlNames(levels[index])} </td>
                            <td>
                                <button type='button' className="btn btn-danger btn-block"  onClick={()=>{kickParticipant(currentEvent,part.UserID)}}>Wyrzuć</button>
                            </td>
                        </tr>
                    )}
                </table>
                <div className="form-group mb-3">
                    <button type='button' className="btn btn-danger btn-block mt-3"  onClick={()=>setShowParticipants(false)}>Wróć</button>
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
                    {events.map( ev => <EventRow key={ev.EventID} name={ev.name} court={ev.court} startTime={ev.startTime} sport={ev.sport} EventID={ev.EventID} handler={getParticipants} />)}
                    </tbody>
                </table>

        </div>



    return (
        <div className="users-table">
        {rendering}
        </div>
    )
}
export default MyEvents