// src/components/Graph.js
import React, { useRef, useState } from 'react';
import {
  Chart as ChartJS,
  Scatter,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Scatter as ScatterChart } from 'react-chartjs-2';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin
);

const Graph = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const chartRef = useRef(null);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 40 - 20;
    const y = ((e.clientY - rect.top) / rect.height) * -40 + 20;
    setDataPoints([...dataPoints, { x, y }]);
  };

  const calculateRegressionLine = (points) => {
    if (points.length < 2) return null;

    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    points.forEach(point => {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumXX += point.x * point.x;
    });

    const n = points.length;
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  };

  const regressionLine = calculateRegressionLine(dataPoints);

  const chartData = {
    datasets: [
      {
        label: 'Data Points',
        data: dataPoints,
        backgroundColor: '#black',
        pointRadius: 5
      }
    ]
  };

  if (regressionLine) {
    const { slope, intercept } = regressionLine;
    chartData.datasets.push({
      label: 'Regression Line',
      data: [
        { x: -20, y: slope * -20 + intercept },
        { x: 20, y: slope * 20 + intercept }
      ],
      type: 'line',
      fill: false,
      borderColor: 'rgba(255,0,0,0.5)',
      borderWidth: 2,
      pointRadius: 0
    });
  }

  return (
    <div onClick={handleClick}>
      <ScatterChart
        ref={chartRef}
        data={chartData}
        options={{
          scales: {
            x: {
              type: 'linear',
              min: -20,
              max: 20
            },
            y: {
              type: 'linear',
              min: -20,
              max: 20
            }
          }
        }}
      />
    </div>
  );
};

export default Graph;
