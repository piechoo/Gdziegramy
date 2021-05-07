import React, {useEffect, useState} from "react";
import "./Login.css"
import { useHistory } from "react-router-dom";
import EventRow from "./EventRow";
import axios from "axios";
import {lvlNames, addItemToSession} from "./frontFunctions";

const MyEvents =()=> {

    const [participants, setParticipants] = useState([]);
    const [showParts, setShowParticipants] = useState(false);
    const [levels, setLevels] = useState([]);
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(0);
    let history = useHistory();
    const [options, setOptions] = useState({isLogged:false});


    useEffect(()=>  {
        if(JSON.parse(sessionStorage.getItem('user'))) {
            const ops = JSON.parse(sessionStorage.getItem('user'))
            if(!ops.isLogged) {
                addItemToSession({error: "Musisz się zalogować żeby widzieć tą stronę!"})
                history.push("/login")
            }
            setOptions(ops);
            getCreatedEvents(ops.userID)
        }
        else
            history.push("/login")

    },[])

    const getCreatedEvents = (userid) =>{
        axios.post(`http://localhost:5000/createdevents/`,
            {
                usrID:userid
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
                event:eventID,
                userid:options.userID
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

    const renderEvents = ()=>{
        return(<div className="log">
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

        </div>)
    }

    let rendering = showParts ?
        renderParticipants() :
        renderEvents()



    return (
        <div className="users-table">
        {rendering}
        </div>
    )
}
export default MyEvents