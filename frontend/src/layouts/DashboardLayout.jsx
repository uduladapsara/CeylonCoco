import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar/Sidebar.jsx";

const DashboardLayout = ({ title, navItems, badge }) => (
  <div className="dashboard-shell">
    <Sidebar title={title} navItems={navItems} />
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1 className="brand">{title}</h1>
          <p className="muted">CeylonCoco operational hub</p>
        </div>
        {badge ? <span className="badge">{badge}</span> : null}
      </div>
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
