import React, {useEffect, useState} from 'react';

import "./Preferences.css"
import axios from "axios";
export default function CourtInfo(props) {

    //const [currentPos,setCurrentPos]=useState(null)
    const [sport,setSport]=useState(props.event.sport.name)
    const [adress, setAdress]=useState({
        city:props.event.adress.city,
        road:props.event.adress.street,
        house_number:props.event.adress.number
    })


    const createCourt = () =>{
        axios.post(`http://localhost:5000/addcourtfrommap/`,
            {
                city:adress.city,
                street:adress.road,
                number:adress.house_number,
                sport,
                cords:props.cords
            },
        ).then(response => {
            console.log(response)
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

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
                <form onSubmit={(e)=>{e.preventDefault();createCourt()}}>
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
                    {!props.side && !props.button? <button className="btn btn-danger btn-lg m-3">Utwórz wydarzenie !</button>:null}
                </form>
            </div>
        </div>
    );
}