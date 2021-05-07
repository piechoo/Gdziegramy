import React, {useEffect, useState} from 'react';
import "./Preferences.css"

export default function CourtInfo(props) {

    const [sport,setSport]=useState(props.event.sport.name)
    const [adress, setAdress]=useState({
        city:props.event.adress.city,
        road:props.event.adress.street,
        house_number:props.event.adress.number
    })


    useEffect(()=>{
        console.log(props.event)
        setAdress({
            city:props.event.adress.city,
            road:props.event.adress.street,
            house_number:props.event.adress.number
        })
        setSport(props.event.sport.SportID)

    },[props.event])


    return(
        <div className={!props.side ? "content":""}>
            <div className={!props.side ? "login-form":"court-form"}>
                <form >
                    <label >Miasto:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={adress.city}
                        disabled={true}
                    />
                    <label >Ulica:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={adress.road}
                        disabled={true}
                    />
                    <label >Numer:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        value={adress.house_number}
                        disabled={true}
                    />
                    <label>Sport:<br/></label>
                    <select className='form-control' value={sport} disabled={!props.onClick ?true:false} onChange={event => {props.onClick(event.target.value); setSport(event.target.value) }}>
                        <option name="Piłka nożna" value={1}> Piłka nożna</option>
                        <option name="Koszykówka" value={2}>Koszykówka</option>
                        <option name="Siatkówka" value={3}>Siatkówka</option>
                        <option name="Tenis" value={4}>Tenis</option>
                    </select>
                </form>
            </div>
        </div>
    );
}