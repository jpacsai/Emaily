import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SurveyParticipationChart = ({ results }) => {
  const { yes, no, recipients } = results;
  const responded = yes + no;
  if (!responded) return <p>Sorry, there are no available results yet.</p>;
  const notResponded = recipients - responded;
  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Participation rate'
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
        name: 'Participation',
        colorByPoint: true,
        data: [
          {
            name: 'Answered',
            y: responded / recipients * 100
          },
          {
            name: 'Not answered',
            y: notResponded / recipients * 100
          }
        ]
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SurveyParticipationChart;
