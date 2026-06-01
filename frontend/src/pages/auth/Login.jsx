import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const Login = () => {
	const { login, loading, error } = useContext(AuthContext);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: ""
	});
	const [message, setMessage] = useState("");

	const dashboardPath = useMemo(
		() => ({
			Admin: "/admin/dashboard",
			FarmManager: "/manager/dashboard",
			FinanceManager: "/finance/dashboard",
			WarehouseStaff: "/warehouse/inventory",
			Driver: "/driver/deliveries",
			Customer: "/customer/profile",
			Farmer: "/manager/dashboard"
		}),
		[]
	);

	const updateField = (field) => (event) => {
		setForm((prev) => ({
			...prev,
			[field]: event.target.value
		}));
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setMessage("");
		try {
			const data = await login(form);
			const destination = dashboardPath[data.role] || "/";
			navigate(destination, { replace: true });
		} catch (err) {
			setMessage("");
		}
	};

	return (
		<section className="section">
			<h2>Login</h2>
			<p className="muted">Only approved users can access the system.</p>
			<div className="card">
				<form className="form-grid" onSubmit={onSubmit}>
					<input
						type="email"
						placeholder="Email"
						value={form.email}
						onChange={updateField("email")}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={form.password}
						onChange={updateField("password")}
						required
					/>
					{message ? (
						<p className="form-message success">{message}</p>
					) : null}
					{error ? (
						<p className="form-message error">{error}</p>
					) : null}
					<button className="cta-button" type="submit" disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</button>
				</form>
			</div>
		</section>
	);
};

export default Login;
