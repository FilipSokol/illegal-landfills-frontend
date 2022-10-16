import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Modal, Table } from "antd";
import Column from "antd/lib/table/Column";

function Scoreboard() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/scoreboard").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="mx-64 mt-8 pb-8">
      <div className="mb-8 flex justify-between">
        <div>
          <div className="text-lightgreen text-7xl font-bold">Ranking</div>
          <div className="text-lightblack text-3xl font-bold">
            najbardziej aktywnych użytkowników...
          </div>
        </div>
        <div className="self-end">
          <button
            className="px-3 py-2 ml-2 bg-lightgreen rounded-full text-xl font-montserrat text-lightblack hover:text-lightblack"
            onClick={() => setModalOpen(true)}
          >
            Regulamin
          </button>
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
      <Modal
        title="Regulamin"
        cancelText="Anuluj"
        centered
        visible={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={null}
      >
        <div className="flex flex-col gap-y-2">
          <div>
            <b>+10</b> punktów za zgłoszenie postu jako spam. Punkty
            przydzielane są po pozytywnym rozpatrzeniu zgłoszenia przez
            administratora.
          </div>
          <div>
            <b>+20</b> punktów za dodanie postu.
          </div>
          <div>
            <b>+30</b> punktów za zgłoszenie posprzątania miejsca.
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Scoreboard;
