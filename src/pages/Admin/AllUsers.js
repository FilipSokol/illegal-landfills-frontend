import React, { useState, useEffect } from "react";
import { Table, notification } from "antd";
import Column from "antd/lib/table/Column";
import Axios from "axios";

function AllUsers() {
  const [users, setUsers] = useState([]);

  const deleteUser = (userid) => {
    Axios.post("http://localhost:3001/api/deleteuser", {
      userid: userid,
    }).then((response) => {
      if (response.data.affectedRows) {
        downloadData();
        notification.success({
          message: "Pomyślnie usunięto użytkownika.",
          top: 95,
        });
      }
    });
  };

  const downloadData = () => {
    Axios.get("http://localhost:3001/api/users").then((response) => {
      setUsers(response.data);
    });
  };

  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div className="mx-64 mb-16 w-max p-4 border-2 rounded-lg">
      <Table
        dataSource={users}
        pagination={true}
        loading={users === undefined}
        locale={{
          emptyText: "Brak Danych",
          triggerDesc: "Zmień kolejność sortowania",
          triggerAsc: "Włącz sortowanie",
          cancelSort: "Wyłącz sortowanie",
        }}
        rowKey="userid"
      >
        <Column
          title="ID Użytkownika"
          dataIndex="userid"
          key="userid"
          width="20%"
          sorter={(a, b) => a.userid - b.userid}
        />
        <Column
          title="Nazwa Użytkownika"
          dataIndex="username"
          key="username"
          width="20%"
          sorter={(a, b) => a.username.localeCompare(b.username)}
        />
        <Column
          title="Email"
          dataIndex="email"
          key="email"
          width="20%"
          sorter={(a, b) => a.email.localeCompare(b.email)}
        />
        <Column title="Rola" dataIndex="role" key="role" width="20%" />
        <Column
          dataIndex="userid"
          key="deleteuser"
          width="20%"
          render={(userid) => (
            <button
              onClick={() => {
                deleteUser(userid);
              }}
              className={"border-2 p-2 rounded-lg whitespace-nowrap"}
            >
              Usuń użytkownika
            </button>
          )}
        />
      </Table>
    </div>
  );
}

export default AllUsers;
