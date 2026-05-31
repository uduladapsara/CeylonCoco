import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
);

const FinanceDashboard = () => {
	const data = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				label: "Revenue",
				data: [18, 20, 19, 24, 27, 30],
				borderColor: "#2d6a4f"
			},
			{
				label: "Expenses",
				data: [12, 13, 14, 15, 16, 17],
				borderColor: "#d97706"
			}
		]
	};

	return (
		<div className="section">
			<h2>Finance Dashboard</h2>
			<div className="card">
				<Line data={data} />
			</div>
		</div>
	);
};

export default FinanceDashboard;
