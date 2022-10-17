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
          message: "Pomyślnie usunięto marker.",
          top: 95,
        });
      }
    });
  };

  const deleteReport = (reportid) => {
    Axios.post("http://localhost:3001/api/deletereport", {
      reportid: reportid,
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

  const addPoints = (userid) => {
    Axios.post("http://localhost:3001/api/addpoints", {
      score: 10,
      userid: userid,
    });
  };

  const downloadData = () => {
    Axios.get("http://localhost:3001/api/reports").then((response) => {
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
        rowKey="reportid"
      >
        <Column
          title="ID Zgłoszenia"
          dataIndex="reportid"
          key="reportid"
          width="12.5%"
          sorter={(a, b) => a.reportid - b.reportid}
        />
        <Column
          title="ID Markera"
          dataIndex="markerid"
          key="markerid"
          width="12.5%"
          sorter={(a, b) => a.markerid - b.markerid}
        />
        <Column
          title="ID Zgłaszającego"
          dataIndex="reportedbyid"
          key="reportedbyid"
          width="12.5%"
          sorter={(a, b) => a.markerid - b.markerid}
          render={(reporteduserid) => (
            <div>
              {reporteduserid !== null ? reporteduserid : "Niezalogowany"}
            </div>
          )}
        />
        <Column
          title="ID Właścicela"
          dataIndex="reporteduserid"
          key="reporteduserid"
          width="12.5%"
          sorter={(a, b) => a.reporteduserid - b.reporteduserid}
        />
        <Column
          title="Nazwa Właścicela"
          dataIndex="reportedusername"
          key="reportedusername"
          width="12.5%"
          sorter={(a, b) => a.reportedusername - b.reportedusername}
        />
        <Column
          title="Powód Zgłoszenia"
          dataIndex="reason"
          key="reason"
          width="12.5%"
          render={(reason) => (
            <div>
              {reason === "description"
                ? "Opis"
                : reason === "image"
                ? "Zdjęcie"
                : "Opis i zdjęcie"}
            </div>
          )}
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
          title="Data Dodania Postu"
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
          render={(markerid, data) => (
            <button
              onClick={() => {
                addPoints(data.reportedbyid);
                deleteMarker(markerid);
                deleteReport(data.reportid);
              }}
              className={"border-2 p-2 rounded-lg whitespace-nowrap"}
            >
              Zaakceptuj
            </button>
          )}
        />
        <Column
          dataIndex="reportid"
          key="reportid"
          width="12.5%"
          render={(reportid) => (
            <button
              onClick={() => {
                deleteReport(reportid);
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
