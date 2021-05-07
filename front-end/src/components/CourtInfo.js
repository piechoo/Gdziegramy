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
        setSport(props.event.sport.name)

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
                    <input
                        className='form-control'
                        type="text"
                        value={sport}
                        disabled={true}
                    />
                </form>
            </div>
        </div>
    );
}