import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressChart({ completed, total }) {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: ["#4ade80", "#f87171"], // Green and Red
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-32 h-32 mx-auto">
      <Doughnut data={data} />
    </div>
  );
}
