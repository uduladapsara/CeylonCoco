import DashboardLayout from "./DashboardLayout.jsx";

const FinanceLayout = () => (
  <DashboardLayout
    title="Finance"
    badge="Revenue Center"
    navItems={[{ label: "Dashboard", to: "/finance/dashboard" }]}
  />
);

export default FinanceLayout;
