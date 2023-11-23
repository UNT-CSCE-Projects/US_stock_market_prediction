import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const PlotGraph = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the provided URL
    fetch('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').map(row => row.split(','));
        const keys = rows[0];
        const stockData = rows.slice(1).map(row => {
          const rowData = {};
          keys.forEach((key, index) => {
            rowData[key] = row[index];
          });
          return rowData;
        });

        setChartData(stockData);
      });
  }, []);

  if (chartData.length === 0) {
    return <div>Loading...</div>;
  }

  // Function to unpack data
  const unpack = (rows, key) => rows.map(row => row[key]);

  // Create traces
  const trace1 = {
    type: 'scatter',
    mode: 'lines',
    name: 'AAPL High',
    x: unpack(chartData, 'Date'),
    y: unpack(chartData, 'AAPL.High'),
    line: { color: '#17BECF' }
  };

  // const trace2 = {
  //   type: 'scatter',
  //   mode: 'lines',
  //   name: 'AAPL Low',
  //   x: unpack(chartData, 'Date'),
  //   y: unpack(chartData, 'AAPL.Low'),
  //   line: { color: '#7F7F7F' }
  // };

  const data = [trace1];


  return (
    <div>
      <Plot data={data} />
    </div>
  );
};

export default PlotGraph;
