import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import authService from "../services/auth.service";

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
  const [reportReason, setReportReason] = useState("");
  const [modalReportOpen, setModalReportOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalDataDesc, setModalDataDesc] = useState("");

  const getMarkers = () => {
    Axios.get("http://localhost:3001/api/markers").then((response) => {
      setMarkers(response.data);
    });
  };

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
        addPoints();
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

  const reportPost = () => {
    setModalReportOpen(true);
    const user = authService.getCurrentUser();

    if (user) {
      const decodedJwt = authService.parseJwt(user.accessToken);

      Axios.post("http://localhost:3001/api/report", {
        markerid: modalData.markerid,
        reporteduserid: modalData.userid,
        reportedbyid: decodedJwt.userid,
        reason: reportReason,
      }).then((response) => {
        if (response.data.affectedRows) {
          getMarkers();
          notification.warning({
            message: "Zgłoszono znacznik.",
            top: 95,
          });
        }
      });
    } else {
      Axios.post("http://localhost:3001/api/report", {
        markerid: modalData.markerid,
        reporteduserid: modalData.userid,
        reason: reportReason,
      }).then((response) => {
        if (response.data.affectedRows) {
          getMarkers();
          notification.warning({
            message: "Zgłoszono znacznik.",
            top: 95,
          });
        }
      });
    }
  };

  const addPoints = () => {
    const user = authService.getCurrentUser();
    if (user) {
      const decodedJwt = authService.parseJwt(user.accessToken);
      Axios.post("http://localhost:3001/api/addpoints", {
        score: 20,
        userid: decodedJwt.userid,
      });
    }
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

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    setActiveMarker(marker);
  };

  return isLoaded ? (
    <div className="h-hero w-full flex">
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
                      setModalEditOpen={setModalEditOpen}
                      setModalReportOpen={setModalReportOpen}
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
        visible={modalEditOpen}
        onOk={() => {
          changeDescription(modalData?.markerid);
          setModalEditOpen(false);
        }}
        onCancel={() => setModalEditOpen(false)}
      >
        <textarea
          className="h-24 w-full p-2 border border-slate-200 resize-none outline-0"
          maxlength="180"
          defaultValue={modalData?.description}
          onChange={(e) => setModalDataDesc(e.target.value)}
        />
      </Modal>
      <Modal
        title="Powód zgłoszenia znacznika"
        cancelText="Anuluj"
        okText="Potwierdź zgłoszenie"
        centered
        visible={modalReportOpen}
        onOk={() => {
          reportPost();
          setModalReportOpen(false);
        }}
        okButtonProps={{
          disabled: reportReason !== "" ? false : true,
        }}
        onCancel={() => {
          setModalData({});
          setReportReason("");
          setModalReportOpen(false);
        }}
      >
        <div className="flex w-full items-center justify-center">
          <div
            className="grid w-full grid-cols-3 space-x-2 rounded-xl bg-gray-200 p-2"
            x-data="app"
          >
            <div>
              <input
                type="radio"
                name="list-radio"
                id="reportDescription"
                className="peer hidden"
                onChange={() => setReportReason("description")}
              />
              <label
                htmlFor="reportDescription"
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-lightgreen peer-checked:font-bold peer-checked:text-white"
              >
                Opis
              </label>
            </div>

            <div>
              <input
                type="radio"
                name="list-radio"
                id="reportImage"
                className="peer hidden"
                onChange={() => setReportReason("image")}
              />
              <label
                htmlFor="reportImage"
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-lightgreen peer-checked:font-bold peer-checked:text-white"
              >
                Zdjęcie
              </label>
            </div>

            <div>
              <input
                type="radio"
                name="list-radio"
                id="reportBoth"
                className="peer hidden"
                onChange={() => setReportReason("both")}
              />
              <label
                htmlFor="reportBoth"
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-lightgreen peer-checked:font-bold peer-checked:text-white"
              >
                Opis i zdjęcie
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  ) : null;
}

export default Home;
