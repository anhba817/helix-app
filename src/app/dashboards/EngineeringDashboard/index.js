import React, { useState, useEffect } from "react";
import apiClient from "../../util/axios";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "../dashboard.scss";
import FanIcon from "@images/icons/fan.svg";
import AlarmIcon from "@images/icons/alarm_light.svg";
import PowerConsumtionTable from "./PowerConsumtionTable";
import PowerChart from "./PowerChart";
import AirQualityTable from "./AirQualityTable";
import CriticalAlarmsTable from "./CriticalAlarmsTable";
import CommodityTransactionTable from "./CommodityTransactionTable";
import StatisticCard from "./StatisticCard";

const EngineeringDashboard = ({ activeIndex, setActiveIndex }) => {
  const [temperatures, setTemperatures] = useState([]);
  const [humidities, setHumidities] = useState([]);
  const [co2Levels, setCo2Levels] = useState([]);
  const [luminances, setLuminances] = useState([]);

  useEffect(() => {
    apiClient
      .get("/air-quality")
      .then((response) => {
        if (response) {
          setTemperatures(response.data.map((d) => d.temperature));
          setHumidities(response.data.map((d) => d.humidity));
          setCo2Levels(response.data.map((d) => d.co2));
          setLuminances(response.data.map((d) => d.luminance));
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Card className="mt-2 p-0">
      <CardBody>
        <Row sm="12">
          <Col className="m-2">
            <Row className="d-flex justify-content-between align-items-center">
              <h2 className="text-mandy font-weight-bold">
                <i
                  className="fa fa-cogs fa-2x mr-2"
                  style={{ color: "#3a4354" }}
                />
                Engineering Dashboard
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
        <Row sm="12">
          <Col md="9" className="my-2">
            <Row>
              <Col lg="6">
                <div className="text-center">
                  <h4 className="font-weight-bold mt-4">
                    <i className="fa fa-bolt mr-3" />
                    Power Consumption
                  </h4>
                </div>
                <PowerConsumtionTable />
                <PowerChart />
              </Col>
              <Col lg="6">
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
                  <AirQualityTable />
                </div>
              </Col>
              <Col sm="6">
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
                  <CriticalAlarmsTable />
                </div>
              </Col>
              <Col sm="6">
                <div className="text-center">
                  <h4 className="font-weight-bold mt-4">
                    <i className="fa fa-arrows-h mr-3" />
                    Commodity Transaction
                  </h4>
                  <CommodityTransactionTable />
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="3" className="my-2">
            <Row>
              <Col sm="12">
                <StatisticCard
                  title="Temperature (C)"
                  goal={27}
                  data={temperatures}
                />
              </Col>
              <Col sm="12">
                <StatisticCard
                  title="Humidity (%)"
                  goal={10}
                  data={humidities}
                />
              </Col>
              <Col sm="12">
                <StatisticCard title="CO2 Level" goal={10} data={co2Levels} />
              </Col>
              <Col sm="12">
                <StatisticCard title="Luminance" goal={10} data={luminances} />
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default EngineeringDashboard;
