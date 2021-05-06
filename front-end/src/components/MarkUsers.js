import React, {useEffect, useState} from "react";
import "./Login.css"
import { useHistory } from "react-router-dom";
import EventRow from "./EventRow";
import axios from "axios";

const MarkUsers =(props)=> {

    const [participants, setParticipants] = useState([]);
    const [message, setMessage] = useState('');
    const [events, setEvents] = useState([]);
    const [showParts, setShowParticipants] = useState(false);
    const [levels, setLevels] = useState([]);
    const [myLevels, setMyLevels] = useState([]);
    const [options, setOptions] = useState({isLogged:false});
    let history = useHistory();

    const addItemToSession = (data) => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        Object.assign(user,data)
        sessionStorage.setItem('user', JSON.stringify(user))
    }

    useEffect(()=>{
        setMessage("")
        setMyLevels([])
    },[showParts])

    useEffect(()=>  {
        if(JSON.parse(sessionStorage.getItem('user'))) {
            const ops = JSON.parse(sessionStorage.getItem('user'))
            if(!ops.isLogged) {
                addItemToSession({error: "Musisz się zalogować żeby widzieć tą stronę!"})
                history.push("/login")
            }
            setOptions(ops);
            //dispatch(fetchMyEvents({userID:ops.userID}))
            getMyEvents(ops.userID)
        }
        else
            history.push("/login")

    },[])

    const getMyEvents = (userid) =>{
        axios.post(`http://localhost:5000/getmyevents/`,
            {
                userid:userid
            },
        ).then(response => {
            console.log(response)
            setEvents(response.data)

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
    const getCurrentMark = (userid)=>{
        for (let i=0; i<myLevels.length; i++ ) {
            if(myLevels[i].userid === userid){
                return myLevels[i].mark;
            }
        }
        return 1;
    }
    const markParticipants =  () =>{
        if(myLevels.length>0) {
            console.log(myLevels)
            axios.post(`http://localhost:5000/markparticipants/`,
                {
                    marks: myLevels,
                    userid: options.userID
                },
            ).then(response => {
                console.log(response)
                setMessage(response.data.msg)
            })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        else {
            setMessage("Najpierw dokonaj oceny !")
        }

    }
    const markBegiiners  = async ()=>{
        const marks = myLevels;
        let isMarked = false;
        for(let x=0; x<participants.length; x++){
            for(let i=0;i<myLevels.length;i++){
                if(participants[x].UserID === myLevels[i].userid) {
                    isMarked = true;
                    break;
                }
            }
            if(!isMarked){
                marks.unshift({userid:participants[x].UserID, rating:1})
            }
            isMarked=false;
        }
        setMyLevels(marks)
    }

    const addMark = (userid, rating)=>{
        let marks = myLevels;
        for (let i=0; i<myLevels.length; i++ ) {
            if(myLevels[i].userid === userid){
                marks[i] = {userid:userid, rating:rating}
                setMyLevels(marks)
                return null;
            }
        }
        marks.unshift({userid:userid, rating:rating})
        setMyLevels(marks)
        return null;
    }

    const renderParticipants = () =>{
        return(
            <div className="log">
                <h1 className="text-center">{message}</h1>
                <table id="participants">
                    <th> Nazwa Użytkownika</th>
                    <th> Obecna ocena</th>
                    <th> Twoja ocena </th>
                    {participants.map( (part,index) =>
                        <tr>
                            <td>{part.user.Name} </td>
                            <td>{lvlNames(levels[index])} </td>
                            <td>
                                <select name="marks" className="form-control" onChange={event => addMark(part.UserID, event.target.value )}>
                                    <option disabled selected hidden value={-1}> Ocena</option>
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
                    <button type='button' className="btn btn-danger btn-block"  onClick={()=>{markParticipants()}}>Oceń</button>
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
                    {events ? events.map( ev => <EventRow key={ev.EventID} name={ev.name} court={ev.court} startTime={ev.startTime} sport={ev.sport} EventID={ev.EventID} handler={getParticipants}/>):null}
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