import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Button, Select, Table } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import assetsIcon from "../images/icons/checklist.svg";
import apiClient from "../util/axios";
import "./dashboard.scss";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const PRIORITY = {
  Low: 0,
  Normal: 1,
  High: 2,
};

const AssetsDashboard = ({ activeIndex, setActiveIndex }) => {
  const [filter1, setFilter1] = useState("equipment_number");
  const [filter1Value, setFilter1Value] = useState("All");
  const [filter2, setFilter2] = useState("status");
  const [filter2Value, setFilter2Value] = useState("All");
  const [workOrderData, setWorkOrderData] = useState([]);

  useEffect(() => {
    apiClient
      .get("/work-orders")
      .then((response) => {
        if (response) {
          setWorkOrderData(response.data);
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
      label: "Maintenance Type",
      value: "maintenance_type",
    },
    {
      label: "Priority",
      value: "priority",
    },
    {
      label: "Maintenance Team",
      value: "maintenance_team",
    },
    {
      label: "Technician",
      value: "technician",
    },
    {
      label: "Status",
      value: "status",
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
      title: <div className="font-weight-bold">Maintenance Type</div>,
      dataIndex: "maintenance_type",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Priority</div>,
      dataIndex: "priority",
      className: "font-weight-normal table-column",
      sorter: (a, b) => PRIORITY[a.priority] - PRIORITY[b.priority],
    },
    {
      title: <div className="font-weight-bold">Maintenance Team</div>,
      dataIndex: "maintenance_team",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Technician</div>,
      dataIndex: "technician",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Status</div>,
      dataIndex: "status",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Company</div>,
      dataIndex: "company",
      className: "font-weight-normal table-column",
    },
  ];

  const filter1ValueOptions = workOrderData
    .map((item) => item[filter1])
    .filter(onlyUnique);
  const filter2ValueOptions = workOrderData
    .map((item) => item[filter2])
    .filter(onlyUnique);

  const filteredData = workOrderData
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
                  Work Orders Dashboard
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
