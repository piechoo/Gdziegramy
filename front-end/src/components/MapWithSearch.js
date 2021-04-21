import React,{useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet'
import "./Preferences.css"
import Container from "./Container";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import SearchControl from "./SearchControl"


export default function MapWithSearch() {
    const [initialPosition, setInitialPosition] = useState([50.06128, 19.93784]);
    const [selectedPosition, setSelectedPosition] = useState([50.06128, 19.93784]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setSelectedPosition([latitude, longitude]);

        });
    }, []);



    const Markers = () => {

        const map = useMapEvents({
            click(e) {
                console.log(e)
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
            <Container cords={selectedPosition}></Container>
            <MapContainer
                center={selectedPosition || initialPosition}
                zoom={12}
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
                    searchLabel={"Enter address, please"}
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