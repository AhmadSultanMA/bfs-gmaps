import React, { useState, useCallback, useRef } from "react";
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    height: "400px",
    width: "100%",
};
const center = {
    lat: -7.5695177,
    lng: 110.8250266,
};

const options = {
    mapTypeControl: false,
};

function MapComponent({ onCoordinatesChange }) {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [place, setPlace] = useState(null);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const autocompleteRef = useRef(null);

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    const onMapClick = useCallback(
        (event) => {
            const location = event.latLng;
            const lat = location.lat();
            const lng = location.lng();

            setMarker({
                position: location,
            });

            setInfoWindowOpen(true);

            if (onCoordinatesChange) {
                onCoordinatesChange(lat, lng);
            }
        },
        [onCoordinatesChange]
    );

    const onPlaceChanged = useCallback(() => {
        const place = autocompleteRef.current.getPlace();
        if (!place.geometry || !place.geometry.location) {
            alert(`No details available for input: '${place.name}'`);
            return;
        }

        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        setMarker({
            position: location,
            displayName: place.name,
            formattedAddress: place.formatted_address,
        });

        setPlace(place);
        setInfoWindowOpen(true);

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(location);
            map.setZoom(17);
        }

        if (onCoordinatesChange) {
            onCoordinatesChange(lat, lng);
        }
    }, [map, onCoordinatesChange]);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDBEXtTGUC4HiyflEfeqo-74WdAUJLT1E0"
            libraries={libraries}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
                options={options}
                onLoad={onLoad}
                onClick={onMapClick}
                id="map"
            >
                <div
                    className="pac-card"
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: "10",
                        backgroundColor: "#fff",
                        padding: "10px",
                        borderRadius: "2px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    }}
                >
                    <div>
                        <Autocomplete
                            className="w-[300px]"
                            onLoad={(autocomplete) =>
                                (autocompleteRef.current = autocomplete)
                            }
                            onPlaceChanged={onPlaceChanged}
                        >
                            <input
                                id="place-picker"
                                type="text"
                                placeholder="Enter a location"
                                style={{
                                    boxSizing: `border-box`,
                                    padding: `0.5rem 1rem 1rem`,
                                }}
                                className="w-full"
                            />
                        </Autocomplete>
                    </div>
                </div>
                {marker && <Marker position={marker.position}></Marker>}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapComponent;
