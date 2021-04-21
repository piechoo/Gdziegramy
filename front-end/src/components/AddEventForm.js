import React, {useEffect, useState} from 'react';

import "./Preferences.css"
import CourtInfo from "./CourtInfo";
import { useSelector} from "react-redux";
import axios from "axios";

export default function AddEventForm(props) {

    const options = useSelector((state) => state.options);


    const [newEvent, setNewEvent]=useState({
        eventID: 0,
        name:"Nazwa wydarzenia",
        start:"Start wydarzenia",
        end:"Koniec wydarzenia",
        level:1
    })

    const [msg, setMsg] = useState("")
    const [error, setError] = useState(false)
    const [lvl, setLvl] = useState(1)



    useEffect(()=>{
console.log(newEvent.start)

    },[newEvent.start])

    const createNewEvent = () =>{
        if( props.court.adress.city!="Miasto" ) {
            axios.post(`http://localhost:5000/createnewevent/`,
                {
                    event: newEvent,
                    user: options.userID,
                    court: props.court
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
            setMsg("Najpierw wybierz boisko !")

        }
    }




    const info = (
        <div className=" ">
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <label >Nazwa wydarzenia:<br/></label>
                <input
                    className='form-control'
                    type="text"
                    placeholder={newEvent.name}
                    disabled={false}
                    onChange={event => setNewEvent(prevState => ({
                        ...prevState,
                        name: event.target.value
                    }))}
                />
                <label >Początek wydarzenia:<br/></label>
                <input
                    className='form-control'
                    type="datetime-local"
                    onChange={event => setNewEvent(prevState => ({
                        ...prevState,
                        start: event.target.value
                    }))}
                    value={newEvent.start}
                    disabled={false}
                />
                <label >Koniec wydarzenia:<br/></label>
                <input
                    className='form-control'
                    type="datetime-local"
                    onChange={event => setNewEvent(prevState => ({
                        ...prevState,
                        end: event.target.value
                    }))}
                    value={newEvent.end}
                    disabled={false}
                />

                <label>Poziom wydarzenia:<br/></label>
                <select className='form-control' value={newEvent.level} onChange={event => setNewEvent(prevState => ({
                    ...prevState,
                    level: event.target.value
                }))}>
                    <option name="Początkujący" value={1}> Początkujący</option>
                    <option name="Amator" value={2}>Amator</option>
                    <option name="Średnio-zaawansowany" value={3}>Średnio-zaawansowany</option>
                    <option name="Zaawansowny" value={4}>Zaawansowny</option>
                    <option name="Profesjonalista" value={5}>Profesjonalista</option>
                </select>

            </form>
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
                    <button className="btn btn-danger btn-block mt-3" onClick={()=>{createNewEvent()}}>Dodaj wydarzenie</button>
                </div>

            </div>
        </div>
    )
}