import { Options } from 'highcharts';

export const donutChartOptions: Options = {
  chart: {
    type: 'pie',
    plotShadow: false,
  },

  credits: {
    enabled: false,
  },

  plotOptions: {
    pie: {
      innerSize: '99%',
      borderWidth: 10,
      borderColor: '',
      slicedOffset: 10,
      dataLabels: {
        connectorWidth: 0,
      },
    },
  },

  title: {
    verticalAlign: 'middle',
    floating: true,
    text: 'Lab test',
  },

  legend: {
    enabled: false,
  },

  series: [
    {
      type: 'pie',
      data: [
        { name: 'Sneezing', y: 1, color: '#eeeeee' },

        { name: 'Coughing', y: 2, color: '#393e46' },

        { name: 'Vomiting', y: 3, color: '#00adb5' },
        { name: 'Diaphorrea', y: 4, color: '#eeeeee' },
        { name: 'Mental Issues', y: 5, color: '#506ef9' },
      ],
    },
  ],
};
