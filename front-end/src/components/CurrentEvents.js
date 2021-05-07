import React,{useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "./Preferences.css"
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import SearchControl from "./SearchControl"
import axios from "axios";
import EventInfo from "./EventInfo";


export default function CurrentEvents() {
    const [initialPosition, setInitialPosition] = useState([50.06128, 19.93784]);
    const [selectedPosition, setSelectedPosition] = useState([50.06128, 19.93784]);
    const [events , setEvents] = useState([]);
    const [courtEvents , setCourtEvents] = useState([{eventID: 0,
        name:"Nazwa wydarzenia",
        start:"Start wydarzenia",
        end:"Koniec wydarzenia",
        level:{levelName:"Poziom wydarzenia"}}]);
    const chosenEvent ={
        eventID: 0,
        name:"Nazwa wydarzenia",
        start:"Start wydarzenia",
        end:"Koniec wydarzenia",
        level:{levelName:"Poziom wydarzenia"}};
    const [chosenCourt , setChosenCourt] = useState({
        courtId:0,
        sport:{name:"Nazwa sportu"},
        adress:{city:"Miasto",street:"Ulica",number:"Numer Ulicy"}
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setSelectedPosition([latitude, longitude]);

        });
        getEvents()
    }, []);

    const getEvents = () =>{
        axios.get(`http://localhost:5000/currentevents/`)
            .then(response => {
            setEvents(response.data)
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const getSportEvents = (sport) =>{
        axios.post(`http://localhost:5000/currentsportevents/`,
            {
                sport:sport
            },
        )
            .then(response => {
                setEvents(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const getCourtEvents = (courtid) =>{
        axios.post(`http://localhost:5000/eventsfromcourt/`,
            {
                courtid:courtid
            },
        ).then(response => {
                console.log(response)
                setCourtEvents(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const onMarkerClick = (event)=>{
        console.log(event)
        setChosenCourt({
            courtId:event.court.CourtID,
            adress:event.court.adress,
            sport:event.sport
        })
        getCourtEvents(event.court.CourtID)

    }

    const renderMarkers = events ?
            events.map(event=>
                <Marker
                    key={event.EventID}
                    position={event.court.adress.coordinates.coordinates}
                    interactive={true}
                    eventHandlers={{click: ()=>{onMarkerClick(event)}}}
                />
                ) : null



    const prov = OpenStreetMapProvider();
    return(
        <div className="mapWrapper">
            <EventInfo event={chosenEvent} court={chosenCourt} courtEvents={courtEvents} onClick={getSportEvents}></EventInfo>
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