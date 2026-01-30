import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const WeeklyPieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/weekly-report");

      let productive = 0;
      let unproductive = 0;

      Object.values(res.data).forEach(day => {
        productive += day.productive || 0;
        unproductive += day.unproductive || 0;
      });

      // prevent empty chart
      if (productive === 0 && unproductive === 0) {
        setChartData({
          labels: ["No Data"],
          datasets: [
            {
              data: [1],
              backgroundColor: ["#64748b"]
            }
          ]
        });
      } else {
        setChartData({
          labels: ["Productive", "Unproductive"],
          datasets: [
            {
              data: [
                Math.floor(productive / 60000),
                Math.floor(unproductive / 60000)
              ],
              backgroundColor: ["#22c55e", "#ef4444"]
            }
          ]
        });
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Chart fetch error:", err);
    }
  };

  // REAL-TIME UPDATE
  useEffect(() => {
    fetchData(); // initial load
    const interval = setInterval(fetchData, 5000); // every 5 sec
    return () => clearInterval(interval);
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ width: "320px", margin: "auto" }}>
      <h3 style={{ textAlign: "center" }}>Weekly Productivity</h3>
      <Pie data={chartData} />
      <p style={{ textAlign: "center", fontSize: "12px", color: "#64748b" }}>
        Last updated: {lastUpdated}
      </p>
    </div>
  );
};

export default WeeklyPieChart;
