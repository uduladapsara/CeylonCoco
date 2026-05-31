const UserList = () => (
	<div className="section">
		<h2>Users</h2>
		<table className="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Role</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Admin User</td>
					<td>Admin</td>
					<td>Active</td>
				</tr>
				<tr>
					<td>Farm Manager</td>
					<td>FarmManager</td>
					<td>Active</td>
				</tr>
				<tr>
					<td>Warehouse Staff</td>
					<td>WarehouseStaff</td>
					<td>Active</td>
				</tr>
			</tbody>
		</table>
	</div>
);

export default UserList;
