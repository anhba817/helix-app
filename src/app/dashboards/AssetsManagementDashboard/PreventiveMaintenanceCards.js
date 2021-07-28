import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import StatisticCard from "../../core/components/StatisticCard";
import StatisticCardNumberFirst from "../../core/components/StatisticCardNumberFirst";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

const PreventiveMaintenanceCards = ({ dateRange, data }) => {
  const filteredData = data.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );

  const dailyItems = filteredData.filter((item) => item.frequency === "Daily")
    .length;
  const weeklyItems = filteredData.filter((item) => item.frequency === "Weekly")
    .length;
  const monthlyItems = filteredData.filter(
    (item) => item.frequency === "Monthly"
  ).length;
  const delayedItems = filteredData.filter((item) => item.status === "Delayed")
    .length;
  return (
    <Row gutter={8}>
      <Col sm={6} xs={24} className="text-center px-3">
        <StatisticCard
          title="Daily"
          value={dailyItems}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col sm={6} xs={24} className="text-center px-3">
        <StatisticCard
          title="Weekly"
          value={weeklyItems}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col sm={6} xs={24} className="text-center px-3">
        <StatisticCard
          title="Monthly"
          value={monthlyItems}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col sm={6} xs={24} className="text-center px-3">
        <StatisticCardNumberFirst title="Delayed" value={delayedItems} />
      </Col>
    </Row>
  );
};

export default PreventiveMaintenanceCards;
