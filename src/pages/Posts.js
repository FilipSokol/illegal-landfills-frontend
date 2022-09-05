import React, { useState, useEffect } from "react";
import { Table, notification } from "antd";
import Column from "antd/lib/table/Column";
import Axios from "axios";

function Posts() {
  const [markers, setMarkers] = useState([]);
  const [userId, setUserId] = useState(undefined);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const AuthVerify = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      setUserId(decodedJwt.userid);
    }
  };

  //! DODAĆ ŻE USUWA TEZ FOTKE Z CLOUDINARY
  const deleteMarker = (markerid) => {
    Axios.post("http://localhost:3001/api/deletemarker", {
      markerid: markerid,
    }).then((response) => {
      if (response.data.affectedRows) {
        downloadData();
        notification.success({
          message: "Pomyślnie usunięto post.",
          top: 95,
        });
      }
    });
  };

  //! DOROBIĆ
  const downloadData = () => {
    Axios.post("http://localhost:3001/api/usermarkers", {
      userid: userId,
    }).then((response) => {
      setMarkers(response.data);
    });
  };

  useEffect(() => {
    AuthVerify();
    downloadData();
  }, [userId]);

  return (
    <div className="mx-64 mt-28 mb-16 p-4 border-2 rounded-lg">
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
          title="ID Markera"
          dataIndex="markerid"
          key="markerid"
          width="2.8%"
          sorter={(a, b) => a.markerid - b.markerid}
        />
        <Column
          title="Zdjęcie"
          dataIndex="imageurl"
          key="imageurl"
          width="1%"
          render={(imageurl) => (
            <a href={imageurl} target="_blank">
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
            <div className="whitespace-nowrap">{created.substring(0, 10)}</div>
          )}
        />
        <Column
          dataIndex="markerid"
          key="deletemarker"
          width="1%"
          render={(markerid) => (
            <button
              onClick={() => {
                deleteMarker(markerid);
              }}
              className={"border-2 p-2 rounded-lg whitespace-nowrap"}
            >
              Usuń post
            </button>
          )}
        />
      </Table>
    </div>
  );
}

export default Posts;
