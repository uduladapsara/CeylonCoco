import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar/Sidebar.jsx";

const DashboardLayout = ({ title, navItems, badge }) => (
  <div className="dashboard-shell">
    <Sidebar title={title} navItems={navItems} />
    <div className="dashboard-main">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <span className="eyebrow">Operations Center</span>
          <h1 className="brand">{title}</h1>
          <p className="muted">CeylonCoco operational hub</p>
        </div>
        <div className="dashboard-meta">
          <span className="status-pill">Live</span>
          {badge ? <span className="badge">{badge}</span> : null}
        </div>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  </div>
);

export default DashboardLayout;
