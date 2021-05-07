import React, {useEffect, useState} from 'react';

import "./Preferences.css"
import axios from "axios";
import CourtInfo from "./CourtInfo";
import {useHistory} from "react-router-dom";
import {addItemToSession,lvlNames} from "./frontFunctions";

export default function EventInfo(props) {

    const [options, setOptions] = useState({isLogged:false});
    const [event, setEvent]=useState({eventID: 0,
        name:"Nazwa wydarzenia",
        startTime:"Start wydarzenia",
        endTime:"Koniec wydarzenia",
        level:{levelName:"Poziom wydarzenia"}})
    const [parts, setParts]=useState([])
    const [levels, setLevels] = useState([]);
    const [courtEvents, setCourtEvents] = useState([]);
    const [details, setDetails] = useState(false)
    const [msg, setMsg] = useState("")
    const [error, setError] = useState(false)
    const [actualEvent, setActualEvent] = useState(0)
    const [numberOfEvents, setNumberOfEvents] = useState(0)
    let history = useHistory();

    useEffect(()=>{
        if(JSON.parse(sessionStorage.getItem('user'))) {
            const ops = JSON.parse(sessionStorage.getItem('user'))
            if(!ops.isLogged) {
                addItemToSession({error: "Musisz się zalogować żeby widzieć tą stronę!"})
                history.push("/login")
            }
            setOptions(ops);
            let actual = props.courtEvents
            actual.sort(compare);
            setCourtEvents(actual)
            setNumberOfEvents(props.courtEvents.length)
            setEvent(props.courtEvents[0])
        }
        else
            history.push("/login")
    },[props.courtEvents])

    const getParticipants = () =>{
        if( event.EventID !== 0) {
            axios.post(`http://localhost:5000/getmyeventsparticipants/`,
                {
                    event: event.EventID
                },
            ).then(response => {
                console.log(response)
                setParts(response.data.participants)
                setLevels(response.data.levels)
                setDetails(true)

            })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }

    const becomeParticipant = () =>{
        if( event.EventID ) {
            console.log(event.EventID)
            axios.post(`http://localhost:5000/becomeparticipant/`,
                {
                    event: event.EventID,
                    userID: options.userID
                },
            ).then(response => {
                console.log(response)
                setMsg(response.data.msg)
                setError(response.data.error)

            })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        else{
            setError(true)
            setMsg("Najpierw wybierz wydarzenie !")
            console.log("siema")
        }
    }

    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const dateA = a.startTime.toUpperCase();
        const dateB = b.startTime.toUpperCase();
        let comparison = 0;
        if (dateA > dateB) {
            comparison = 1;
        } else if (dateA < dateB) {
            comparison = -1;
        }
        return comparison;
    }

    const addParticipants = () => {
        getParticipants()
        setDetails(true)
    }

    const nextEvent = () => {
        let newValue = actualEvent + 1;
        setEvent(courtEvents[newValue])
        setActualEvent(newValue)
        setDetails(false)
    }
    const prevEvent = () => {
        let newValue = actualEvent - 1;
        setEvent(courtEvents[newValue])
        setActualEvent(newValue)
        setDetails(false)
    }

    const info = !details ?(
            <div className=" ">
                <form onSubmit={(e)=>{e.preventDefault();addParticipants()}}>
                    <label >Nazwa wydarzenia:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={event.name}
                        disabled={true}
                    />
                    <label >Początek wydarzenia:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={event.startTime}
                        disabled={true}
                    />
                    <label >Koniec wydarzenia:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={event.endTime}
                        disabled={true}
                    />

                    <label>Poziom wydarzenia:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={event.level.levelName}
                        disabled={true}
                    />
                    <button className="btn btn-danger btn-block mt-3 mb-3">Pokaż uczestników </button>
                </form>
            </div>

    ) : (
            <div className="">
                <table id="participants" className="mt-3">
                    <th> Nazwa Użytkownika</th>
                    <th> Obecny poziom</th>
                    <tbody>
                    {parts.map( (part,index) =>
                        <tr>
                            <td>{part.user.Name} </td>
                            <td>{lvlNames(levels[index])} </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="form-group mb-3">
                    <button type='button' className="btn btn-danger btn-block"  onClick={()=>setDetails(false)}>Wróć</button>
                </div>
            </div>

    )

    return (
        <div className="content">
            <span className={error? "error msg":"msg"}>{msg}</span>
            <div className="event-form">
                <div className="arrows">
                    <button className="btn btn-danger  " disabled={0===actualEvent} onClick={()=>prevEvent()}>Poprzednie wydarzenie </button>
                    <button className="btn btn-danger  " disabled={actualEvent===(numberOfEvents-1)} onClick={()=>nextEvent()}>Następne wydarzenie</button>
                </div>
                <div className="court">
                    <CourtInfo event={props.court} side={true} onClick={props.onClick}></CourtInfo>
                </div>
                <div className="event">
                    {info}
                        <button className="btn btn-danger btn-block " onClick={()=>becomeParticipant()}>Weź udział </button>
                </div>

            </div>
        </div>
    )
}