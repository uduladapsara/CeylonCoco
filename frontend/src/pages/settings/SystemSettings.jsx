const SystemSettings = () => (
	<div className="section">
		<h2>System Settings</h2>
		<div className="grid">
			<div className="card">
				<h3>Roles & Permissions</h3>
				<p>Configure access control policies.</p>
			</div>
			<div className="card">
				<h3>Notification Rules</h3>
				<p>Manage alerts for stock, weather, and tasks.</p>
			</div>
			<div className="card">
				<h3>Integrations</h3>
				<p>Weather and AI provider settings.</p>
			</div>
		</div>
	</div>
);

export default SystemSettings;
