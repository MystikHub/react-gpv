import React, { Component } from 'react';
import Chart from 'chart.js';
import { getLanguageData } from './UserStatistics';

export default class Proficiency extends Component {
  constructor(props) {
    super(props);

    this.state = { graphData: null };
    getLanguageData(graphData => this.setupGraph(graphData));
  }

  setupGraph(graphData) {
    const ctx = document.getElementById('language-chart');
    new Chart(ctx, {
      type: 'doughnut',
      data: graphData,
      options: {
        legend: {
          labels: {
            fontColor: 'white',
          }
        }
      }
    });
  }

  render() {
    return(
      <canvas id="language-chart" width="100%" height="40rem"></canvas>
    );
  }
}
