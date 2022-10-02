import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table } from "antd";
import Column from "antd/lib/table/Column";

function Scoreboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/scoreboard").then((response) => {
      setUsers(response.data);
    });
  }, []);

  console.log(users);

  return (
    <div className="mx-64 mt-8 pb-8">
      <div className="mb-8">
        <div className="text-lightgreen text-7xl font-bold">Ranking</div>
        <div className="text-lightblack text-3xl font-bold">
          najbardziej aktywnych użytkowników...
        </div>
      </div>

      <div className="p-4 border-2 rounded-lg">
        <Table
          dataSource={users}
          pagination={false}
          loading={users === undefined}
          locale={{
            emptyText: "Brak Danych",
          }}
          rowKey="markerid"
        >
          <Column
            title="Miejsce"
            width="3.4%"
            render={(value, item, index) => index + 1}
          />

          <Column
            title="Nazwa Użytkownika"
            dataIndex="username"
            key="username"
            width="3.4%"
          />
          <Column title="Wynik" dataIndex="score" key="score" width="1%" />
        </Table>
      </div>
    </div>
  );
}

export default Scoreboard;
