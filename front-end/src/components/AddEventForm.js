import React, {useEffect, useState} from 'react';
import "./Preferences.css"
import CourtInfo from "./CourtInfo";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {addItemToSession} from "./frontFunctions";
import AuthService from "./AuthService";



export default function AddEventForm(props) {

    const Auth = new AuthService()
    const [msg, setMsg] = useState("")
    const [error, setError] = useState(false)
    let history = useHistory();
    const [options, setOptions] = useState({isLogged:false});
    const [newEvent, setNewEvent]=useState({
        eventID: 0,
        name:"Nazwa wydarzenia",
        start:"Start wydarzenia",
        end:"Koniec wydarzenia",
        level:1
    })

    useEffect(()=>  {
        if(JSON.parse(sessionStorage.getItem('user'))) {
            const ops = JSON.parse(sessionStorage.getItem('user'))
            if(!ops.isLogged) {
                addItemToSession({error: "Musisz się zalogować żeby widzieć tą stronę!"})
                history.push("/login")
            }
            setOptions(ops);
        }
        else
            history.push("/login")
    },[])

    const createNewEvent = () =>{
        if( props.court.adress.city!=="Miasto" && newEvent.start!=="Start wydarzenia" && newEvent.end!=="Koniec wydarzenia") {
            Auth.fetch(`http://localhost:5000/createnewevent/`,
                {
                    event: newEvent,
                    user: options.userID,
                    court: props.court
                },
            ).then(response => {
                setMsg(response.data.msg)
                setError(response.data.error)

            })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        else{
            setError(true)
            setMsg("Najpierw wprowadź poprawne dane !")

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
                    <CourtInfo event={props.court} side={true} onClick = {props.onChange}></CourtInfo>
                </div>
                <div className="event">
                    {info}
                    <button className="btn btn-danger btn-block mt-3" onClick={()=>{createNewEvent()}}>Dodaj wydarzenie</button>
                </div>
            </div>
        </div>
    )
}