const DriverDashboard = () => (
	<div className="section">
		<h2>Delivery Dashboard</h2>
		<div className="grid">
			<div className="card">
				<h3>Active Trips</h3>
				<p>3 deliveries in progress.</p>
			</div>
			<div className="card">
				<h3>Next Stop</h3>
				<p>Order #CC-1024 - Gampaha</p>
			</div>
			<div className="card">
				<h3>Fuel Status</h3>
				<p>72% remaining, refill in 2 days.</p>
			</div>
		</div>
	</div>
);

export default DriverDashboard;
