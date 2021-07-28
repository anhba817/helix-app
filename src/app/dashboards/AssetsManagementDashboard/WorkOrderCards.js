import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import StatisticCard from "../../core/components/StatisticCardNumberFirst";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

const WorkOrderCards = ({ dateRange, data }) => {
  const filteredData = data.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );

  const scheduled = filteredData.filter((item) => item.status === "Scheduled")
    .length;
  const not_assigned = filteredData.filter(
    (item) => item.status === "Not Assigned"
  ).length;

  const today = moment();
  const expired = filteredData.filter(
    (item) => moment(item.date, dateFormat) <= today
  ).length;
  const soon_to_expire = filteredData.filter(
    (item) => today.diff(moment(item.date, dateFormat), "days") <= 30
  ).length;

  return (
    <Row>
      <Col sm={4} xs={24} className="text-center">
        <StatisticCard title="Scheduled" value={scheduled} />
      </Col>
      <Col sm={4} xs={24} className="text-center">
        <StatisticCard title="Not Assigned" value={not_assigned} />
      </Col>
      <Col sm={8} xs={24} className="text-center px-3">
        <StatisticCard title="SLA About To Expire" value={soon_to_expire} />
      </Col>
      <Col sm={8} xs={24} className="text-center px-3">
        <StatisticCard title="SLA Expired" value={expired} />
      </Col>
    </Row>
  );
};

export default WorkOrderCards;
