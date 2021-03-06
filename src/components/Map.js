import { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import markerIcon from "../images/markerIcon.png";

const containerStyle = {
  width: "960px",
  height: "500px",
};

const options = {
  mapId: "4124809431b77c00",
  streetViewControl: false,
};

const center = {
  lat: 52.22611704066942,
  lng: 19.357910156250004,
};

const markers = [
  {
    id: "1",
    name: "Test1",
    position: {
      lat: 50.42806899872329,
      lng: 19.400525093078617,
    },
    image: "https://i.imgur.com/0gtMdoC.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    name: "Test2",
    position: {
      lat: 50.30042898028658,
      lng: 18.710660934448246,
    },
    image: "https://i.imgur.com/4A4BXFI.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function Map() {
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
    <div className="w-100 h-auto p-20 flex justify-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map(({ id, name, position, image, description }, i, arr) => {
          return (
            <Marker
              key={id}
              icon={markerIcon}
              position={position}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <InfoWindow
                  className="w-20"
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div className="h-100 w-100 flex justify-start font-montserrat">
                    <div className="h-auto w-auto">
                      <img
                        src={image}
                        alt={name}
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
                          19/05/2022 - Posprz??tane
                          <br />
                          Zg??oszenie zostanie zarchiwizowane za 2 dni
                        </div>
                      </div>
                      <div className="flex flex-col h-auto w-full mt-3 justify-center items-start">
                        <button className="h-10 w-full bg-sky-400	 rounded-lg text-white text-lg shadow-md">
                          Posprz??tane
                        </button>
                        <button className="mt-3 h-10 w-full bg-yellow-400 rounded-lg text-white text-lg shadow-md">
                          Nadal tutaj jest
                        </button>
                        <button className="mt-3 h-10 w-full bg-red-500 rounded-lg text-white text-lg shadow-md">
                          Zg??o?? spam
                        </button>
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Map;
