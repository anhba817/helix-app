import React, { useState, useEffect } from "react";
import apiClient from "../../util/axios";
import { Table } from "antd";

const AirQualityTable = () => {
  const [airQualityData, setAirQualityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/air-quality")
      .then((response) => {
        if (response) {
          setAirQualityData(response.data);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: (
        <div className="font-weight-bold font-size-11">Space/Floor</div>
      ),
      dataIndex: "space_or_floor",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Device</div>,
      dataIndex: "device",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Temperature (C)</div>,
      dataIndex: "temperature",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Humidity (%)</div>,
      dataIndex: "humidity",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">H25 (ppb)</div>,
      dataIndex: "h25",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">H25 (ppb)</div>,
      dataIndex: "h25",
      className: "font-weight-normal table-column font-size-11",
    },
    // {
    //   title: <div className="font-weight-bold font-size-11">CO2 Level</div>,
    //   dataIndex: "co2",
    //   className: "font-weight-normal table-column font-size-11",
    // },
    // {
    //   title: <div className="font-weight-bold font-size-11">Luminance</div>,
    //   dataIndex: "luminance",
    //   className: "font-weight-normal table-column font-size-11",
    // }
  ];

  return (
    <Table
      bordered
      dataSource={airQualityData}
      loading={loading}
      rowKey="id"
      columns={columns}
      pagination={false}
      scroll={{ y: 360 }}
    />
  );
};

export default AirQualityTable;
