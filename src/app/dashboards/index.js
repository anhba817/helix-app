import React, { useState } from "react";
import "./dashboard.scss";
import EngineeringDashboard from "./EngineeringDashboard/index";
import AssetsManagementDashboard from "./AssetsManagementDashboard/index";
import AssetsDashboard from "./AssetsDashboard";
import WorkOrdersDashboard from "./WorkOrdersDashboard";
import TPEngineeringDashboard from "./TPEngineeringDashboard";
import WorkplaceManagement from "./WorkplaceManagement/index";
import ExperienceDashboard from "./ExperienceDashboard/index";

const Dashboards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const getDashboard = (index) => {
    switch (index) {
      case 0:
        return (
          <EngineeringDashboard
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 1:
        return (
          <AssetsManagementDashboard
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 2:
        return (
          <AssetsDashboard
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 3:
        return (
          <WorkOrdersDashboard
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 4:
        return (
          <TPEngineeringDashboard
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 5:
        return (
          <WorkplaceManagement
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 6:
        return (
          <ExperienceDashboard
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      default:
        return (
          <EngineeringDashboard
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
    }
  };
  return getDashboard(activeIndex);
};

export default Dashboards;
