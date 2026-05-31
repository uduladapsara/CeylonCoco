import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom"
    }
  }
};

const AnalyticsCharts = () => {
  const plantationData = {
    labels: ["Block A", "Block B", "Block C", "Block D"],
    datasets: [
      {
        label: "Tree Health",
        data: [88, 74, 91, 82],
        backgroundColor: "rgba(45, 106, 79, 0.65)"
      }
    ]
  };

  const yieldData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Yield (tons)",
        data: [22, 26, 24, 30, 32, 35],
        borderColor: "#2d6a4f",
        backgroundColor: "rgba(45, 106, 79, 0.2)"
      }
    ]
  };

  const financeData = {
    labels: ["Revenue", "Expenses"],
    datasets: [
      {
        label: "LKR (millions)",
        data: [12.4, 7.9],
        backgroundColor: ["#2d6a4f", "#d97706"]
      }
    ]
  };

  const inventoryData = {
    labels: ["Oil", "Water", "Sugar", "Fertilizer", "Equipment"],
    datasets: [
      {
        label: "Stock Levels",
        data: [320, 540, 240, 800, 120],
        backgroundColor: "rgba(217, 119, 6, 0.65)"
      }
    ]
  };

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [4, 6, 5, 7, 9, 11],
        borderColor: "#d97706",
        backgroundColor: "rgba(217, 119, 6, 0.2)"
      }
    ]
  };

  const labourData = {
    labels: ["Team A", "Team B", "Team C"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [42, 36, 50],
        backgroundColor: "rgba(31, 27, 22, 0.65)"
      }
    ]
  };

  return (
    <div className="chart-grid">
      <div className="chart-card">
        <h3>Plantation: Tree Health</h3>
        <Bar data={plantationData} options={chartOptions} />
      </div>
      <div className="chart-card">
        <h3>Yield Analysis</h3>
        <Line data={yieldData} options={chartOptions} />
      </div>
      <div className="chart-card">
        <h3>Finance: Revenue vs Expenses</h3>
        <Doughnut data={financeData} options={chartOptions} />
      </div>
      <div className="chart-card">
        <h3>Inventory Stock Levels</h3>
        <Bar data={inventoryData} options={chartOptions} />
      </div>
      <div className="chart-card">
        <h3>Monthly Sales</h3>
        <Line data={salesData} options={chartOptions} />
      </div>
      <div className="chart-card">
        <h3>Labour Productivity</h3>
        <Bar data={labourData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
