import DashboardLayout from "./DashboardLayout.jsx";

const CustomerLayout = () => (
	<DashboardLayout
		title="Customer"
		badge="Marketplace"
		navItems={[
			{ label: "Profile", to: "/customer/profile" },
			{ label: "Orders", to: "/customer/orders" },
			{ label: "Cart", to: "/customer/cart" }
		]}
	/>
);

export default CustomerLayout;
