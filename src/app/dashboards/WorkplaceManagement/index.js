import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Button, Select, Table } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import apiClient from "../../util/axios";
import moment from "moment";
import DateSliderWithPicker from "../../core/components/DateSliderWithPicker";
import StatisticCardWithIcon from "../../core/components/StatisticCardWithIcon";
import HalfDonutChart from "../../core/components/HalfDonutChart/index";
import covidIcon from "../../images/icons/covid.svg";
import recoveryIcon from "../../images/icons/recovery.svg";
import buildingIcon from "../../images/icons/building.svg";
import gaugeIcon from "../../images/icons/gauge.svg";
import seatIcon from "../../images/icons/seat.svg";
import workingHoursIcon from "../../images/icons/working_hours.svg";
import employeeIcon from "../../images/icons/employees.svg";
import absentIcon from "../../images/icons/absent.svg";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const WorkplaceManagement = ({ activeIndex, setActiveIndex }) => {
  const [dateRange, setDateRange] = useState([]);
  const [covidData, setCovidData] = useState([]);
  const [meetingRoomData, setMeetingRoomData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("date");

  const onChangeDateRange = (values) => {
    setDateRange(values);
  };

  useEffect(() => {
    apiClient
      .get("/covid")
      .then((response) => {
        if (response) {
          setCovidData(response.data);
        }
      })
      .catch((err) => console.log(err));

    apiClient
      .get("/meeting-room-occupancies")
      .then((response) => {
        if (response) {
          setMeetingRoomData(response.data);
        }
      })
      .catch((err) => console.log(err));

    apiClient
      .get("/attendance-management")
      .then((response) => {
        if (response) {
          setAttendanceData(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/critical-alerts")
      .then((response) => {
        if (response) {
          setCriticalAlerts(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/employees")
      .then((response) => {
        if (response) {
          setEmployees(response.data);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  const allData = [
    ...covidData,
    ...meetingRoomData,
    ...attendanceData,
    ...criticalAlerts,
    ...employees,
  ].map((a) => a.date);
  const minDate = allData.reduce(
    (a, b) => (moment(a, dateFormat) > moment(b, dateFormat) ? b : a),
    "01/01/2021"
  );

  const maxDate = allData.reduce(
    (a, b) => (moment(a, dateFormat) < moment(b, dateFormat) ? b : a),
    "01/01/2021"
  );

  const filteredCovidData = covidData.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );

  const activeCovidCases = filteredCovidData.filter(
    (item) => item.status === "Active"
  ).length;

  const newCovidCases = filteredCovidData.filter(
    (item) => item.status === "New"
  ).length;

  const recoveredCovidCases = filteredCovidData.filter(
    (item) => item.status === "Recovered"
  ).length;

  const filteredMeetingRoomData = meetingRoomData.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );

  const meetingRoomOccupancy =
    filteredMeetingRoomData.filter((item) => item.status === "Occupied")
      .length / filteredMeetingRoomData.length;

  const avgSeatVacant =
    filteredMeetingRoomData.reduce((a, b) => a + b.seats_vacant, 0) /
    filteredMeetingRoomData.length;
  const avgEfficiency =
    filteredMeetingRoomData.reduce(
      (a, b) => a + b.seats_vacant / b.total_seats,
      0
    ) / filteredMeetingRoomData.length;

  const reportedIssues = criticalAlerts
    .map((item) => item.reported_issue)
    .filter(onlyUnique);
  const issueTableData = reportedIssues.map((issue) => ({
    issue,
    count: criticalAlerts.filter((a) => a.reported_issue === issue).length,
  }));

  const filteredEmployees = employees.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );

  const total_working_hrs = filteredEmployees.reduce(
    (a, b) => a + b.working_hrs,
    0
  );

  const agreed_man_hrs = filteredEmployees.reduce(
    (a, b) => a + b.agreed_man_hrs,
    0
  );

  const avgAbsentRate =
    filteredEmployees.reduce(
      (a, b) => a + Number(b.absenteesim_rate.slice(0, -1)),
      0
    ) /
    filteredEmployees.length /
    100;

  const issueColumns = [
    {
      title: <div className="font-weight-bold">Reported Issue</div>,
      dataIndex: "issue",
      className: "font-weight-normal table-column",
      sorter: (a, b) => a.issue.length - b.issue.length,
    },
    {
      title: <div className="font-weight-bold">Count of Reported Issue</div>,
      dataIndex: "count",
      className: "font-weight-normal table-column",
    },
  ];

  const attendanceColumns = [
    {
      title: <div className="font-weight-bold font-size-11">Site</div>,
      dataIndex: "site",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Team</div>,
      dataIndex: "team",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11">
          Scheduled Work hrs/day
        </div>
      ),
      dataIndex: "scheduled_hrs_per_day",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: (
        <div className="font-weight-bold font-size-11">
          Performed Work hrs/day
        </div>
      ),
      dataIndex: "performed_hrs_per_day",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Deviation</div>,
      dataIndex: "deviation",
      className: "font-weight-normal table-column font-size-11",
    },
    {
      title: <div className="font-weight-bold font-size-11">Action</div>,
      dataIndex: "action",
      className: "font-weight-normal table-column font-size-11",
      sorter: (a, b) => a.issue.length - b.issue.length,
    },
  ];

  return (
    <Card className="mt-2 p-0">
      <CardBody>
        <Row sm="12">
          <Col className="m-2">
            <Row className="position-relative">
              <Col md="6">
                <h2 className="text-mandy font-weight-bold">
                  <i
                    className="fa fa-building fa-2x mr-2"
                    style={{ color: "#3a4354" }}
                  />
                  Workplace Management
                </h2>
              </Col>
              <Col md={{ value: 2, offset: 2 }}>
                <div className="d-flex flex-column mt-3">
                  <Select
                    options={[{ value: "date", label: "Date" }]}
                    value={filter}
                    bordered={false}
                    onSelect={(value) => setFilter(value)}
                    style={{ minWidth: 100 }}
                  />
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
        <Row sm="12" className="mt-3">
          <Col md="6">
            <Row>
              <Col md="4" className="mt-4">
                <StatisticCardWithIcon
                  icon={
                    <img
                      src={covidIcon}
                      width="50"
                      height="50"
                      style={{ marginTop: -8 }}
                    />
                  }
                  value={activeCovidCases}
                  title="Active COVID Cases"
                />
              </Col>
              <Col md="4" className="mt-4">
                <StatisticCardWithIcon
                  icon={<UnorderedListOutlined style={{ fontSize: 38 }} />}
                  value={newCovidCases}
                  title="Today's New Cases"
                />
              </Col>
              <Col md="4" className="mt-4">
                <StatisticCardWithIcon
                  icon={
                    <img
                      src={recoveryIcon}
                      width="50"
                      height="50"
                      style={{ marginTop: -8 }}
                    />
                  }
                  value={recoveredCovidCases}
                  title="Total Recoveries"
                />
              </Col>
              <Col md="4" className="mt-4">
                <StatisticCardWithIcon
                  icon={
                    <img
                      src={buildingIcon}
                      width="50"
                      height="50"
                      style={{ marginTop: -8 }}
                    />
                  }
                  value={`${(meetingRoomOccupancy * 100).toFixed(2)}%`}
                  title="Meeting Room Occupancy"
                />
              </Col>
              <Col md="4" className="mt-4">
                <StatisticCardWithIcon
                  icon={
                    <img
                      src={gaugeIcon}
                      width="46"
                      height="46"
                      style={{ marginTop: -8 }}
                    />
                  }
                  value={`${((1 - avgEfficiency) * 100).toFixed(2)}%`}
                  title="Average Efficiency of Booking"
                />
              </Col>
              <Col md="4" className="mt-4">
                <StatisticCardWithIcon
                  icon={
                    <img
                      src={seatIcon}
                      width="50"
                      height="50"
                      style={{ marginTop: -8 }}
                    />
                  }
                  value={avgSeatVacant.toFixed(2)}
                  title="Seats Vacant"
                />
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Attendance Management
              </CardHeader>
              <Table
                bordered
                dataSource={issueTableData}
                rowKey="issue"
                columns={issueColumns}
                pagination={false}
                scroll={{ y: 180 }}
                className="mt-3"
              />
            </Card>
          </Col>
        </Row>
        <Row sm="12" className="my-3">
          <Col md="6">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Attendance Management
              </CardHeader>
              <Table
                bordered
                dataSource={attendanceData}
                rowKey="id"
                columns={attendanceColumns}
                pagination={false}
                scroll={{ y: 180 }}
                className="mt-3"
              />
            </Card>
          </Col>
          <Col md="6">
            <Row>
              <Col md="6" className="mt-4">
                <StatisticCardWithIcon
                  icon={
                    <img
                      src={workingHoursIcon}
                      width="60"
                      height="60"
                      style={{ marginTop: -8 }}
                    />
                  }
                  value={total_working_hrs}
                  title="Total Working Hours"
                />
              </Col>
              <Col md="6" className="mt-4">
                <StatisticCardWithIcon
                  icon={
                    <img
                      src={employeeIcon}
                      width="60"
                      height="60"
                      style={{ marginTop: -8 }}
                    />
                  }
                  value={agreed_man_hrs}
                  title="Agreed Man Hours/Day"
                />
              </Col>
              <Col md="6" className="mt-4">
                <StatisticCardWithIcon
                  icon={
                    <img
                      src={employeeIcon}
                      width="60"
                      height="60"
                      style={{ marginTop: -8 }}
                    />
                  }
                  value={filteredEmployees.length}
                  title="Employee ID"
                />
              </Col>
              <Col md="6" className="mt-4">
                <div className="font-weight-normal position-relative">
                  <img
                    src={absentIcon}
                    width="60"
                    height="60"
                    style={{ marginTop: -8, marginRight: 16 }}
                  />
                  Absenteesim Rate
                  <HalfDonutChart
                    // style={{ height: 250 }}
                    animDelay={0}
                    percent={avgAbsentRate}
                    arcsLength={[avgAbsentRate, 1 - avgAbsentRate]}
                    colors={["#1497ea", "#cdcdcd"]}
                    textColor="#3a4354"
                    arcPadding={0}
                    cornerRadius={0}
                    id="gauge-chart-1"
                    showScaleValues
                    thresholdConfig={{ value: 0.08, color: "blue" }}
                    arcWidth={0.3}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default WorkplaceManagement;
