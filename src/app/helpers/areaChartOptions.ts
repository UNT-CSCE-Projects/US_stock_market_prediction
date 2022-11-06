import { Options } from 'highcharts';
export const areaChartOptions: Options = {
  chart: {
    styledMode: true,
  },

  plotOptions: {
    series: {
      marker: {
        enabled: true,
      },
    },
  },

  legend: {
    enabled: false,
  },

  credits: {
    enabled: false,
  },

  title: {
    text: 'Medication',
  },

  yAxis:{
    visible: false,
  },

  xAxis: {
    visible: false,
    categories: [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },

  defs: {
    gradient0: {
      tagName: 'linearGradient',
      id: 'gradient-0',

      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1,
      children: [
        {
          tagName: 'stop',
          offset: 0,
        },

        {
          tagName: 'stop',
          offset: 1,
        },
      ],
    },
  } as any,

  series:[
    {
        color:'red',
        type:'areaspline',
        keys:['y','selected'],
        data:[
            [29.9,false],
            [71.5,false],
            [106,false],
            [144.5,false],
            [176.0,false],
            [135.0,false],
            [148.5,false],
            [216.5,false],
            [194.5,false],
            [95.4,false],
            [54.4,false]
        ]
    }
  ]
};
