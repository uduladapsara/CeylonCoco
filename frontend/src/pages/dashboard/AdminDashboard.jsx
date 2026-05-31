import AnalyticsCharts from "../../components/dashboard/Charts/AnalyticsCharts.jsx";

const AdminDashboard = () => (
	<div>
		<section className="section">
			<h2>Dashboard Analytics</h2>
			<p>Unified performance view across plantation, finance, sales, and labour.</p>
			<AnalyticsCharts />
		</section>

		<section className="section">
			<h2>Integration Map</h2>
			<div className="grid">
				<div className="card">
					<h3>Plantation → Inventory</h3>
					<p>Fertilizer usage reduces inventory stock automatically.</p>
				</div>
				<div className="card">
					<h3>Plantation → Weather</h3>
					<p>Weather feeds irrigation recommendations.</p>
				</div>
				<div className="card">
					<h3>Labour → Task</h3>
					<p>Workers receive assigned tasks and update status.</p>
				</div>
				<div className="card">
					<h3>Task → Finance</h3>
					<p>Completed work contributes to wage calculations.</p>
				</div>
				<div className="card">
					<h3>Sales → Inventory/Finance</h3>
					<p>Orders adjust stock and update revenue.</p>
				</div>
				<div className="card">
					<h3>Transport → Sales</h3>
					<p>Orders create delivery trips automatically.</p>
				</div>
				<div className="card">
					<h3>Feedback → AI Chatbot</h3>
					<p>Complaints improve recommendation quality.</p>
				</div>
				<div className="card">
					<h3>AI Chatbot → Plantation</h3>
					<p>Disease diagnosis and fertilizer suggestions.</p>
				</div>
			</div>
		</section>
	</div>
);

export default AdminDashboard;
