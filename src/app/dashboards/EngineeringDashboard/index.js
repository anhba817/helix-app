import React, { useState, useEffect } from "react";
import apiClient from "../../util/axios";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Button, Select } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import moment from "moment";
import DateSliderWithPicker from "../../core/components/DateSliderWithPicker";
import "../dashboard.scss";
import FanIcon from "@images/icons/fan.svg";
import AlarmIcon from "@images/icons/alarm_light.svg";
import PowerConsumtionTable from "./PowerConsumtionTable";
import PowerChart from "./PowerChart";
import AirQualityTable from "./AirQualityTable";
import CriticalAlarmsTable from "./CriticalAlarmsTable";
import CommodityTransactionTable from "./CommodityTransactionTable";
import StatisticCard from "./StatisticCard";

const dateFormat = "MM/DD/YYYY";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const EngineeringDashboard = ({ activeIndex, setActiveIndex }) => {
  const [airQualityData, setAirQualityData] = useState([]);
  const [powerConsumtions, setPowerConsumtion] = useState([]);
  const [criticalAlarms, setCriticalAlarms] = useState([]);
  const [commodityTransactions, setCommodityTransactions] = useState([]);

  const [dateRange, setDateRange] = useState([]);
  const [filter, setFilter] = useState("site");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/air-quality")
      .then((response) => {
        if (response) {
          setAirQualityData(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/power-consumtions")
      .then((response) => {
        if (response) {
          setPowerConsumtion(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/critical-alarms")
      .then((response) => {
        if (response) {
          setCriticalAlarms(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/commodity-transactions")
      .then((response) => {
        if (response) {
          setCommodityTransactions(response.data);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  const onChangeDateRange = (values) => {
    setDateRange(values);
  };

  const allData = [
    ...airQualityData,
    ...powerConsumtions,
    ...criticalAlarms,
    ...commodityTransactions,
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
    ...airQualityData,
    ...powerConsumtions,
    ...criticalAlarms,
    ...commodityTransactions,
  ]
    .map((item) => (filter in item ? item[filter] : null))
    .filter((it) => it)
    .filter(onlyUnique);

  return (
    <Card className="mt-2 p-0">
      <CardBody>
        <Row sm="12">
          <Col className="m-2">
            <Row className="position-relative">
              <Col md="6">
                <h2 className="text-mandy font-weight-bold">
                  <i
                    className="fa fa-cogs fa-2x mr-2"
                    style={{ color: "#3a4354" }}
                  />
                  Engineering Dashboard
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
        <Row sm="12">
          <Col md="6" className="my-2">
            <Row>
              <Col md="12">
                <div className="text-center">
                  <h4 className="font-weight-bold mt-4">
                    <i className="fa fa-bolt mr-3" />
                    Power Consumption
                  </h4>
                </div>
                <PowerConsumtionTable
                  loading={loading}
                  data={powerConsumtions}
                  dateRange={dateRange}
                  filter={filter}
                  selectedFilter={selectedFilter}
                />
                <PowerChart />
              </Col>
              <Col md="12">
                <div className="text-center">
                  <h4 className="font-weight-bold mt-4">
                    <img
                      src={FanIcon}
                      width="22"
                      height="22"
                      className="text-icon"
                    />
                    Air Quality
                  </h4>
                  <AirQualityTable
                    loading={loading}
                    data={airQualityData}
                    dateRange={dateRange}
                    filter={filter}
                    selectedFilter={selectedFilter}
                  />
                </div>
              </Col>
              <Col sm="6">
                <StatisticCard
                  title="Temperature (C)"
                  goal={27}
                  data={airQualityData.map((d) => d.temperature)}
                />
              </Col>
              <Col sm="6">
                <StatisticCard
                  title="Humidity (%)"
                  goal={10}
                  data={airQualityData.map((d) => d.humidity)}
                />
              </Col>
              <Col sm="6">
                <StatisticCard
                  title="CO2 Level"
                  goal={10}
                  data={airQualityData.map((d) => d.co2)}
                />
              </Col>
              <Col sm="6">
                <StatisticCard
                  title="Luminance"
                  goal={10}
                  data={airQualityData.map((d) => d.luminance)}
                />
              </Col>
            </Row>
          </Col>
          <Col md="6" className="my-2">
            <div className="text-center">
              <h4 className="font-weight-bold mt-4">
                <img
                  src={AlarmIcon}
                  width="22"
                  height="22"
                  className="text-icon"
                />
                Critical Alarms
              </h4>
              <CriticalAlarmsTable
                loading={loading}
                data={criticalAlarms}
                dateRange={dateRange}
                filter={filter}
                selectedFilter={selectedFilter}
              />
            </div>
          </Col>
        </Row>
        <Row sm="12">
          <Col sm="12">
            <div className="text-center">
              <h4 className="font-weight-bold mt-4">
                <i className="fa fa-arrows-h mr-3" />
                Commodity Transaction
              </h4>
              <CommodityTransactionTable
                loading={loading}
                data={commodityTransactions}
                dateRange={dateRange}
                filter={filter}
                selectedFilter={selectedFilter}
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default EngineeringDashboard;
