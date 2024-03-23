import { Component, Input } from '@angular/core';
import { Severity } from 'src/environments/constants';
import { ApiService } from '../api.service';
import { Observable, Subject, map, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-engagement-finding-severity',
  templateUrl: './engagement-finding-severity.component.html',
  styleUrl: './engagement-finding-severity.component.scss'
})
export class EngagementFindingSeverityComponent {

  @Input('finding_id') finding_id;
  @Input('draft') draft;
  @Input('readonly') readonly;
  

  severity_list = [
    Severity.INFO,
    Severity.LOW,
    Severity.MEDIUM,
    Severity.HIGH,
    Severity.CRITICAL,
  ]


  severityChanging = false;

  onSeverityChange(severity: Severity , assessment_id) {

    this.severityChanging = true;
    this.apiService.updateFinding(assessment_id, this.finding_id, {
      'severity': severity
    }).subscribe(_ => {
      this.severityChanging = false;

    })

  }



  private engagement_id;

  loadDetails = new Subject()

  findingDetails;


  @Input('onrefresh') onrefresh: Observable<string>;
  onRefreshPushEventHandler() {
    this.onrefresh?.subscribe(_ => {

      console.log('onRefreshPushEventHandler', _)
      this.loadDetails.next(_);
    })
  }


  constructor(
    private apiService: ApiService
  ){

  }

  ngOnInit(): void {


    this.onRefreshPushEventHandler();
    this.findingDetails = this.loadDetails.asObservable().pipe(



      startWith(true),

      switchMap(
        _ => {

          return this.apiService.getAssessmentsFindingsById(this.finding_id).pipe(map(_ => _.data))

        })

      ,
      tap((_: any) => {
        this.engagement_id = _?.assessment_id?.$oid;


      })

    )




  }
}
