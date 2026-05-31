const Login = () => (
	<section className="section">
		<h2>Login</h2>
		<div className="card">
			<form className="grid">
				<input placeholder="Email" />
				<input placeholder="Password" type="password" />
				<button className="cta-button" type="button">
					Sign in
				</button>
			</form>
		</div>
	</section>
);

export default Login;
