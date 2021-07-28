import React from "react";
import { Row, Col } from "antd";
import moment from "moment";
import StatisticCard from "../../core/components/StatisticCardNumberFirst";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

const EscalationCards = ({ dateRange, data }) => {
  const filteredData = data.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );

  const escalatedL1 = filteredData.filter(
    (item) => item.status === "Escalated L1"
  ).length;
  const escalatedL2 = filteredData.filter(
    (item) => item.status === "Escalated L2"
  ).length;
  const escalatedL3 = filteredData.filter(
    (item) => item.status === "Escalated L3"
  ).length;

  return (
    <Row>
      <Col sm={8} xs={24} className="text-center px-3">
        <StatisticCard title="Escalated L1" value={escalatedL1} />
      </Col>
      <Col sm={8} xs={24} className="text-center px-3">
        <StatisticCard title="Escalated L2" value={escalatedL2} />
      </Col>
      <Col sm={8} xs={24} className="text-center px-3">
        <StatisticCard title="Escalated L3" value={escalatedL3} />
      </Col>
    </Row>
  );
};

export default EscalationCards;
