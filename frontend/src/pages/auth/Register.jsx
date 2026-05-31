const Register = () => (
	<section className="section">
		<h2>Register</h2>
		<div className="card">
			<form className="grid">
				<input placeholder="Full name" />
				<input placeholder="Email" />
				<input placeholder="Password" type="password" />
				<button className="cta-button" type="button">
					Create account
				</button>
			</form>
		</div>
	</section>
);

export default Register;
