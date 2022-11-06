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
  title = 'Angular-Charts';

  donutCharts = new Chart(donutChartOptions);
  areaCharts = new Chart(areaChartOptions)

  lineChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Patient Health',
        data: [10, 2, 3,6,9,17,20,10,5,2,16]
      } as any
    ]
  });
}
