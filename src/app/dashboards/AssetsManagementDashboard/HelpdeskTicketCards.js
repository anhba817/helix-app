import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import StatisticCard from "../../core/components/StatisticCard";
import StatisticCardNumberFirst from "../../core/components/StatisticCardNumberFirst";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

const HelpdeskTicketCards = ({ dateRange, data }) => {
  const filteredData = data.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );

  const new_tickets = filteredData.filter((item) => item.status === "New")
    .length;
  const in_progress_tickets = filteredData.filter(
    (item) => item.status === "In Progress"
  ).length;
  const closed_tickets = filteredData.filter((item) => item.status === "Closed")
    .length;
  const withinSLA = filteredData.filter((item) => item.sla === "Within SLA")
    .length;
  const elapsedSLA = filteredData.filter((item) => item.sla === "Elapsed")
    .length;
  return (
    <Row gutter={8}>
      <Col sm={6} xs={24} className="text-center px-3">
        <StatisticCard
          title="New"
          value={new_tickets}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col sm={6} xs={24} className="text-center px-3">
        <StatisticCard
          title="In Progress"
          value={in_progress_tickets}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col sm={6} xs={24} className="text-center px-3">
        <StatisticCard
          title="Closed"
          value={closed_tickets}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col sm={3} xs={24} className="text-center px-3">
        <StatisticCardNumberFirst title="within SLA" value={withinSLA} />
      </Col>
      <Col sm={3} xs={24} className="text-center px-3">
        <StatisticCardNumberFirst title="SLA Elapsed" value={elapsedSLA} />
      </Col>
    </Row>
  );
};

export default HelpdeskTicketCards;
