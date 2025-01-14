import React, { useState, useEffect } from "react";
import apiClient from "../../util/axios";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Button, Table, Select } from "antd";
import { Pie } from "react-chartjs-2";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import moment from "moment";
import DateSliderWithPicker from "../../core/components/DateSliderWithPicker";
import ConferenceRoom from "./ConferenceRoom";
import MeetingRoom1 from "./MeetingRoom1";
import MeetingRoom2 from "./MeetingRoom2";
import MeetingRoom3 from "./MeetingRoom3";
import tileIcon from "../../images/icons/tiles.svg";
import maleIcon from "../../images/icons/male.svg";
import femaleIcon from "../../images/icons/female.svg";
import disabledManIcon from "../../images/icons/disabledMan.svg";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const ExperienceDashboard = ({ activeIndex, setActiveIndex }) => {
  const [washroomAvaiData, setWashroomAvaiData] = useState([]);
  const [smartWashroomData, setSmartWashroomData] = useState([]);
  const [conferenceRoomData, setConferenceRoomData] = useState([]);
  const [meetingRoom1Data, setMeetingRoom1Data] = useState([]);
  const [meetingRoom2Data, setMeetingRoom2Data] = useState([]);
  const [meetingRoom3Data, setMeetingRoom3Data] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [filter, setFilter] = useState("site");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);

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
    apiClient
      .get("/air-quality/conference-room")
      .then((response) => {
        if (response) {
          setConferenceRoomData(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/air-quality/meeting-room-1")
      .then((response) => {
        if (response) {
          setMeetingRoom1Data(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/air-quality/meeting-room-2")
      .then((response) => {
        if (response) {
          setMeetingRoom2Data(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/air-quality/meeting-room-3")
      .then((response) => {
        if (response) {
          setMeetingRoom3Data(response.data);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  const onChangeDateRange = (values) => {
    setDateRange(values);
  };

  const allData = [
    ...washroomAvaiData,
    ...smartWashroomData,
    ...conferenceRoomData,
    ...meetingRoom1Data,
    ...meetingRoom2Data,
    ...meetingRoom3Data,
  ].map((a) => a.date);
  const minDate = allData.reduce(
    (a, b) => (moment(a, dateFormat) > moment(b, dateFormat) ? b : a),
    "01/01/2021"
  );

  const maxDate = allData.reduce(
    (a, b) => (moment(a, dateFormat) < moment(b, dateFormat) ? b : a),
    "01/01/2021"
  );

  const options = [
    ...washroomAvaiData,
    ...smartWashroomData,
    ...conferenceRoomData,
    ...meetingRoom1Data,
    ...meetingRoom2Data,
    ...meetingRoom3Data,
  ]
    .map((item) => (filter in item ? item[filter] : null))
    .filter((it) => it)
    .filter(onlyUnique);

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

  const filteredWashroomAvaiData = washroomAvaiData
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
  const filteredSmartWashroomAvaiData = smartWashroomData
    .filter(
      (item) =>
        moment(item.date, "MM/DD/YYYY hh:mm A") >=
          moment(dateRange[0], dateFormat) &&
        moment(item.date, "MM/DD/YYYY hh:mm A") <=
          moment(dateRange[1], dateFormat)
    )
    .filter((item) =>
      filter in item && selectedFilter !== "All"
        ? item[filter] === selectedFilter
        : true
    );
  const filteredConferenceRoomData = conferenceRoomData
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
  const filteredMeetingRoom1Data = meetingRoom1Data
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
  const filteredMeetingRoom2Data = meetingRoom2Data
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
  const filteredMeetingRoom3Data = smartWashroomData
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
  const femaleWashroom = filteredWashroomAvaiData.filter(
    (item) => item.washroom === "Female"
  );
  const femaleWorking =
    (femaleWashroom.filter((item) => item.availability === "Working").length /
      femaleWashroom.length) *
    100;
  const maleWashroom = filteredWashroomAvaiData.filter(
    (item) => item.washroom === "Male"
  );
  const maleWorking =
    (maleWashroom.filter((item) => item.availability === "Working").length /
      maleWashroom.length) *
    100;

  const assistedChangeRoom = filteredWashroomAvaiData.filter(
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
            <Row className="position-relative">
              <Col md="6">
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
              </Col>
              <Col md="4">
                <div className="d-flex mt-3">
                  <div className="d-flex flex-column mr-3">
                    <Select
                      options={[{ value: "site", label: "Site" }]}
                      value={filter}
                      onSelect={(value) => setFilter(value)}
                      style={{ minWidth: 100 }}
                    />
                    <Select
                      options={["All", ...options].map((vl) => ({
                        value: vl,
                        label: vl,
                      }))}
                      value={selectedFilter}
                      onSelect={(value) => setSelectedFilter(value)}
                      style={{ minWidth: 100 }}
                    />
                  </div>
                  {!loading && (
                    <DateSliderWithPicker
                      start={minDate}
                      end={maxDate}
                      onChange={onChangeDateRange}
                    />
                  )}
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
                    dataSource={filteredSmartWashroomAvaiData}
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
              <ConferenceRoom data={filteredConferenceRoomData} />
              <MeetingRoom1 data={filteredMeetingRoom1Data} />
              <MeetingRoom2 data={filteredMeetingRoom2Data} />
              <MeetingRoom3 data={filteredMeetingRoom3Data} />
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ExperienceDashboard;
