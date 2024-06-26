import React, { useEffect } from "react";

function MapComponent({ onCoordinatesChange }) {
    useEffect(() => {
        const polyfillScript = document.createElement("script");
        polyfillScript.src =
            "https://polyfill.io/v3/polyfill.min.js?features=default";
        polyfillScript.defer = true;
        document.head.appendChild(polyfillScript);
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDBEXtTGUC4HiyflEfeqo-74WdAUJLT1E0&callback=initMap&v=weekly&solution_channel=GMP_CCS_geocodingservice_v1`;
        script.defer = true;
        document.head.appendChild(script);

        let map;
        let marker;
        let geocoder;

        window.initMap = function () {
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: { lat: -7.5695177, lng: 110.8250266 },
                mapTypeControl: false,
            });
            geocoder = new google.maps.Geocoder();
            marker = new google.maps.Marker({
                map,
            });
            map.addListener("click", (e) => {
                geocode({ location: e.latLng });
            });
            clear();
        };

        function clear() {
            marker.setMap(null);
        }

        function geocode(request) {
            clear();
            geocoder
                .geocode(request)
                .then((result) => {
                    const { results } = result;

                    if (results.length > 0) {
                        const location = results[0].geometry.location;
                        const lat = location.lat();
                        const lng = location.lng();
                        map.setCenter(location);
                        marker.setPosition(location);
                        marker.setMap(map);

                        if (onCoordinatesChange) {
                            onCoordinatesChange(lat, lng);
                        }
                    }

                    return results;
                })
                .catch((e) => {
                    alert(
                        "Geocode was not successful for the following reason: " +
                            e
                    );
                });
        }

        return () => {
            document.head.removeChild(polyfillScript);
            document.head.removeChild(script);
        };
    }, []);

    return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
}

export default MapComponent;
