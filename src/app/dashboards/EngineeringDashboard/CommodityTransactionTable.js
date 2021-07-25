import React, { useState, useEffect } from "react";
import apiClient from "../../util/axios";
import { Table } from "antd";

const CommodityTransactionTable = () => {
  const [commodityTransactions, setCommodityTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/commodity-transactions")
      .then((response) => {
        if (response) {
          setCommodityTransactions(response.data);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: <div className="font-weight-bold font-size-11">Vendor</div>,
      dataIndex: "vendor",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Tanker No</div>,
      dataIndex: "tanker_no",
      className: "font-weight-normal table-column font-size-11",
      width: 72,
    },
    {
      title: <div className="font-weight-bold font-size-11">Block</div>,
      dataIndex: "block",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Commodity</div>,
      dataIndex: "commodity",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Status</div>,
      dataIndex: "status",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Timings</div>,
      dataIndex: "timings",
      className: "font-weight-normal table-column font-size-11",
    },
  ];

  return (
    <Table
      bordered
      dataSource={commodityTransactions}
      loading={loading}
      rowKey="id"
      columns={columns}
      pagination={false}
      scroll={{ y: 360 }}
    />
  );
};

export default CommodityTransactionTable;
