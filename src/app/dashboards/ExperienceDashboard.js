import React, { useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "./dashboard.scss";

const ExperienceDashboard = ({ activeIndex, setActiveIndex }) => {
  return (
    <Card className="mt-2 p-0">
      <CardBody>
        <Row sm="12">
          <Col className="m-2">
            <Row className="d-flex justify-content-between align-items-center">
              <h3 className="text-mandy font-weight-bold">
                <i className="fa fa-cogs fa-2x mr-2" style={{color: "#3a4354"}} />
                Experience Dashboard
              </h3>
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
      </CardBody>
    </Card>
  );
};

export default ExperienceDashboard;
