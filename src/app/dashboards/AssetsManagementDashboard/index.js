import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Button, Select } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import apiClient from "../../util/axios";
import moment from "moment";
import DateSliderWithPicker from "../../core/components/DateSliderWithPicker";
import assetsManagementIcon from "../../images/icons/assetsManagement.svg";
import AssetQuipmentCards from "./AssetQuipmentCards";
import HelpdeskTicketCards from "./HelpdeskTicketCards";
import WorkOrderCards from "./WorkOrderCards";
import EscalationCards from "./EscalationCards";
import PreventiveMaintenanceCards from "./PreventiveMaintenanceCards";
import ExternalVisitorCards from "./ExternalVisitorCards";
import VisitorCards from "./VisitorCards";
import BuildingComplianceTable from "./BuildingComplianceTable";
import InventoryTable from "./InventoryTable";
import "../dashboard.scss";

const dateFormat = "MM/DD/YYYY";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const AssetsManagementDashboard = ({ activeIndex, setActiveIndex }) => {
  const [dateRange, setDateRange] = useState([]);
  const [assetEquipmentData, setAssetEquipmentData] = useState([]);
  const [workOrderData, setWorkOrderData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [preventiveMaintenances, setPreventiveMaintenances] = useState([]);
  const [externalVisitors, setExternalVisitors] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [buildingCompliances, setBuildingCompliances] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("site");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const onChangeDateRange = (values) => {
    setDateRange(values);
  };

  useEffect(() => {
    apiClient
      .get("/assets-equipments")
      .then((response) => {
        if (response) {
          setAssetEquipmentData(response.data);
        }
      })
      .catch((err) => console.log(err));

    apiClient
      .get("/work-order-schedules")
      .then((response) => {
        if (response) {
          setWorkOrderData(response.data);
        }
      })
      .catch((err) => console.log(err));

    apiClient
      .get("/tickets")
      .then((response) => {
        if (response) {
          setTickets(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/preventive-maintenances")
      .then((response) => {
        if (response) {
          setPreventiveMaintenances(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/external-visitors")
      .then((response) => {
        if (response) {
          setExternalVisitors(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/visitors")
      .then((response) => {
        if (response) {
          setVisitors(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/inventory")
      .then((response) => {
        if (response) {
          setInventoryData(response.data);
        }
      })
      .catch((err) => console.log(err));
    apiClient
      .get("/building-compliances")
      .then((response) => {
        if (response) {
          setBuildingCompliances(response.data);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  const allData = [
    ...assetEquipmentData,
    ...workOrderData,
    ...tickets,
    ...preventiveMaintenances,
    ...externalVisitors,
    ...visitors,
    ...inventoryData,
    ...buildingCompliances,
  ].map((a) => a.date);
  const minDate = allData.reduce(
    (a, b) => (moment(a, dateFormat) > moment(b, dateFormat) ? b : a),
    "01/01/2021"
  );

  const maxDate = allData.reduce(
    (a, b) => (moment(a, dateFormat) < moment(b, dateFormat) ? b : a),
    "01/01/2021"
  );

  const options = inventoryData.map((item) => item[filter]).filter(onlyUnique);

  return (
    <Card className="mt-2 p-0">
      <CardBody>
        <Row sm="12">
          <Col className="m-2">
            <Row className="position-relative">
              <Col md="6">
                <h2 className="text-mandy font-weight-bold">
                  <img
                    src={assetsManagementIcon}
                    width="50"
                    height="50"
                    className="mr-2"
                    style={{ marginTop: -8 }}
                  />
                  Assets Management Dashboard
                </h2>
              </Col>
              <Col md="4">
                <div className="d-flex mt-3">
                  <div className="d-flex flex-column mr-3">
                    <Select
                      options={[
                        { value: "site", label: "Site" },
                        { value: "product", label: "Product" },
                      ]}
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
          <Col className="mt-3">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Assets/Equipments
              </CardHeader>
              <CardBody>
                <AssetQuipmentCards
                  dateRange={dateRange}
                  data={assetEquipmentData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row sm="12">
          <Col md="5">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Work Orders
              </CardHeader>
              <CardBody>
                <WorkOrderCards dateRange={dateRange} data={workOrderData} />
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Helpdesk Tickets
              </CardHeader>
              <CardBody>
                <HelpdeskTicketCards dateRange={dateRange} data={tickets} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row sm="12">
          <Col md="5">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Escalation
              </CardHeader>
              <CardBody>
                <EscalationCards dateRange={dateRange} data={workOrderData} />
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Preventive Maintenance
              </CardHeader>
              <CardBody>
                <PreventiveMaintenanceCards
                  dateRange={dateRange}
                  data={preventiveMaintenances}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row sm="12">
          <Col md="5">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                External Vendors
              </CardHeader>
              <CardBody>
                <ExternalVisitorCards
                  dateRange={dateRange}
                  data={externalVisitors}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Visitors
              </CardHeader>
              <CardBody>
                <VisitorCards dateRange={dateRange} data={visitors} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row sm="12">
          <Col md="5">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Building Compliance
              </CardHeader>
              <CardBody className="px-1">
                <BuildingComplianceTable
                  dateRange={dateRange}
                  data={buildingCompliances}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card className="border-0">
              <CardHeader className="border-0 statistic-card-header">
                Inventory
              </CardHeader>
              <CardBody className="px-1">
                <InventoryTable
                  dateRange={dateRange}
                  data={inventoryData}
                  filter={filter}
                  selectedFilter={selectedFilter}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AssetsManagementDashboard;
