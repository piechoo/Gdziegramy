import React,{useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "./Preferences.css"
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import SearchControl from "./SearchControl"
import axios from "axios";
import CourtInfo from "./CourtInfo";
import AuthService from "./AuthService";


export default function ShowCourts() {
    const [initialPosition, setInitialPosition] = useState([50.06128, 19.93784]);
    const [selectedPosition, setSelectedPosition] = useState([50.06128, 19.93784]);
    const [courts , setCourts] = useState([]);
    const [chosenCourt , setChosenCourt] = useState({
        sport:{name:"Nazwa sportu"},
        adress:{city:"Miasto",street:"Ulica",number:"Numer Ulicy"}
    });
    const Auth = new AuthService()


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setSelectedPosition([latitude, longitude]);

        });
        getCourts()
    }, []);

    const getCourts = () =>{
        //axios.get(`http://localhost:5000/courts/`)
        Auth.fetchGet(`http://localhost:5000/courts/`)
            .then(response => {
            setCourts(response.data)
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const onMarkerClick= (court)=>{
        setChosenCourt(court)
    }

    const renderMarkers = courts ?
            courts.map(court=>
                <Marker
                    key={court.CourtID}
                    position={court.adress.coordinates.coordinates}
                    interactive={true}
                    eventHandlers={{click: ()=>{onMarkerClick(court)}}}
                />
                ) : null

    const getSportCourt = (sport) =>{
        //axios.post(`http://localhost:5000/sportcourts/`,
        Auth.fetch(`http://localhost:5000/sportcourts/`,
            {
                sport:sport
            },
        )
            .then(response => {
                setCourts(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const prov = OpenStreetMapProvider();
    return(
        <div className="mapWrapper">
            <CourtInfo event={chosenCourt} onClick = {getSportCourt} ></CourtInfo>
            <MapContainer
                center={selectedPosition || initialPosition}
                zoom={13}
            >
                <SearchControl
                    provider={prov}
                    showMarker={false}
                    showPopup={false}
                    popupFormat={({ query, result }) => result.label}
                    maxMarkers={3}
                    retainZoomLevel={false}
                    animateZoom={true}
                    autoClose={true}
                    searchLabel={"Wyszukaj adres"}
                    keepResult={true}
                />
                {renderMarkers}
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </MapContainer>
        </div>
    )
}