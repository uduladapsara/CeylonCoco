import DashboardLayout from "./DashboardLayout.jsx";

const ManagerLayout = () => (
	<DashboardLayout
		title="Farm Manager"
		badge="Plantation Ops"
		navItems={[
			{ label: "Plantation", to: "/manager/dashboard" },
			{ label: "Labour", to: "/manager/labour" },
			{ label: "Tasks", to: "/manager/tasks" }
		]}
	/>
);

export default ManagerLayout;
