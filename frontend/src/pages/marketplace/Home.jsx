const Home = () => (
	<div>
		<section className="hero">
			<div>
				<h1>From plantation to marketplace, fully orchestrated.</h1>
				<p>
					CeylonCoco unifies plantation operations, logistics, and sales into a
					single command center.
				</p>
				<button className="cta-button">Explore the platform</button>
			</div>
			<div className="hero-card">
				<h3>Live Ops Snapshot</h3>
				<p>Tree Health: 88%</p>
				<p>Inventory Coverage: 24 days</p>
				<p>Revenue Forecast: +12.8%</p>
			</div>
		</section>

		<section className="section">
			<h2>Everything your coconut business needs</h2>
			<p>Integrated workflows across plantation, labour, inventory, and sales.</p>
			<div className="grid">
				<div className="card">
					<h3>Plantation Intelligence</h3>
					<p>Track blocks, health, and yield with actionable insights.</p>
				</div>
				<div className="card">
					<h3>Inventory Precision</h3>
					<p>Automated stock adjustments from fertilizers and sales.</p>
				</div>
				<div className="card">
					<h3>Marketplace Growth</h3>
					<p>Products, orders, and delivery tracking in one place.</p>
				</div>
			</div>
		</section>
	</div>
);

export default Home;
