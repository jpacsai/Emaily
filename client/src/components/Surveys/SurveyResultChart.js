import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SurveyResultChart = ({ results }) => {
  const { yes, no } = results;
  if (!yes && !no) return <p>Sorry, there are no available results yet.</p>;

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Survey results'
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
          format: '{point.name}: {point.y:.1f}%'
        },
        colors: ['#76ff03', '#ff1744']
      }
    },
    series: [
      {
        name: 'Answers',
        colorByPoint: true,
        data: [
          {
            name: 'Yes',
            y: yes
          },
          {
            name: 'No',
            y: no
          }
        ]
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SurveyResultChart;
