import { NavLink } from "react-router-dom";

const Sidebar = ({ title, navItems }) => (
  <aside className="sidebar">
    <div className="sidebar-header">
      <div className="brand">
        <span className="brand-mark">CC</span>
        <div>
          <div className="brand-title">{title}</div>
          <div className="brand-subtitle">CeylonCoco Suite</div>
        </div>
      </div>
    </div>
    <nav className="sidebar-nav">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to}>
          {item.label}
        </NavLink>
      ))}
    </nav>
    <div className="sidebar-footer">
      <div className="support-card">
        <div className="support-title">Need help?</div>
        <p className="muted">Support is online 24/7 for critical ops.</p>
        <button className="ghost-button" type="button">Contact Support</button>
      </div>
    </div>
  </aside>
);

export default Sidebar;
