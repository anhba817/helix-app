import React, { useState, useEffect } from "react";
import moment from "moment";
import { Table } from "antd";

const dateFormat = "MM/DD/YYYY";

const CommodityTransactionTable = ({
  loading,
  data,
  dateRange,
  filter,
  selectedFilter,
}) => {
  const filteredData = data
    .filter(
      (item) =>
        moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
        moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
    )
    .filter((item) =>
      filter in item && selectedFilter !== "All"
        ? item[filter] === selectedFilter
        : true
    );

  const columns = [
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">Vendor</div>
      ),
      dataIndex: "vendor",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">
          Tanker No
        </div>
      ),
      dataIndex: "tanker_no",
      className: "font-weight-normal table-column font-size-11 text-center",
      width: 72,
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">Site</div>
      ),
      dataIndex: "site",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">
          Commodity
        </div>
      ),
      dataIndex: "commodity",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">
          Capacity
        </div>
      ),
      dataIndex: "capacity",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">
          Delivery Challan
        </div>
      ),
      dataIndex: "delivery_challan",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">
          Initial Reading
        </div>
      ),
      dataIndex: "initial_reading",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">
          Final Reading
        </div>
      ),
      dataIndex: "final_reading",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">
          Required unit to Deliver
        </div>
      ),
      dataIndex: "require_to_deliver",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11 text-center">Risk</div>
      ),
      dataIndex: "risk",
      className: "font-weight-normal table-column font-size-11 text-center",
    },
  ];

  return (
    <Table
      bordered
      dataSource={filteredData}
      loading={loading}
      rowKey="id"
      columns={columns}
      pagination={false}
      scroll={{ y: 360 }}
    />
  );
};

export default CommodityTransactionTable;
