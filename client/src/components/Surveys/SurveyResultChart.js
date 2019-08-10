import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SurveyResultChart = ({ results }) => {
  const { yes, no } = results;
  if (!yes && !no) return null;

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Answer rate'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: -50
        },
        colors: ['#64dd17', '#ff1744'],
        showInLegend: true
      }
    },
    series: [
      {
        name: 'Answers',
        colorByPoint: true,
        data: [
          {
            name: 'Yes',
            y: (yes / (yes + no)) * 100
          },
          {
            name: 'No',
            y: (no / (yes + no)) * 100
          }
        ]
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SurveyResultChart;
