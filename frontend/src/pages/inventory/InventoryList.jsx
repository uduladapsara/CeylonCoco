const InventoryList = () => (
	<div className="section">
		<h2>Inventory Dashboard</h2>
		<table className="table">
			<thead>
				<tr>
					<th>Item</th>
					<th>Stock</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Coconut Oil 1L</td>
					<td>320</td>
					<td>Healthy</td>
				</tr>
				<tr>
					<td>Fertilizer NPK</td>
					<td>1200</td>
					<td>Healthy</td>
				</tr>
			</tbody>
		</table>
	</div>
);

export default InventoryList;
