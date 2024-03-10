import { Component, OnInit } from '@angular/core';
import { first, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-create-finding',
  templateUrl: './engagement-create-finding.component.html',
  styleUrls: ['./engagement-create-finding.component.scss']
})
export class EngagementCreateFindingComponent implements OnInit {


  

  constructor(
    private apiService: ApiService,
    private engagementService: EngagementService

  ) { }
  ngOnInit(): void {


  }
  numericSeverity = 1;

  setSeverity(severity) {
    this.numericSeverity = severity;

  }

  createFinding() {


    this.engagementService.activeEngagement.pipe(
      first(),

      switchMap(_ => {

        return this.apiService.createFinding(_.id);
      })

    ).subscribe()

  }
}
