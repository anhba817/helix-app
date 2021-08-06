import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Button, Select, Table } from "antd";
import moment from "moment";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import assetsIcon from "../images/icons/assets.svg";
import apiClient from "../util/axios";
import "./dashboard.scss";

const dateFormat = "MM/DD/YYYY";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const AssetsDashboard = ({ activeIndex, setActiveIndex }) => {
  const [filter1, setFilter1] = useState("equipment_number");
  const [filter1Value, setFilter1Value] = useState("All");
  const [filter2, setFilter2] = useState("status");
  const [filter2Value, setFilter2Value] = useState("All");
  const [assetData, setAssetData] = useState([]);

  useEffect(() => {
    apiClient
      .get("/assets-details")
      .then((response) => {
        if (response) {
          setAssetData(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const options = [
    {
      label: "Equipment #",
      value: "equipment_number",
    },
    {
      label: "Equipment Name",
      value: "equipment_name",
    },
    {
      label: "Category",
      value: "category",
    },
    {
      label: "Status",
      value: "status",
    },
    {
      label: "Warranty End",
      value: "warranty_end",
    },
    {
      label: "Company",
      value: "company",
    },
  ];

  const columns = [
    {
      title: <div className="font-weight-bold">Equipment Name</div>,
      dataIndex: "equipment_name",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Equipment #</div>,
      dataIndex: "equipment_number",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Category</div>,
      dataIndex: "category",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Space</div>,
      dataIndex: "space",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Status</div>,
      dataIndex: "status",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Warranty End</div>,
      render: (_, record) =>
        moment(record.warranty_end, dateFormat).format("dddd, MMMM DD, YYYY"),
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Company</div>,
      dataIndex: "company",
      className: "font-weight-normal table-column",
    },
  ];

  const filter1ValueOptions = assetData
    .map((item) => item[filter1])
    .filter(onlyUnique);
  const filter2ValueOptions = assetData
    .map((item) => item[filter2])
    .filter(onlyUnique);

  const filteredData = assetData
    .filter((item) =>
      filter1 && filter1Value && filter1Value !== "All"
        ? item[filter1] === filter1Value
        : true
    )
    .filter((item) =>
      filter2 && filter2Value && filter2Value !== "All"
        ? item[filter2] === filter2Value
        : true
    );
  return (
    <Card className="mt-2 p-0">
      <CardBody>
        <Row sm="12">
          <Col className="m-2">
            <Row className="position-relative">
              <Col md="6">
                <h2 className="text-mandy font-weight-bold">
                  <img
                    src={assetsIcon}
                    width="50"
                    height="50"
                    className="mr-2"
                    style={{marginTop: -8}}
                  />
                  Assets Dashboard
                </h2>
              </Col>
              <Col md={{ size: 4, offset: 1 }} className="mt-3">
                <div className="d-flex justify-content-center">
                  <div className="d-flex flex-column mr-2">
                    <Select
                      bordered={false}
                      options={options}
                      value={filter1}
                      onSelect={(value) => setFilter1(value)}
                      style={{ width: 150 }}
                    />
                    <Select
                      options={["All", ...filter1ValueOptions].map((vl) => ({
                        value: vl,
                        label: vl,
                      }))}
                      value={filter1Value}
                      onSelect={(value) => setFilter1Value(value)}
                      style={{ width: 150 }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <Select
                      bordered={false}
                      options={options}
                      value={filter2}
                      onSelect={(value) => setFilter2(value)}
                      style={{ width: 150 }}
                    />
                    <Select
                      options={["All", ...filter2ValueOptions].map((vl) => ({
                        value: vl,
                        label: vl,
                      }))}
                      value={filter2Value}
                      onSelect={(value) => setFilter2Value(value)}
                      style={{ width: 150 }}
                    />
                  </div>
                </div>
              </Col>
              <div
                className="d-flex justify-content-end"
                style={{ position: "absolute", top: 16, right: 16 }}
              >
                <Button
                  className="border-0"
                  size="large"
                  ghost
                  icon={<ArrowLeftOutlined style={{ color: "#4e5664" }} />}
                  disabled={activeIndex < 1}
                  onClick={() => setActiveIndex(activeIndex - 1)}
                />
                <Button
                  className="border-0"
                  size="large"
                  ghost
                  icon={<ArrowRightOutlined style={{ color: "#4e5664" }} />}
                  disabled={activeIndex > 5}
                  onClick={() => setActiveIndex(activeIndex + 1)}
                />
              </div>
            </Row>
          </Col>
        </Row>
        <Row sm="12">
          <Col className="mt-3">
            <Table
              bordered
              dataSource={filteredData}
              rowKey="id"
              columns={columns}
              pagination={false}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AssetsDashboard;
