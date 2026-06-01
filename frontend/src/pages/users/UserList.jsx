import { useEffect, useMemo, useState } from "react";
import {
	getUsers,
	createUser,
	updateUser,
	deleteUser
} from "../../services/userService.js";

const ROLES = [
	"Admin",
	"FarmManager",
	"FinanceManager",
	"WarehouseStaff",
	"Driver",
	"Customer",
	"Farmer"
];

const emptyForm = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	role: "Customer",
	phone: "",
	status: false
};

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [form, setForm] = useState(emptyForm);
	const [editingId, setEditingId] = useState("");

	const loadUsers = async () => {
		setLoading(true);
		setError("");
		try {
			const data = await getUsers();
			setUsers(data);
		} catch (err) {
			setError(err.message || "Failed to load users");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadUsers();
	}, []);

	const activeCount = useMemo(
		() => users.filter((user) => user.status).length,
		[users]
	);

	const updateField = (field) => (event) => {
		const value =
			field === "status"
				? event.target.checked
				: event.target.value;
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
	};

	const resetForm = () => {
		setForm(emptyForm);
		setEditingId("");
	};

	const onCreate = async (event) => {
		event.preventDefault();
		setMessage("");
		setError("");
		try {
			await createUser({
				firstName: form.firstName,
				lastName: form.lastName,
				email: form.email,
				password: form.password,
				role: form.role,
				phone: form.phone,
				status: form.status
			});
			setMessage("User created successfully.");
			resetForm();
			await loadUsers();
		} catch (err) {
			setError(err.message || "Failed to create user");
		}
	};

	const onEdit = (user) => {
		setEditingId(user._id);
		setForm({
			firstName: user.firstName || "",
			lastName: user.lastName || "",
			email: user.email || "",
			password: "",
			role: user.role || "Customer",
			phone: user.phone || "",
			status: Boolean(user.status)
		});
		setMessage("");
		setError("");
	};

	const onUpdate = async (event) => {
		event.preventDefault();
		setMessage("");
		setError("");
		try {
			await updateUser(editingId, {
				firstName: form.firstName,
				lastName: form.lastName,
				email: form.email,
				role: form.role,
				phone: form.phone,
				status: form.status
			});
			setMessage("User updated successfully.");
			resetForm();
			await loadUsers();
		} catch (err) {
			setError(err.message || "Failed to update user");
		}
	};

	const onToggleStatus = async (user) => {
		setMessage("");
		setError("");
		try {
			await updateUser(user._id, {
				status: !user.status
			});
			setMessage("Status updated.");
			await loadUsers();
		} catch (err) {
			setError(err.message || "Failed to update status");
		}
	};

	const onDelete = async (userId) => {
		setMessage("");
		setError("");
		try {
			await deleteUser(userId);
			setMessage("User removed.");
			await loadUsers();
		} catch (err) {
			setError(err.message || "Failed to delete user");
		}
	};

	return (
		<div className="section">
			<div className="section-heading">
				<div>
					<h2>Users</h2>
					<p className="muted">
						Manage access, roles, and account status.
					</p>
				</div>
				<div className="stats-bar">
					<div className="stat-pill">
						<span className="stat-label">Total</span>
						<span className="stat-value">{users.length}</span>
					</div>
					<div className="stat-pill">
						<span className="stat-label">Active</span>
						<span className="stat-value">{activeCount}</span>
					</div>
				</div>
			</div>

			<div className="card form-card">
				<form className="form-grid" onSubmit={editingId ? onUpdate : onCreate}>
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
					<div className="form-row">
						<input
							type="email"
							placeholder="Email"
							value={form.email}
							onChange={updateField("email")}
							required
						/>
						<input
							placeholder="Phone"
							value={form.phone}
							onChange={updateField("phone")}
						/>
					</div>
					<div className="form-row">
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
						<label className="toggle">
							<input
								type="checkbox"
								checked={form.status}
								onChange={updateField("status")}
							/>
							<span>Active</span>
						</label>
					</div>
					{editingId ? null : (
						<input
							type="password"
							placeholder="Temporary password"
							value={form.password}
							onChange={updateField("password")}
							required
						/>
					)}
					{message ? (
						<p className="form-message success">{message}</p>
					) : null}
					{error ? (
						<p className="form-message error">{error}</p>
					) : null}
					<div className="form-actions">
						<button className="cta-button" type="submit" disabled={loading}>
							{editingId ? "Update user" : "Create user"}
						</button>
						{editingId ? (
							<button className="ghost-button" type="button" onClick={resetForm}>
								Cancel
							</button>
						) : null}
					</div>
				</form>
			</div>

			<div className="card table-card">
				{loading ? (
					<p className="muted">Loading users...</p>
				) : (
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td>{user.name || `${user.firstName} ${user.lastName}`}</td>
									<td>{user.email}</td>
									<td>{user.role}</td>
									<td>
										<span
											className={`status-chip ${
												user.status ? "active" : "inactive"
											}`}
										>
											{user.status ? "Active" : "Pending"}
										</span>
									</td>
									<td>
										<div className="table-actions">
											<button
												className="ghost-button"
												type="button"
												onClick={() => onEdit(user)}
											>
												Edit
											</button>
											<button
												className="ghost-button"
												type="button"
												onClick={() => onToggleStatus(user)}
											>
												{user.status ? "Deactivate" : "Approve"}
											</button>
											<button
												className="ghost-button danger"
												type="button"
												onClick={() => onDelete(user._id)}
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default UserList;
