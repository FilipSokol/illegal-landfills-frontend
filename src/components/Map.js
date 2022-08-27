import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Axios from "axios";

import markerIcon from "../images/markerIcon.png";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  mapId: "4124809431b77c00",
  streetViewControl: false,
};

const center = {
  lat: 52.22611704066942,
  lng: 19.357910156250004,
};

function Map() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/markers").then((response) => {
      setMarkers(response.data);
    });
  }, []);

  console.log(markers);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const [map, setMap] = useState(null);

  // API ^

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    setActiveMarker(marker);
  };

  return isLoaded ? (
    //   <div className="h-hero bg-hero-img bg-right-bottom bg-cover flex">
    //   <div rel="preload" className="h-hero w-full bg-white bg-opacity-50"></div>
    // </div>
    <div className="w-100 h-hero flex">
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map(
          (
            { markerid, latitude, longitude, imageurl, description },
            i,
            arr
          ) => {
            const position = {
              lat: latitude,
              lng: longitude,
            };
            return (
              <Marker
                key={markerid}
                icon={markerIcon}
                position={position}
                onClick={() => handleActiveMarker(markerid)}
              >
                {activeMarker === markerid ? (
                  <InfoWindow
                    className="w-20"
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div className="h-100 w-100 flex justify-start font-montserrat">
                      <div className="h-auto w-auto">
                        <img
                          src={imageurl}
                          alt="TEST" //! ZMIENIC
                          className="w-72 h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col pl-2 text-lightblack">
                        <div className="h-auto w-auto flex flex-col">
                          <div className="h-10 w-full text-2xl flex justify-center items-center rounded-t-lg  bg-lightgreen text-white">
                            Opis
                          </div>
                          <div className="h-24 w-full p-2 shadow-md flex justify-start items-start rounded-b-lg">
                            {description}
                          </div>
                        </div>
                        <div className="h-auto w-auto flex flex-col mt-3">
                          <div className="h-10 w-full text-2xl flex justify-center items-center rounded-t-lg  bg-lightgreen text-white">
                            Aktualizacje
                          </div>
                          <div className="h-12 w-full p-2 shadow-md flex justify-start items-start rounded-b-lg">
                            19/05/2022 - Posprzątane
                            <br />
                            Zgłoszenie zostanie zarchiwizowane za 2 dni
                          </div>
                        </div>
                        <div className="flex flex-col h-auto w-full mt-3 justify-center items-start">
                          <button className="h-10 w-full bg-sky-400	 rounded-lg text-white text-lg shadow-md">
                            Posprzątane
                          </button>
                          <button className="mt-3 h-10 w-full bg-yellow-400 rounded-lg text-white text-lg shadow-md">
                            Nadal tutaj jest
                          </button>
                          <button className="mt-3 h-10 w-full bg-red-500 rounded-lg text-white text-lg shadow-md">
                            Zgłoś spam
                          </button>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            );
          }
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Map;
