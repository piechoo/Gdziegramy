import React, {useEffect, useState} from 'react';

import "./Preferences.css"
import axios from "axios";
import AuthService from "./AuthService";
export default function NewCourtForm(props) {

    const [miasto,setMiasto]=useState('')
    const [msg,setMsg]=useState('')
    const [error,setError]=useState(false)
    const [sport,setSport]=useState(1)
    const [adress, setAdress]=useState({
        city:'',
        road:'',
        house_number:''
    })
    const Auth = new AuthService()


    const getAdress = () =>{
        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${props.cords[0]}&lon=${props.cords[1]}&format=json`
    ).then(response => {
            setAdress(response.data.address)
            if(response.data.address.village){
                setAdress({city:response.data.address.village})
            }
            else if(response.data.address.town){
                setAdress({city:response.data.address.town})
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }



    const createCourt = () =>{
        Auth.fetch(`http://localhost:5000/addcourtfrommap/`,
            {
                city:adress.city,
                street:adress.road,
                number:adress.house_number,
                sport,
                cords:props.cords
            },
        ).then(response => {
            setMsg(response.data.msg)
            setError(response.data.error)

        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(()=>{
        console.log(props.cords)
        if(props.cords[0]!==0 && props.cords[1]!==0)
        getAdress()
    },[props.cords])


    return(
        <div className="content ">
            <span className={error? "error msg":"msg"}>{msg}</span>
            <div className=" login-form">
                <form onSubmit={(e)=>{e.preventDefault();createCourt()}}>
                    <label >Miasto:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        onChange={event => setMiasto( event.target.value )}
                        value={adress.city}
                        disabled={true}
                    />
                    <label >Ulica:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        onChange={event => setMiasto( event.target.value )}
                        value={adress.road}
                        disabled={true}
                    />
                    <label >Numer:<br/></label>
                    <input
                        className='form-control'
                        type="text"
                        onChange={event => setMiasto( event.target.value )}
                        value={adress.house_number}
                        disabled={true}
                    />

                    <label>Wybierz sport:<br/></label>
                    <select className='form-control' value={sport} onChange={event => setSport( event.target.value )}>
                        <option name="Piłka nożna" value={1}> Piłka nożna</option>
                        <option name="Koszykówka" value={2}>Koszykówka</option>
                        <option name="Siatkówka" value={3}>Siatkówka</option>
                        <option name="Tenis" value={4}>Tenis</option>
                    </select>
                    <button className="btn btn-danger btn-lg m-3">Zapisz boisko !</button>
                </form>
            </div>
        </div>
    );
}