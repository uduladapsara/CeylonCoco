import { NavLink } from "react-router-dom";

const Sidebar = ({ title, navItems }) => (
  <aside className="sidebar">
    <div className="brand">{title}</div>
    <div>
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to}>
          {item.label}
        </NavLink>
      ))}
    </div>
  </aside>
);

export default Sidebar;
