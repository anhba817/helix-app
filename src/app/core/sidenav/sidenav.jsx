/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink, Col } from "reactstrap";
import { Tooltip } from "antd";
import { Menus } from "../../util/appAccess";

const Sidenav = () => {
  const location = useLocation();

  return (
    <Nav vertical className="sidenav">
      {Menus.map((menu) => (
        <NavItem key={menu.name}>
          <NavLink tag={Link} className="text-white text-center" to={menu.path}>
            <Tooltip title={menu.title} placement="right">
              <div className={location.pathname === menu.path ? "highlight" : "rect"}>
                {menu.icon}
              </div>
            </Tooltip>
          </NavLink>
          <Col sm="11 pl-4">
            <hr className="white-border border-top-2px mt-1 mb-1" />
          </Col>
        </NavItem>
      ))}
    </Nav>
  );
};

export default Sidenav;
