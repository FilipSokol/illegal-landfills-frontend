import React, { useState, useEffect } from "react";
import { Table, notification } from "antd";
import Column from "antd/lib/table/Column";
import Axios from "axios";

function AllReports() {
  const [markers, setMarkers] = useState([]);

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

  const deleteReport = (markerid) => {
    Axios.post("http://localhost:3001/api/deletereport", {
      markerid: markerid,
    }).then((response) => {
      if (response.data.affectedRows) {
        downloadData();
        notification.success({
          message: "Pomyślnie usunięto zgłoszenie.",
          top: 95,
        });
      }
    });
  };

  const downloadData = () => {
    Axios.get("http://localhost:3001/api/reportedmarkers").then((response) => {
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
          width="12.5%"
          sorter={(a, b) => a.userid - b.userid}
        />
        <Column
          title="Nazwa Użytkownika"
          dataIndex="username"
          key="username"
          width="12.5%"
          sorter={(a, b) => a.userid - b.userid}
        />
        <Column
          title="ID Markera"
          dataIndex="markerid"
          key="markerid"
          width="12.5%"
          sorter={(a, b) => a.markerid - b.markerid}
        />
        <Column
          title="Zdjęcie"
          dataIndex="imageurl"
          key="imageurl"
          width="12.5%"
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
          width="12.5%"
        />
        <Column
          title="Data Dodania"
          dataIndex="created"
          key="created"
          width="12.5%"
          sorter={(a, b) => a.created.localeCompare(b.created)}
          render={(created) => (
            <div className="whitespace-nowrap">{created.substring(0, 10)}</div>
          )}
        />
        <Column
          dataIndex="markerid"
          key="deletemarker"
          width="12.5%"
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
        <Column
          dataIndex="markerid"
          key="deletereport"
          width="12.5%"
          render={(markerid) => (
            <button
              onClick={() => {
                deleteReport(markerid);
              }}
              className={"border-2 p-2 rounded-lg whitespace-nowrap"}
            >
              Usuń zgłoszenie
            </button>
          )}
        />
      </Table>
    </div>
  );
}

export default AllReports;
