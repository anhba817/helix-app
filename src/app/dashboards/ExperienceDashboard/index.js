import React, { useState, useEffect } from "react";
import apiClient from "../../util/axios";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Button, Table } from "antd";
import { Pie } from "react-chartjs-2";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import ConferenceRoom from "./ConferenceRoom";
import MeetingRoom1 from "./MeetingRoom1";
import MeetingRoom2 from "./MeetingRoom2";
import MeetingRoom3 from "./MeetingRoom3";
import tileIcon from "../../images/icons/tiles.svg";
import maleIcon from "../../images/icons/male.svg";
import femaleIcon from "../../images/icons/female.svg";
import disabledManIcon from "../../images/icons/disabledMan.svg";
import "../dashboard.scss";

const ExperienceDashboard = ({ activeIndex, setActiveIndex }) => {
  const [washroomAvaiData, setWashroomAvaiData] = useState([]);
  const [smartWashroomData, setSmartWashroomData] = useState([]);
  useEffect(() => {
    apiClient
      .get("/washroom-availability")
      .then((response) => {
        if (response) {
          setWashroomAvaiData(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/smart-washroom")
      .then((response) => {
        if (response) {
          setSmartWashroomData(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: <div className="font-weight-bold font-size-11">Building</div>,
      dataIndex: "building",
      className: "font-weight-normal table-column font-size-11",
      width: 70,
    },
    {
      title: <div className="font-weight-bold font-size-11">Block</div>,
      dataIndex: "block",
      className: "font-weight-normal table-column font-size-11",
      width: 60,
    },
    {
      title: <div className="font-weight-bold font-size-11">Floor</div>,
      dataIndex: "floor",
      className: "font-weight-normal table-column font-size-11",
      width: 90,
    },
    {
      title: <div className="font-weight-bold font-size-11">Date</div>,
      dataIndex: "date",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Work Order</div>,
      dataIndex: "work_order",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Status</div>,
      dataIndex: "status",
      className: "font-weight-normal table-column font-size-11",
      width: 80,
    },
    {
      title: <div className="font-weight-bold font-size-11">Risk</div>,
      dataIndex: "risk",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Message</div>,
      dataIndex: "message",
      className: "font-weight-normal table-column font-size-11",
    },
  ];

  const femaleWashroom = washroomAvaiData.filter(
    (item) => item.washroom === "Female"
  );
  const femaleWorking =
    (femaleWashroom.filter((item) => item.availability === "Working").length /
      femaleWashroom.length) *
    100;
  const maleWashroom = washroomAvaiData.filter(
    (item) => item.washroom === "Male"
  );
  const maleWorking =
    (maleWashroom.filter((item) => item.availability === "Working").length /
      maleWashroom.length) *
    100;

  const assistedChangeRoom = washroomAvaiData.filter(
    (item) => item.washroom === "Assisted Change"
  );
  const assistedChangeWorking =
    (assistedChangeRoom.filter((item) => item.availability === "Working")
      .length /
      assistedChangeRoom.length) *
    100;

  return (
    <Card className="mt-2 p-0">
      <CardBody>
        <Row sm="12">
          <Col className="m-2">
            <Row className="d-flex justify-content-between align-items-center">
              <h2 className="text-mandy font-weight-bold">
                <img
                  src={tileIcon}
                  width="50"
                  height="50"
                  className="mr-2"
                  style={{ marginTop: -8 }}
                />
                Experience Dashboard
              </h2>
              <div>
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
        <Row sm="12" className="my-3">
          <Col md="5">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Washroom Availability
              </CardHeader>
              <Row>
                <Col md="3">
                  <div style={{ width: 120, height: 120 }}>
                    <Pie
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                          title: {
                            display: true,
                            text: "Male",
                          },
                        },
                      }}
                      data={{
                        labels: ["Working", "Out of Service"],
                        datasets: [
                          {
                            label: "Male",
                            data: [
                              maleWorking.toFixed(2),
                              (100 - maleWorking).toFixed(2),
                            ],
                            backgroundColor: ["#3eb3dc", "blue"],
                          },
                        ],
                      }}
                    />
                  </div>
                </Col>
                <Col md="3">
                  <div style={{ width: 175, height: 175 }}>
                    <Pie
                      options={{
                        plugins: {
                          legend: {
                            display: true,
                            position: "bottom",
                            align: "center",
                            labels: {
                              usePointStyle: true,
                            },
                          },
                          title: {
                            display: true,
                            text: "Female",
                          },
                        },
                      }}
                      data={{
                        labels: ["Working", "Out of Service"],
                        datasets: [
                          {
                            label: "Female",
                            data: [
                              femaleWorking.toFixed(2),
                              (100 - femaleWorking).toFixed(2),
                            ],
                            backgroundColor: ["#3eb3dc", "blue"],
                          },
                        ],
                      }}
                    />
                  </div>
                </Col>
                <Col md={{ value: 4, offset: 2 }}>
                  <div style={{ width: 120, height: 120 }}>
                    <Pie
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                            position: "bottom",
                            align: "start",
                            labels: {
                              usePointStyle: true,
                            },
                          },
                          title: {
                            display: true,
                            text: "Assisted Change Room",
                          },
                        },
                      }}
                      data={{
                        labels: ["Working", "Out of Service"],
                        datasets: [
                          {
                            label: "Male",
                            data: [
                              assistedChangeWorking.toFixed(2),
                              (100 - assistedChangeWorking).toFixed(2),
                            ],
                            backgroundColor: ["#3eb3dc", "blue"],
                          },
                        ],
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
            <Card className="border-0 my-3">
              <CardHeader className="border-0 statistic-card-header">
                Daily Utilization
              </CardHeader>
              <Row className="mt-3">
                <Col md="4" className="text-center font-size-16">
                  <img src={maleIcon} width="50" height="50" className="mr-2" />
                  {`${maleWorking.toFixed(2)}%`}
                </Col>
                <Col md="4" className="text-center font-size-16">
                  <img
                    src={femaleIcon}
                    width="50"
                    height="50"
                    className="mr-2"
                  />
                  {`${femaleWorking.toFixed(2)}%`}
                </Col>
                <Col md="4" className="text-center font-size-16">
                  <img
                    src={disabledManIcon}
                    width="50"
                    height="50"
                    className="mr-2"
                  />
                  <span className="bg-success text-white p-2">CLEAN</span>
                </Col>
              </Row>
            </Card>
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Smart Washroom
              </CardHeader>
              <Row className="mt-3">
                <Col>
                  <Table
                    bordered
                    dataSource={smartWashroomData}
                    rowKey="id"
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 800, y: 160 }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md="7">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header pb-0">
                Indoor Air Quality
              </CardHeader>
              <ConferenceRoom />
              <MeetingRoom1 />
              <MeetingRoom2 />
              <MeetingRoom3 />
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ExperienceDashboard;
