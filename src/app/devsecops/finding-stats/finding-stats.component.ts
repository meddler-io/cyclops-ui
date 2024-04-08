import { Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, share, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-finding-stats',
  templateUrl: './finding-stats.component.html',
  styleUrls: ['./finding-stats.component.scss']
})
export class FindingStatsComponent implements OnInit {



  info_status = true;
  low_status = true;
  medium_status = true;
  high_status = true;
  critical_status = true;

  @Input('interactive') interactive = true;
  @Input('theme') theme = 0;




  @Input('findingStats') _findingStats = {
    info: '0',
    low: '0',
    medium: '0',
    high: '0',
    critical: '0',
  };

  findingStats = combineLatest([
    this.apiService.selectedBuildId,
    this.apiService.selectedApp.pipe(
      map(app => {
        return app?.identifier
      }),
      filter(_ => !!_)
    ),

  ]).pipe(
    filter(_ => !_.includes(undefined)),

    switchMap(_ => {
      console.log(
        'findingStats', _
      )
      return this.apiService.getFindingStats(

        { '$oid': _[1] }, { '$oid': _[0] }

      )
    }),
    tap(_ => {

      this.totalFindings = _;
      console.log('tapper', _);
    }),
    share()
  )

  // this.apiService.getFindingStats({ '$oid': this.applicationId }, { '$oid': this.buildId });

  totalFindings = {};
  @Output('severityFilter') severityFilter = new BehaviorSubject({

    Info: this.info_status,
    Low: this.low_status,
    Medium: this.medium_status,
    High: this.high_status,
    Critical: this.critical_status,

    TotalIssues: 0

  })

  constructor(
    private apiService: ApiService,

  ) { }

  ngOnInit(): void {
    this.totalFindings = {}
  }

  toggle(btnType) {



    if (this.interactive == false) {
      return
    }
    switch (btnType) {
      case 'info':
        this.info_status = !this.info_status;
        break;
      case 'low':
        this.low_status = !this.low_status;
        break;
      case 'medium':
        this.medium_status = !this.medium_status;
        break;
      case 'high':
        this.high_status = !this.high_status;
        break;
      case 'critical':
        this.critical_status = !this.critical_status;
        break;
    }

    this.severityFilter.next(
      {

        Info: this.info_status,
        Low: this.low_status,
        Medium: this.medium_status,
        High: this.high_status,
        Critical: this.critical_status,
        TotalIssues: 0

      }
    )
  }

}
