import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

import Axios from "axios";
import { Modal, notification } from "antd";

import defaultMarker from "../images/defaultMarker.png";
import bagMarker from "../images/bagMarker.png";
import carMarker from "../images/carMarker.png";
import MarkerBody from "../components/MarkerBody";

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

function Home() {
  const [markers, setMarkers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalDataDesc, setModalDataDesc] = useState("");

  const getMarkers = () => {
    Axios.get("http://localhost:3001/api/markers").then((response) => {
      setMarkers(response.data);
    });
  };

  //! kolejnosc
  useEffect(() => {
    getMarkers();
  }, []);

  const changeDescription = (markerid) => {
    Axios.post("http://localhost:3001/api/editdescription", {
      markerid: markerid,
      description: modalDataDesc,
    }).then((response) => {
      if (response.data.affectedRows) {
        getMarkers();
        notification.success({
          message: "Edytowano opis pomyślnie.",
          top: 95,
        });
      }
    });
  };

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
              userid,
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
                //! dać lepsze nazwy z handle
                {activeMarker === markerid ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <MarkerBody
                      markerid={markerid}
                      userid={userid}
                      imageurl={imageurl}
                      description={description}
                      deleted={deleted}
                      updated={updated}
                      setModalData={setModalData}
                      setModalOpen={setModalOpen}
                      deleteReportPost={deleteReportPost}
                      trashReportPost={trashReportPost}
                      reportPost={reportPost}
                    />
                  </InfoWindow>
                ) : null}
              </MarkerF>
            );
          }
        )}
      </GoogleMap>
      <Modal
        title="Edycja opisu"
        cancelText="Anuluj"
        okText="Potwierdź edycje"
        centered
        visible={modalOpen}
        onOk={() => {
          changeDescription(modalData?.markerid);
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      >
        <textarea
          className="h-24 w-full p-2 border border-slate-200 resize-none outline-0"
          maxlength="180"
          defaultValue={modalData?.description}
          onChange={(e) => setModalDataDesc(e.target.value)}
        />
      </Modal>
    </div>
  ) : null;
}

export default Home;
