import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 52.22611704066942,
  lng: 19.357910156250004,
};

const position = {
  lat: 37.772,
  lng: -122.214,
};

const markers = [
  {
    id: "1",
    name: "Test1",
    position: {
      lat: 50.42806899872329,
      lng: 19.400525093078617,
    },
  },
  {
    id: "2",
    name: "Test2",
    position: {
      lat: 50.30042898028658,
      lng: 18.710660934448246,
    },
  },
];

const onLoadd = (marker) => {
  console.log("marker: ", marker);
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   markers && markers.forEach(({ position }) => bounds.extend(position));
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      //  onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker onLoad={onLoadd} position={position} />

      {markers.map(({ id, name, position }, i, arr) => {
        return <Marker position={position} />;
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
