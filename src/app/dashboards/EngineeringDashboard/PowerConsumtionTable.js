import React, { useState, useEffect } from "react";
import moment from "moment";
import { Table } from "antd";

const dateFormat = "MM/DD/YYYY";

const PowerConsumtionTable = ({
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
      title: <div className="font-weight-bold font-size-11">Site</div>,
      dataIndex: "site",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11">Consumption Unit</div>
      ),
      dataIndex: "unit",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11">Day Consumption</div>
      ),
      dataIndex: "consumption",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11">Avg. Consumption</div>
      ),
      dataIndex: "avg_consumption",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Deviation(%)</div>,
      render: (_, record) =>
        record.deviation >= 0 ? (
          <div>
            {Math.abs(record.deviation)}%
            <i className="fa fa-arrow-up text-success" />
          </div>
        ) : (
          <div>
            {Math.abs(record.deviation)}%
            <i className="fa fa-arrow-down text-danger" />
          </div>
        ),
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Action</div>,
      dataIndex: "action",
      className: "font-weight-normal table-column font-size-11 text-danger",
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
      scroll={{ y: 60 }}
    />
  );
};

export default PowerConsumtionTable;
