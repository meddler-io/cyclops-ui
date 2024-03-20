import { Component, Input } from '@angular/core';
import { delay, first, map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-finding-basic-details',
  templateUrl: './engagement-finding-basic-details.component.html',
  styleUrls: ['./engagement-finding-basic-details.component.scss']
})
export class EngagementFindingBasicDetailsComponent {

  @Input('readonly') readonly;;
  @Input('draft') draft;


  @Input('finding_id') finding_id;

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
    // private engagementService: EngagementService,

    private apiService: ApiService) { }

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

  saving$ = false;



  updateFinding(finding_id, data) {


    return this.apiService.updateFinding(this.engagement_id, finding_id, data);


  }

  saveAttr(data) {



    this.saving$ = true;
    this.updateFinding(this.finding_id, data).subscribe(_ => {
      this.saving$ = false;

      this.loadDetails.next(true);

    })
  }

}
