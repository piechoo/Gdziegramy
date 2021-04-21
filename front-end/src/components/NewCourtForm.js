import React, {useEffect, useState} from 'react';

import "./Preferences.css"
import axios from "axios";
export default function NewCourtForm(props) {

    //const [currentPos,setCurrentPos]=useState(null)
    const [miasto,setMiasto]=useState('')
    const [sport,setSport]=useState(1)
    const [adress, setAdress]=useState({
        city:'',
        road:'',
        house_number:''
    })

    const getAdress = () =>{
        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${props.cords[0]}&lon=${props.cords[1]}&format=json`
        ).then(response => {
            console.log(response.data.address)
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
            window.alert("Utworzono nowe boisko !")
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(()=>{
        getAdress()
    },[props.cords])


    return(
        <div className="content ">
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