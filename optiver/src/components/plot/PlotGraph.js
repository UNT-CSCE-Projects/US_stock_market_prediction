import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const PlotGraph = ({train, test}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Assuming you need some processing for chartData based on train and test
    // You may need to adjust this part based on your data structure
    const trainDates = Array.from({ length: train.length }, (_, index) => index + 1);
    const testDates = Array.from({ length: test.length }, (_, index) => index  + train.length);

    const trace1 = {
      type: 'scatter',
      mode: 'lines',
      name: 'Training Data',
      x: trainDates,
      y: train,
      line: { color: '#17BECF' },
    };

    const trace2 = {
      type: 'scatter',
      mode: 'lines',
      name: 'Testing Data',
      x: testDates,
      y: test,
      line: { color: '#FF5733' }, // You can change this color as needed
    };

    setChartData([trace1, trace2]);
  }, [train, test]);

  if (chartData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Plot data={chartData} />
    </div>
  );
};

export default PlotGraph;
