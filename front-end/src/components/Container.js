import React, {useEffect, useState} from 'react';

import "./Preferences.css"
import "./Login.css"
import axios from "axios";
export default function Container(props) {

    //const [currentPos,setCurrentPos]=useState(null)
    const [miasto,setMiasto]=useState('')
    const [sport,setSport]=useState('')
    const [adress, setAdress]=useState({
        city:'',
        road:'',
        house_number:''
    })

    const getParticipants = () =>{
        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${props.cords[0]}&lon=${props.cords[1]}&format=json`
        ).then(response => {
            console.log(response.data.address)
            setAdress(response.data.address)
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(()=>{
        getParticipants()
    },[props.cords])
    return(
        <div className="content ">
            <form onSubmit={()=>{}}>
                <label >Miasto:<br/></label>
                <input
                    type="text"
                    onChange={event => setMiasto( event.target.value )}
                    value={adress.city}
                    disabled={true}
                />
                <br/>
                <label >Ulica:<br/></label>
                <input
                    type="text"
                    onChange={event => setMiasto( event.target.value )}
                    value={adress.road}
                    disabled={true}
                />
                <br/>
                <label >Numer:<br/></label>
                <input
                    type="text"
                    onChange={event => setMiasto( event.target.value )}
                    value={adress.house_number}
                    disabled={true}
                />
                <br/>
                <label>Koordynaty 1:<br/></label>
                <input
                    type="number"
                    value={props.cords[0]}
                    disabled={true}
                />
                <br/>
                <label>Koordynaty 2:<br/></label>
                <input
                    type="number"
                    value={props.cords[1]}
                    disabled={true}
                />
                <br/>
                <label>Wpisz sport:<br/></label>
                <select value={sport} onChange={event => setSport( event.target.value )}>
                    <option name="Piłka nożna"> Piłka nożna</option>
                    <option name="Koszykówka">Koszykówka</option>
                    <option name="Siatkówka">Siatkówka</option>
                    <option name="Tenis">Tenis</option>
                </select>
                <br/>
                <button className="buton big giga">Edytuj</button>
            </form>
            <button className="buton big giga"  onClick={() =>{}} >Anuluj</button>
        </div>
    );
}