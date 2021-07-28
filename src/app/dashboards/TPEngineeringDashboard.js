import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Button, Select, Table } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import transactionIcon from "../images/icons/transaction.svg";
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
  const [filter1, setFilter1] = useState("vendor");
  const [filter1Value, setFilter1Value] = useState("All");
  const [filter2, setFilter2] = useState("commodity");
  const [filter2Value, setFilter2Value] = useState("All");
  const [tpEngineeringData, setTpEngineeringData] = useState([]);

  useEffect(() => {
    apiClient
      .get("/tp-engineerings")
      .then((response) => {
        if (response) {
          setTpEngineeringData(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const options = [
    {
      label: "Sequence #",
      value: "sequence_number",
    },
    {
      label: "Tanker Transaction",
      value: "tanker_transaction",
    },
    {
      label: "Vendor",
      value: "vendor",
    },
    {
      label: "Block",
      value: "block",
    },
    {
      label: "In Date",
      value: "in_date",
    },
    {
      label: "Commodity",
      value: "commodity",
    },
    {
      label: "Capacity",
      value: "capacity",
    },
    {
      label: "Company",
      value: "company",
    },
  ];

  const columns = [
    {
      title: <div className="font-weight-bold">Sequence #</div>,
      dataIndex: "sequence_number",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Tanker Transaction</div>,
      dataIndex: "tanker_transaction",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Vendor</div>,
      dataIndex: "vendor",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Block</div>,
      dataIndex: "block",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">In Date</div>,
      dataIndex: "in_date",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Commodity</div>,
      dataIndex: "commodity",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Capacity</div>,
      dataIndex: "capacity",
      className: "font-weight-normal table-column",
    },
    {
      title: <div className="font-weight-bold">Company</div>,
      dataIndex: "company",
      className: "font-weight-normal table-column",
    },
  ];

  const filter1ValueOptions = tpEngineeringData
    .map((item) => item[filter1])
    .filter(onlyUnique);
  const filter2ValueOptions = tpEngineeringData
    .map((item) => item[filter2])
    .filter(onlyUnique);

  const filteredData = tpEngineeringData
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
                    src={transactionIcon}
                    width="50"
                    height="50"
                    className="mr-2"
                    style={{marginTop: -8}}
                  />
                  TP Engineering Dashboard
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
