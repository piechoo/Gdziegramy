import React,{useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker,useMapEvents } from 'react-leaflet'
import "./Preferences.css"
import NewCourtForm from "./NewCourtForm";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import SearchControl from "./SearchControl"


export default function NewCourt() {
    const [selectedPosition, setSelectedPosition] = useState([50.06128, 19.93784]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setSelectedPosition([latitude, longitude]);
        });
    }, []);

    const Markers = () => {
         useMapEvents({
            click(e) {
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })
        return (
            selectedPosition ?
                <Marker
                    key={selectedPosition[0]}
                    position={selectedPosition}
                    interactive={false}
                />
                : null
        )
    }


    const prov = OpenStreetMapProvider();
    return(
        <div className="mapWrapper">
            <NewCourtForm cords={selectedPosition}></NewCourtForm>
            <MapContainer
                center={selectedPosition}
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
                <Markers />
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </MapContainer>
        </div>
    )
}