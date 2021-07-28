import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import StatisticCard from "../../core/components/StatisticCard";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

const AssetQuipmentCards = ({ dateRange, data }) => {
  const filteredData = data.filter(
    (item) =>
      moment(item.date, dateFormat) >= moment(dateRange[0], dateFormat) &&
      moment(item.date, dateFormat) <= moment(dateRange[1], dateFormat)
  );
  const breakDown = filteredData.filter((item) => item.status === "Breakdown")
    .length;
  const underMaintenance = filteredData.filter(
    (item) => item.status === "Under Maintenance"
  ).length;
  const operative_items = filteredData.filter(
    (item) => item.status === "Operative"
  );
  const operative = operative_items.length;

  const today = moment();
  const soon_to_expire = filteredData.filter(
    (item) => moment(item.warranty_date, dateFormat).diff(today, "days") <= 30
  ).length;

  const average_healthy =
    filteredData.length > 0
      ? Math.round(
          filteredData.reduce((a, b) => a + b.healthy_hrs, 0) /
            filteredData.length
        )
      : 0;

  const total_downtime = filteredData.reduce(
    (a, b) => a + b.total_downtime_hrs,
    0
  );

  const operative_time = operative_items.reduce((a, b) => a + b.healthy_hrs, 0);

  const total_healthy = filteredData.reduce((a, b) => a + b.healthy_hrs, 0);

  const uptime_percentage =
    Math.round((operative_time * 10000) / total_healthy) / 100.0;

  return (
    <Row gutter={8}>
      <Col md={3} sm={8} xs={24} className="text-center px-3">
        <StatisticCard
          title="Break down"
          value={breakDown}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col md={4} sm={8} xs={24} className="text-center px-3">
        <StatisticCard
          title="Under Maintenance"
          value={underMaintenance}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col md={3} sm={8} xs={24} className="text-center px-3">
        <StatisticCard
          title="Operative"
          value={operative}
          total={filteredData.length}
          showPercentage
        />
      </Col>
      <Col md={3} sm={8} xs={24} className="text-center px-3">
        <StatisticCard title="Warranty Soon To Expire" value={soon_to_expire} />
      </Col>
      <Col md={4} sm={8} xs={24} className="text-center px-3">
        <StatisticCard
          title="Actual Healthy Hrs for the Month"
          value={average_healthy}
        />
      </Col>
      <Col md={4} sm={8} xs={24} className="text-center px-3">
        <StatisticCard
          title="Total Downtime Hrs for the Month"
          value={total_downtime}
        />
      </Col>
      <Col md={3} sm={8} xs={24} className="text-center px-3">
        <StatisticCard title="Uptime %" value={`${uptime_percentage}%`} />
      </Col>
    </Row>
  );
};

export default AssetQuipmentCards;
