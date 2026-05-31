const Shop = () => (
	<section className="section">
		<h2>Shop</h2>
		<p>Browse premium coconut products directly from the source.</p>
		<div className="grid">
			{["Coconut Sugar", "Coconut Oil", "Coconut Water"].map((item) => (
				<div className="card" key={item}>
					<h3>{item}</h3>
					<p>Fresh batch available for immediate delivery.</p>
					<button className="cta-button">View</button>
				</div>
			))}
		</div>
	</section>
);

export default Shop;
