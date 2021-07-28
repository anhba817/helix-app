import React from "react";
import { Row, Col } from "antd";
import moment from "moment";
import StatisticCardNumberFirst from "../../core/components/StatisticCardNumberFirst";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

const VisitorCards = ({ dateRange, data }) => {
  const filteredData = data.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );

  const scheduled = filteredData.filter((item) => item.status === "Scheduled")
    .length;
  const currentInside = filteredData.filter(
    (item) => item.status === "Currently Inside"
  ).length;
  const canceled = filteredData.filter((item) => item.status === "Cancelled")
    .length;

  return (
    <Row>
      <Col sm={8} xs={24} className="text-center px-3">
        <StatisticCardNumberFirst title="Scheduled" value={scheduled} />
      </Col>
      <Col sm={8} xs={24} className="text-center px-3">
        <StatisticCardNumberFirst
          title="Currently Inside"
          value={currentInside}
        />
      </Col>
      <Col sm={8} xs={24} className="text-center px-3">
        <StatisticCardNumberFirst title="Cancelled" value={canceled} />
      </Col>
    </Row>
  );
};

export default VisitorCards;
