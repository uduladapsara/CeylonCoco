import DashboardLayout from "./DashboardLayout.jsx";

const WarehouseLayout = () => (
  <DashboardLayout
    title="Warehouse"
    badge="Stock Ops"
    navItems={[{ label: "Inventory", to: "/warehouse/inventory" }]}
  />
);

export default WarehouseLayout;
