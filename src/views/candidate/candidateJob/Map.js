import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    width: "80vw",
    height: "80vh",
    zoom: 8,
  });
  const geolocateControlStyle = {
    right: 5,
    top: 5,
  };

  const data = [
    {
      id: 1,
      job: "angular",
      location: "nabeul",
      coordiante: [36.455066, 10.715423],
    },
    {
      id: 2,
      job: "react",
      location: "ariana",
      coordiante: [36.95514, 10.1581],
    },
  ];
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1IjoibWVoZHkiLCJhIjoiY2tuZWt5bDVqMXNlZjJwbXJwa3cwcTBldyJ9.WHgdh02pVVLmDbld9qfAkQ"
        }
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle={"mapbox://styles/mehdy/cknem64su37cz17l4agf63cnt"}
      >
        {" "}
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />{" "}
        <Marker latitude={36.455066} longitude={10.715423}>
          <i class="fas fa-map-marker">Nabeul</i>
        </Marker>
        <Marker latitude={36.89929206981536} longitude={10.187178715154776}>
          <i class="fas fa-map-marker">Esprit</i>
        </Marker>
      </ReactMapGL>
    </>
  );
}
