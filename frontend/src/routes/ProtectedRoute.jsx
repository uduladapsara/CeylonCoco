import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const ProtectedRoute = ({ roles }) => {
	const { token, role } = useAuth();

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	if (roles && (!role || !roles.includes(role))) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
