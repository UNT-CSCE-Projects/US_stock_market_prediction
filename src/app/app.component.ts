import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { areaChartOptions } from './helpers/areaChartOptions';
import { donutChartOptions } from './helpers/donutChartOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lineChart: any; // Define your Plotly chart type
  chartOptions: any; // Define your CanvasJS chart options
  graph1 : any
  showDonutChart = true;
  showLineChart = false;
  showCanvasJSChart = false;
  showPlotlyGraph = false;

  constructor() {
    // Initialize your charts here

    // Donut Chart
    
    // Line Chart (Plotly)
    this.lineChart = {
      data: [
        {
          x: [1, 2, 3, 4, 5],
          y: [10, 2, 3, 6, 9],
          type: 'scatter',
          mode: 'lines',
          name: 'Sample Line',
        },
      ],
      layout: {
        title: 'Line Chart',
      },
    };

    // CanvasJS Chart
    this.chartOptions = {
      title: {
        text: 'CanvasJS Chart',
      },
      data: [
        {
          type: 'column',
          dataPoints: [
            { label: 'Apple', y: 10 },
            { label: 'Banana', y: 15 },
            { label: 'Orange', y: 25 },
          ],
        },
      ],
    };

    // Plotly Graph
    this.graph1 = {
      data: [
        { x: [1, 2, 3], y: [2, 3, 4], type: 'bar' },
      ],
      layout: {title: 'Some Data to Hover Over'}
    };
    
  }


}