import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar/Navbar.jsx";
import Footer from "../components/common/Footer/Footer.jsx";

const MainLayout = () => (
	<div className="page">
		<Navbar />
		<Outlet />
		<Footer />
	</div>
);

export default MainLayout;
