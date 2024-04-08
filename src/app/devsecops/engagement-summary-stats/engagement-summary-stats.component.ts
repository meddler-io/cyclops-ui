import { Component, HostListener } from '@angular/core';

export var new_stats = [
  {
    "name": "New",
    "value": 100
  },
  {
    "name": "Recurrent",
    "value": 200
  }
];

export var severity_stats = [



  {
    "name": "Info",
    "value": 200
  },
  {
    "name": "Low",
    "value": 200
  },
  {
    "name": "Medium",
    "value": 200
  },
  {
    "name": "High",
    "value": 200
  },
  {
    "name": "Critical",
    "value": 200
  }
];


@Component({
  selector: 'app-engagement-summary-stats',
  templateUrl: './engagement-summary-stats.component.html',
  styleUrl: './engagement-summary-stats.component.scss'
})



export class EngagementSummaryStatsComponent {

  label = ''
  new_stats: any[];
  severity_stats: any[];
  // view: any[] = [500, 400];
  view;

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    Object.assign(this, { severity_stats, new_stats });


  }

  onSelect(event) {
    console.log(event);
  }

  resizeChart(width: any): void {
    this.view //= [width, 520]
  }

  // 
}
