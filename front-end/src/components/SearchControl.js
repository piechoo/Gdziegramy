import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import "react-leaflet-geosearch/lib/react-leaflet-geosearch.css";
import L from "leaflet";
const SearchControl = props => {
    const map = useMap();

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider: props.provider,
            ...props
        });

        map.addControl(searchControl);
        const containerDiv = searchControl.getContainer();
        L.DomEvent.disableClickPropagation(containerDiv);

        return () => map.removeControl(searchControl);

    }, [props]);

    return null;
};
export default SearchControl;
