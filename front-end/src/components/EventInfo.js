import React, {useEffect, useState} from 'react';

import "./Preferences.css"
import axios from "axios";
import CourtInfo from "./CourtInfo";
import {useDispatch, useSelector} from "react-redux";
import {clearError} from "../redux/slices/optionsSlice";
import {fetchMyEvents} from "../redux/slices/eventsSlice";
export default function EventInfo(props) {


    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);


    const [event, setEvent]=useState({
        eventID:props.event.EventID,
        name:props.event.name,
        start:props.event.startTime,
        end:props.event.endTime,
        level:props.event.level.levelName
    })
    const [parts, setParts]=useState([])
    const [levels, setLevels] = useState([]);
    const [details, setDetails] = useState(false)
    const [msg, setMsg] = useState("")
    const [error, setError] = useState(false)

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


    useEffect(()=>{
        console.log(props.event)
        setEvent({
            eventID:props.event.EventID,
            name:props.event.name,
            start:props.event.startTime,
            end:props.event.endTime,
            level:props.event.level.levelName
        })
    },[props.event])

    const getParticipants = () =>{
        if( event.eventID !== 0) {
            axios.post(`http://localhost:5000/getmyeventsparticipants/`,
                {
                    event: event.eventID
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
        if( event.eventID ) {
            console.log(event.eventID)
            axios.post(`http://localhost:5000/becomeparticipant/`,
                {
                    event: event.eventID,
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
    const addParticipants = () => {
        getParticipants()
        setDetails(true)
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
                        value={event.start}
                        disabled={true}
                    />
                    <label >Koniec wydarzenia:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={event.end}
                        disabled={true}
                    />

                    <label>Poziom wydarzenia:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={event.level}
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
                    {parts.map( (part,index) =>
                        <tr>
                            <td>{part.user.Name} </td>
                            <td>{lvlNames(levels[index])} </td>
                        </tr>
                    )}
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
                <div className="court">
                    <CourtInfo event={props.court} side={true}></CourtInfo>
                </div>
                <div className="event">
                    {info}
                        <button className="btn btn-danger btn-block " onClick={()=>becomeParticipant()}>Weź udział </button>
                </div>

            </div>
        </div>
    )
}