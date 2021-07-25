import React, { useState, useEffect } from "react";
import apiClient from "../../util/axios";
import { Table } from "antd";

const PowerConsumtionTable = () => {
  const [powerConsumtions, setPowerConsumtion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/power-consumtions")
      .then((response) => {
        if (response) {
          setPowerConsumtion(response.data);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: (
        <div className="font-weight-bold font-size-11">Equipment Name</div>
      ),
      dataIndex: "equipment",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Category</div>,
      dataIndex: "category",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Space/Floor</div>,
      dataIndex: "space_or_floor",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Status</div>,
      dataIndex: "status",
      className: "font-weight-normal table-column font-size-11",
      width: 86,
    },
    {
      title: <div className="font-weight-bold font-size-11">Action</div>,
      dataIndex: "action",
      className: "font-weight-normal table-column font-size-11",
    },
  ];

  return (
    <Table
      bordered
      dataSource={powerConsumtions}
      loading={loading}
      rowKey="equipment"
      columns={columns}
      pagination={false}
      scroll={{ y: 120 }}
    />
  );
};

export default PowerConsumtionTable;
