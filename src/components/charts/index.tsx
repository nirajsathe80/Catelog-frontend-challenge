import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TimePeriodSelector from "./time-period";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  dates: string[];
  price: string[];
}

const Chart = ({ dates, price }: ChartProps) => {
  const chartData = {
    labels: dates ? dates : [],
    datasets: [
      {
        label: "Gold Price",
        data: price ? price : [],
        borderColor: "#6366F1",
        backgroundColor: "rgb(255, 255, 255)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div className="p-4 rounded-md mt-4">
      {dates ? (
        <div className="md:h-[400px] h-[200px]">
          <TimePeriodSelector />
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-4xl">Loading chart...</p>
      )}
    </div>
  );
};

export default Chart;
