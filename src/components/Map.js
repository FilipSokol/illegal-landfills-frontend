import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

import Axios from "axios";
import { notification } from "antd";

import defaultMarker from "../images/defaultMarker.png";
import bagMarker from "../images/bagMarker.png";
import carMarker from "../images/carMarker.png";

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

  const getMarkers = () => {
    Axios.get("http://localhost:3001/api/markers").then((response) => {
      setMarkers(response.data);
    });
  };

  useEffect(() => {
    getMarkers();
  }, []);

  const deleteReportPost = (markerid) => {
    Axios.post("http://localhost:3001/api/deletetrashmarker", {
      markerid: markerid,
    }).then((response) => {
      if (response.data.affectedRows) {
        getMarkers();
        notification.warning({
          message: "Zgłoszono posprzątanie miejsca.",
          top: 95,
        });
      }
    });
  };

  const trashReportPost = (markerid) => {
    Axios.post("http://localhost:3001/api/reporttrash", {
      markerid: markerid,
    }).then((response) => {
      if (response.data.affectedRows) {
        getMarkers();
        notification.warning({
          message: "Zgłoszono dalsze zaśmiecenie miejsca.",
          top: 95,
        });
      }
    });
  };

  const reportPost = (markerid) => {
    Axios.post("http://localhost:3001/api/reportmarker", {
      markerid: markerid,
    }).then((response) => {
      if (response.data.affectedRows) {
        getMarkers();
        notification.warning({
          message: "Zgłoszono post.",
          top: 95,
        });
      }
    });
  };

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
            {
              markerid,
              latitude,
              longitude,
              imageurl,
              description,
              type,
              updated,
              deleted,
            },
            i,
            arr
          ) => {
            const position = {
              lat: latitude,
              lng: longitude,
            };

            return (
              <MarkerF
                key={markerid}
                icon={
                  type === "bag"
                    ? bagMarker
                    : type === "car"
                    ? carMarker
                    : defaultMarker
                }
                position={position}
                onClick={() => handleActiveMarker(markerid)}
              >
                {activeMarker === markerid ? (
                  <InfoWindow
                    className="w-20"
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div className="h-markerbox w-markerbox flex justify-start font-montserrat">
                      <div className="h-full w-1/2">
                        <img
                          src={imageurl}
                          alt="marker"
                          className="object-cover h-full w-full rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col pl-2 text-lightblack w-1/2">
                        <div className="h-auto w-full flex flex-col">
                          <div className="h-10 w-full text-2xl flex justify-center items-center rounded-t-lg  bg-lightgreen text-white">
                            Opis
                          </div>
                          <div className="h-24 w-full p-2 shadow-md flex justify-start items-start rounded-b-lg">
                            {description !== null ? description : "Brak opisu."}
                          </div>
                        </div>
                        <div className="h-auto w-auto flex flex-col mt-3">
                          <div className="h-10 w-full text-2xl flex justify-center items-center rounded-t-lg  bg-lightgreen text-white">
                            Aktualizacje
                          </div>
                          <div className="h-20 w-full p-2 shadow-md flex flex-col justify-start items-start rounded-b-lg">
                            {deleted === null &&
                              updated === null &&
                              "Brak aktualizacji."}
                            <div>
                              {deleted !== null &&
                                deleted.substring(0, 10) +
                                  " - Post zostanie usunięty. Zgłoszono posprzątanie."}
                            </div>
                            <div>
                              {updated !== null &&
                                updated.substring(0, 10) +
                                  " - Śmieci nadal tutaj są"}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col h-auto w-full mt-3 justify-center items-start space-y-4">
                          <button
                            className="h-10 w-full bg-sky-400	disabled:bg-neutral-700 rounded-lg text-white text-lg shadow-md"
                            onClick={(e) => (
                              deleteReportPost(markerid),
                              (e.currentTarget.disabled = true)
                            )}
                            disabled={deleted !== null}
                          >
                            Posprzątane
                          </button>
                          <button
                            className="mt-3 h-10 w-full bg-yellow-400 disabled:bg-neutral-700 rounded-lg text-white text-lg shadow-md"
                            onClick={(e) => (
                              trashReportPost(markerid),
                              (e.currentTarget.disabled = true)
                            )}
                            disabled={deleted !== null}
                          >
                            Nadal tutaj są
                          </button>
                          <button
                            className="mt-3 h-10 w-full bg-red-500 disabled:bg-neutral-700 rounded-lg text-white text-lg shadow-md"
                            onClick={(e) => (
                              reportPost(markerid),
                              (e.currentTarget.disabled = true)
                            )}
                            disabled={deleted !== null}
                          >
                            Zgłoś post
                          </button>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                ) : null}
              </MarkerF>
            );
          }
        )}
      </GoogleMap>
    </div>
  ) : null;
}

export default Map;
