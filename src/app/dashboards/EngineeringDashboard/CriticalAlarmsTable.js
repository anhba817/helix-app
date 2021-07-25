import React, { useState, useEffect } from "react";
import apiClient from "../../util/axios";
import { Table } from "antd";

const CriticalAlarmTable = () => {
  const [criticalAlarms, setCriticalAlarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/critical-alarms")
      .then((response) => {
        if (response) {
          setCriticalAlarms(response.data);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: <div className="font-weight-bold font-size-11">Equipment</div>,
      dataIndex: "equipment",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Time Elapsed</div>,
      dataIndex: "time_elapsed",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Condition</div>,
      dataIndex: "condition",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Risk</div>,
      dataIndex: "risk",
      className: "font-weight-normal table-column font-size-11",
    },
  ];

  return (
    <Table
      bordered
      dataSource={criticalAlarms}
      loading={loading}
      rowKey="id"
      columns={columns}
      pagination={false}
      scroll={{ y: 360 }}
    />
  );
};

export default CriticalAlarmTable;
