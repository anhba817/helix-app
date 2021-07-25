import React from "react";
import homeIconBlue from "@images/icons/homeBlue.svg";
import { DashboardOutlined } from "@ant-design/icons";

export const Menus = [
  {
    title: "Home",
    name: "HOME",
    displayName: "Home",
    path: "/",
    icon: <img src={homeIconBlue} width="30" height="30" />,
  },
  {
    title: "Dashboards",
    name: "DASHBOARDS",
    displayName: "Dashboards",
    path: "/dashboards",
    icon: <DashboardOutlined style={{ fontSize: 32 }}/>,
  },
  //   {
  //     title: "Helpdesk",
  //     name: "HELPDESK",
  //     displayName: "Helpdesk",
  //     path: "/helpdesk-overview",
  //   },
  //   {
  //     title: "Asset Registry",
  //     name: "ASSETS",
  //     displayName: "Assets",
  //     path: "/asset-overview",
  //   },
  //   {
  //     title: "Work Orders",
  //     name: "WORK ORDERS",
  //     displayName: "Work Orders",
  //     path: "/workorders-overview",
  //   },
  //   {
  //     title: "Analytics",
  //     name: "ANALYTICS",
  //     displayName: "Analytics",
  //     path: "/analytics",
  //   },
  //   {
  //     title: "HSpace - Space Management",
  //     name: "SPACE MANAGEMENT",
  //     displayName: "Space Management",
  //     path: "/space-management",
  //   },
  //   {
  //     title: "Preventive Maintenance",
  //     name: "PREVENTIVE MAINTENANCE",
  //     displayName: "Preventive Maintenance",
  //     path: "/preventive-viewer",
  //   },
  //   {
  //     title: "HR Settings",
  //     name: "HR SETTINGS",
  //     displayName: "HR Settings",
  //     path: "/hr/employees",
  //   },
  //   {
  //     title: "Admin Setup",
  //     name: "ADMIN SETUP",
  //     displayName: "Admin Setup",
  //     path: "/admin-setup",
  //   },
];
