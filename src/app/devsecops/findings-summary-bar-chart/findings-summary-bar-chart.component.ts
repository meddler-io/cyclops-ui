import { Component } from '@angular/core';
import { ColorSeverity } from 'src/environments/constants';



@Component({
  selector: 'app-findings-summary-bar-chart',
  templateUrl: './findings-summary-bar-chart.component.html',
  styleUrls: ['./findings-summary-bar-chart.component.scss']
})
export class FindingsSummaryBarChartComponent {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Severity';
  showYAxisLabel = true;
  yAxisLabel = 'Count';

  colorScheme = {
    domain: [


      ColorSeverity.INFO,   // Informative (Dark Blue)
      ColorSeverity.LOW,   // Low (Dark Green)
      ColorSeverity.MEDIUM,   // Medium (Dark Orange)
      ColorSeverity.HIGH,   // High (Dark Red)
      ColorSeverity.CRITICAL    // Critical (Darker Red)
    ]
  }

  constructor() {
    Object.assign(this, { single })
  }

  onSelect(event) {
    console.log(event);
  }
}


export var single = [
  {
    "name": "Informative",
    "value": 89400000
  },
  {
    "name": "Low",
    "value": 8940000
  },
  {
    "name": "Medium",
    "value": 5000000
  },
  {
    "name": "High",
    "value": 7200000
  },
  {
    "name": "Critical",
    "value": 7200000
  }
];

export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];
