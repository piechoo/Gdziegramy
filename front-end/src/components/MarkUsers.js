import React, {useEffect, useState} from "react";
import "./Login.css"
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMyEvents} from "../redux/slices/eventsSlice";
import EventRow from "./EventRow";
import axios from "axios";

const MarkUsers =(props)=> {

    const [participants, setParticipants] = useState([]);
    const [showParts, setShowParticipants] = useState(false);
    const [levels, setLevels] = useState([]);
    const [options, setOptions] = useState({isLogged:false});
    let history = useHistory();
    const dispatch = useDispatch();
    const myEvents = useSelector((state) => state.events);

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
            dispatch(fetchMyEvents({userID:ops.userID}))
        }
        else
            history.push("/login")

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
                    <th> Twoja ocena </th>
                    {participants.map( (part,index) =>
                        <tr>
                            <td>{part.user.Name} </td>
                            <td>{lvlNames(levels[index])} </td>
                            <td>
                                <select name="cars" className="form-control" value={levels[index]}>
                                    <option name="Początkujący" value={1}> (1) Początkujący</option>
                                    <option name="Amator" value={2}> (2) Amator</option>
                                    <option name="Średnio-zaawansowany" value={3}> (3) Średnio-zaawansowany</option>
                                    <option name="Zaawansowny" value={4}> (4) Zaawansowny</option>
                                    <option name="Profesjonalista" value={5}> (5) Profesjonalista</option>
                                </select>
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