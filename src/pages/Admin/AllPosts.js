import React, { useState, useEffect } from "react";
import { Table, notification } from "antd";
import Column from "antd/lib/table/Column";
import Axios from "axios";

function AllPosts() {
  const [markers, setMarkers] = useState([]);

  const deleteMarker = (markerid, imageurl) => {
    Axios.post("http://localhost:3001/api/deletemarker", {
      markerid: markerid,
    }).then((response) => {
      if (response.data.affectedRows) {
        downloadData();
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

  const downloadData = () => {
    Axios.get("http://localhost:3001/api/markers").then((response) => {
      setMarkers(response.data);
    });
  };

  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div className="mx-64 mb-16 p-4 border-2 rounded-lg">
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
          title="ID Użytkownika"
          dataIndex="userid"
          key="userid"
          width="16.6%"
          sorter={(a, b) => a.userid - b.userid}
        />
        <Column
          title="ID Markera"
          dataIndex="markerid"
          key="markerid"
          width="16.6%"
          sorter={(a, b) => a.markerid - b.markerid}
        />
        <Column
          title="Zdjęcie"
          dataIndex="imageurl"
          key="imageurl"
          width="16.6%"
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
          width="16.6%"
          sorter={(a, b) => a.created.localeCompare(b.created)}
          render={(created) => (
            <div className="whitespace-nowrap">{created.substring(0, 10)}</div>
          )}
        />
        <Column
          dataIndex="markerid"
          key="deletemarker"
          width="16.6%"
          render={(markerid, data) => (
            <button
              onClick={() => {
                deleteMarker(markerid, data.imageurl);
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

export default AllPosts;
