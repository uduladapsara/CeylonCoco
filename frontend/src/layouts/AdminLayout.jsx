import DashboardLayout from "./DashboardLayout.jsx";

const AdminLayout = () => (
	<DashboardLayout
		title="Admin"
		badge="System Control"
		navItems={[
			{ label: "Dashboard", to: "/admin/dashboard" },
			{ label: "Users", to: "/admin/users" },
			{ label: "Reports", to: "/admin/reports" },
			{ label: "Settings", to: "/admin/settings" }
		]}
	/>
);

export default AdminLayout;
