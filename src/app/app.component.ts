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
}
