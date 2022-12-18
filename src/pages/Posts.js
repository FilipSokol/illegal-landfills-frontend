import React, { useState, useEffect } from "react";
import { Table, Modal, notification } from "antd";
import Column from "antd/lib/table/Column";
import Axios from "axios";
import authService from "../services/auth.service";

function Posts() {
  const [markers, setMarkers] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalDataDesc, setModalDataDesc] = useState("");

  const AuthVerify = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = authService.parseJwt(user.accessToken);
      setUserId(decodedJwt.userid);
    }
  };

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

  const deleteMarker = (markerid, imageurl) => {
    console.log(imageurl);

    Axios.post("http://localhost:3001/api/deletemarker", {
      markerid: markerid,
    }).then((response) => {
      if (response.data.affectedRows) {
        getMarkers();
        Axios.post("http://localhost:3001/api/deleteimage", {
          imageurl: imageurl,
        });
        notification.success({
          message: "Pomyślnie usunięto post.",
          top: 95,
        });
      }
    });
  };

  const getMarkers = () => {
    Axios.post("http://localhost:3001/api/usermarkers", {
      userid: userId,
    }).then((response) => {
      setMarkers(response.data);
    });
  };

  useEffect(() => {
    AuthVerify();
    getMarkers();
  }, [userId]);

  return (
    <div className="mx-2 md:mx-64 mt-8 pb-8">
      <div className="mb-8">
        <div className="text-lightgreen text-4xl md:text-7xl font-bold">
          Znaczniki
        </div>
        <div className="text-lightblack text-lg md:text-3xl font-bold">
          dodane przez Ciebie...
        </div>
      </div>

      <div className="p-4 border-2 rounded-lg">
        <Table
          dataSource={markers}
          pagination={true}
          loading={markers === undefined}
          locale={{
            emptyText: "Brak Danych",
            triggerDesc: "Zmień kolejność sortowania",
            triggerAsc: "Włącz sortowanie",
            cancelSort: "Wyłącz sortowanie",
          }}
          rowKey="markerid"
        >
          <Column
            title="ID Znacznika"
            dataIndex="markerid"
            key="markerid"
            width="4%"
            sorter={(a, b) => a.markerid - b.markerid}
          />
          <Column
            title="Zdjęcie"
            dataIndex="imageurl"
            key="imageurl"
            width="1%"
            render={(imageurl) => (
              <a
                href={"http://localhost:3001/images/" + imageurl}
                target="_blank"
              >
                Link
              </a>
            )}
          />
          <Column
            title="Opis"
            dataIndex="description"
            key="description"
            width="30%"
          />
          <Column
            title="Data Dodania"
            dataIndex="created"
            key="created"
            width="3.3%"
            sorter={(a, b) => a.created.localeCompare(b.created)}
            render={(created) => (
              <div className="whitespace-nowrap">
                {created.substring(0, 10)}
              </div>
            )}
          />
          <Column
            dataIndex="markerid"
            key="deletemarker"
            width="1%"
            render={(markerid, data) => (
              <button
                onClick={() => {
                  deleteMarker(markerid, data.imageurl);
                }}
                className={"border-2 p-2 rounded-lg whitespace-nowrap"}
              >
                Usuń Znacznik
              </button>
            )}
          />
          <Column
            dataIndex="deleted"
            key="editdecription"
            width="1%"
            render={(deleted, data) => (
              <button
                className={`border-2 p-2 rounded-lg whitespace-nowrap ${
                  deleted !== null ? "bg-gray-200" : null
                }`}
                onClick={() => {
                  setModalOpen(true);
                  setModalData(data);
                }}
                disabled={deleted !== null ? true : false}
              >
                Edytuj Opis
              </button>
            )}
          />
        </Table>
      </div>
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
  );
}

export default Posts;
