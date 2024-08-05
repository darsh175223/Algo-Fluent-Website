import React, { useRef, useState, useEffect } from 'react';
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
import { PolynomialRegression } from 'ml-regression-polynomial';

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

const ParabolaGraph = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [polyModel, setPolyModel] = useState(null);
  const chartRef = useRef(null);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 40 - 20;
    const y = ((e.clientY - rect.top) / rect.height) * -40 + 20;
    
    console.log('Clicked Point Coordinates:', { x, y });
    
    setDataPoints([...dataPoints, { x, y }]);
  };

  useEffect(() => {
    if (dataPoints.length > 2) {  // Need at least 3 points for quadratic regression
      // Transform data into the correct format for PolynomialRegression
      const X = dataPoints.map(p => p.x);
      const y = dataPoints.map(p => p.y);

      console.log('Training Data:', { X, y });

      try {
        // Create polynomial regression model (degree 2 for quadratic regression)
        const polyReg = new PolynomialRegression(X, y, 2);
        console.log('Trained Polynomial Coefficients:', polyReg.coefficients);

        setPolyModel(polyReg);
      } catch (error) {
        console.error('Error training model:', error);
      }
    }
  }, [dataPoints]);

  const generateParabolaLine = (x) => {
    if (polyModel) {
      // Generate parabola line value for x
      return polyModel.predict(x);
    }
    return 0;
  };

  const chartData = {
    datasets: [
      {
        label: 'Data Points',
        data: dataPoints,
        backgroundColor: 'blue',
        pointRadius: 5
      }
    ]
  };

  if (polyModel) {
    // Generate points for the parabola line
    const xValues = Array.from({ length: 100 }, (_, i) => -20 + (40 * i / 99));
    const yValues = xValues.map(x => ({
      x,
      y: generateParabolaLine(x)
    }));

    chartData.datasets.push({
      label: 'Parabola Fit',
      data: yValues,
      type: 'line',
      fill: false,
      borderColor: 'black',
      borderWidth: 2,
      pointRadius: 0
    });

    console.log('Parabola Fit Line:', yValues);
  }

  return (
    <div>
      <h1>Polynomial Regression Visualizer</h1>
      <div onClick={handleClick} style={{ position: 'relative', height: '600px', width: '600px' }}>
        <ScatterChart
          key={dataPoints.length}
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
    </div>
  );
};

export default ParabolaGraph;