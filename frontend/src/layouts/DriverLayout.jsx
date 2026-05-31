import DashboardLayout from "./DashboardLayout.jsx";

const DriverLayout = () => (
	<DashboardLayout
		title="Driver"
		badge="Delivery Desk"
		navItems={[{ label: "Deliveries", to: "/driver/deliveries" }]}
	/>
);

export default DriverLayout;
