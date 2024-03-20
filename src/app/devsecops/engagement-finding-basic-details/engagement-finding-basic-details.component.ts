import { Component, Input } from '@angular/core';
import { delay, first, map, startWith, Subject, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-finding-basic-details',
  templateUrl: './engagement-finding-basic-details.component.html',
  styleUrls: ['./engagement-finding-basic-details.component.scss']
})
export class EngagementFindingBasicDetailsComponent {

  @Input('readonly') readonly ;;
  @Input('draft') draft;


  @Input('finding_id') finding_id;

  loadDetails = new Subject()

  findingDetails;

  constructor(
    private engagementService: EngagementService,

    private apiService: ApiService) { }

  ngOnInit(): void {

    this.findingDetails = this.loadDetails.asObservable().pipe(

      

      startWith(true),

      switchMap(
        _ => {

          return this.apiService.getAssessmentsFindingsById(this.finding_id).pipe(map(_ => _.data))

        }))
        


  }

  saving$ = false;

  updateFinding( finding_id ,  data) {


    return this.engagementService.activeEngagement.pipe(
      first(),

      switchMap(_ => {

        return this.apiService.updateFinding(_.id , finding_id, data);
      })

    )

  }

  saveAttr(data) {


    this.saving$ = true;
    this.updateFinding(this.finding_id, data).subscribe(_ => {
      this.saving$ = false;

      this.loadDetails.next(true);

    })
  }

}
