const TaskList = () => (
	<div className="section">
		<h2>Tasks</h2>
		<div className="grid">
			<div className="card">
				<h3>Harvest batch A</h3>
				<p>Status: In Progress</p>
			</div>
			<div className="card">
				<h3>Irrigation check</h3>
				<p>Status: Pending</p>
			</div>
			<div className="card">
				<h3>Fertilizer application</h3>
				<p>Status: Completed</p>
			</div>
		</div>
	</div>
);

export default TaskList;
