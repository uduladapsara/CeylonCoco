import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ManagerLayout from "../layouts/ManagerLayout.jsx";
import CustomerLayout from "../layouts/CustomerLayout.jsx";
import DriverLayout from "../layouts/DriverLayout.jsx";
import FinanceLayout from "../layouts/FinanceLayout.jsx";
import WarehouseLayout from "../layouts/WarehouseLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Home from "../pages/marketplace/Home.jsx";
import Shop from "../pages/marketplace/Shop.jsx";
import ProductDetails from "../pages/marketplace/ProductDetails.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import About from "../pages/public/About.jsx";
import Contact from "../pages/public/Contact.jsx";

import AdminDashboard from "../pages/dashboard/AdminDashboard.jsx";
import FarmManagerDashboard from "../pages/dashboard/FarmManagerDashboard.jsx";
import FinanceDashboard from "../pages/dashboard/FinanceDashboard.jsx";
import DriverDashboard from "../pages/dashboard/DriverDashboard.jsx";
import UserList from "../pages/users/UserList.jsx";
import DashboardReports from "../pages/reports/DashboardReports.jsx";
import SystemSettings from "../pages/settings/SystemSettings.jsx";
import WorkerList from "../pages/labour/WorkerList.jsx";
import TaskList from "../pages/tasks/TaskList.jsx";
import InventoryList from "../pages/inventory/InventoryList.jsx";
import Profile from "../pages/settings/Profile.jsx";
import Orders from "../pages/marketplace/Orders.jsx";
import Cart from "../pages/marketplace/Cart.jsx";

const AppRoutes = () => (
	<Routes>
		<Route element={<MainLayout />}>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/shop" element={<Shop />} />
			<Route path="/product/:id" element={<ProductDetails />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Route>

		<Route element={<ProtectedRoute roles={["Admin"]} />}>
			<Route element={<AdminLayout />}>
				<Route path="/admin/dashboard" element={<AdminDashboard />} />
				<Route path="/admin/users" element={<UserList />} />
				<Route path="/admin/reports" element={<DashboardReports />} />
				<Route path="/admin/settings" element={<SystemSettings />} />
			</Route>
		</Route>

		<Route element={<ProtectedRoute roles={["FarmManager"]} />}>
			<Route element={<ManagerLayout />}>
				<Route path="/manager/dashboard" element={<FarmManagerDashboard />} />
				<Route path="/manager/labour" element={<WorkerList />} />
				<Route path="/manager/tasks" element={<TaskList />} />
			</Route>
		</Route>

		<Route element={<ProtectedRoute roles={["FinanceManager"]} />}>
			<Route element={<FinanceLayout />}>
				<Route path="/finance/dashboard" element={<FinanceDashboard />} />
			</Route>
		</Route>

		<Route element={<ProtectedRoute roles={["WarehouseStaff"]} />}>
			<Route element={<WarehouseLayout />}>
				<Route path="/warehouse/inventory" element={<InventoryList />} />
			</Route>
		</Route>

		<Route element={<ProtectedRoute roles={["Driver"]} />}>
			<Route element={<DriverLayout />}>
				<Route path="/driver/deliveries" element={<DriverDashboard />} />
			</Route>
		</Route>

		<Route element={<ProtectedRoute roles={["Customer"]} />}>
			<Route element={<CustomerLayout />}>
				<Route path="/customer/profile" element={<Profile />} />
				<Route path="/customer/orders" element={<Orders />} />
				<Route path="/customer/cart" element={<Cart />} />
			</Route>
		</Route>

		<Route path="*" element={<Navigate to="/" replace />} />
	</Routes>
);

export default AppRoutes;
