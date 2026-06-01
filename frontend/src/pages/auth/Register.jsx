import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const PROVINCES = {
	Central: ["Kandy", "Matale", "Nuwara Eliya"],
	Eastern: ["Ampara", "Batticaloa", "Trincomalee"],
	"North Central": ["Anuradhapura", "Polonnaruwa"],
	Northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
	Northwestern: ["Kurunegala", "Puttalam"],
	Sabaragamuwa: ["Kegalle", "Ratnapura"],
	Southern: ["Galle", "Hambantota", "Matara"],
	"Uva": ["Badulla", "Monaragala"],
	Western: ["Colombo", "Gampaha", "Kalutara"]
};

const ROLES = [
	"FarmManager",
	"FinanceManager",
	"WarehouseStaff",
	"Driver",
	"Customer",
	"Farmer"
];

const Register = () => {
	const { register, loading, error } = useContext(AuthContext);
	const [message, setMessage] = useState("");
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		province: "",
		district: "",
		address: "",
		lat: "",
		lng: "",
		role: "Customer",
		password: "",
		confirmPassword: ""
	});

	const districts = useMemo(
		() => (form.province ? PROVINCES[form.province] : []),
		[form.province]
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
			const payload = {
				firstName: form.firstName,
				lastName: form.lastName,
				email: form.email,
				role: form.role,
				password: form.password,
				confirmPassword: form.confirmPassword,
				location: {
					province: form.province,
					district: form.district,
					mapLocation: {
						address: form.address,
						lat: form.lat ? Number(form.lat) : undefined,
						lng: form.lng ? Number(form.lng) : undefined
					}
				}
			};

			const response = await register(payload);
			setMessage(response.message || "Registration submitted.");
		} catch (err) {
			setMessage("");
		}
	};

	return (
		<section className="section">
			<h2>Register</h2>
			<p className="muted">Create your account and wait for admin approval.</p>
			<div className="card">
				<form className="form-grid" onSubmit={onSubmit}>
					<div className="form-row">
						<input
							placeholder="First name"
							value={form.firstName}
							onChange={updateField("firstName")}
							required
						/>
						<input
							placeholder="Last name"
							value={form.lastName}
							onChange={updateField("lastName")}
							required
						/>
					</div>
					<input
						type="email"
						placeholder="Email"
						value={form.email}
						onChange={updateField("email")}
						required
					/>
					<div className="form-row">
						<select
							value={form.province}
							onChange={updateField("province")}
							required
						>
							<option value="">Select province</option>
							{Object.keys(PROVINCES).map((province) => (
								<option key={province} value={province}>
									{province}
								</option>
							))}
						</select>
						<select
							value={form.district}
							onChange={updateField("district")}
							required
							disabled={!form.province}
						>
							<option value="">Select district</option>
							{districts.map((district) => (
								<option key={district} value={district}>
									{district}
								</option>
							))}
						</select>
					</div>
					<input
						placeholder="Google Maps address"
						value={form.address}
						onChange={updateField("address")}
					/>
					<div className="form-row">
						<input
							placeholder="Latitude"
							value={form.lat}
							onChange={updateField("lat")}
						/>
						<input
							placeholder="Longitude"
							value={form.lng}
							onChange={updateField("lng")}
						/>
					</div>
					<select
						value={form.role}
						onChange={updateField("role")}
						required
					>
						{ROLES.map((role) => (
							<option key={role} value={role}>
								{role}
							</option>
						))}
					</select>
					<div className="form-row">
						<input
							type="password"
							placeholder="Password"
							value={form.password}
							onChange={updateField("password")}
							required
						/>
						<input
							type="password"
							placeholder="Confirm password"
							value={form.confirmPassword}
							onChange={updateField("confirmPassword")}
							required
						/>
					</div>
					{message ? (
						<p className="form-message success">{message}</p>
					) : null}
					{error ? (
						<p className="form-message error">{error}</p>
					) : null}
					<button className="cta-button" type="submit" disabled={loading}>
						{loading ? "Submitting..." : "Create account"}
					</button>
				</form>
			</div>
		</section>
	);
};

export default Register;
