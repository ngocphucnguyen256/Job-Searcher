import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SideMenuItem from "../components/SideMenuItem";

export const mainListItems = (
  <React.Fragment>
    <SideMenuItem
      name="Thông tin của tôi"
      icon={<DashboardIcon />}
      link="/dashboard/home"
    />
  </React.Fragment>
);

export const secondaryListItems = <React.Fragment></React.Fragment>;
