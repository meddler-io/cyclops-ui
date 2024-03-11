import { Component, Input } from '@angular/core';
import { delay, map, startWith, Subject, switchMap } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-engagement-finding-basic-details',
  templateUrl: './engagement-finding-basic-details.component.html',
  styleUrls: ['./engagement-finding-basic-details.component.scss']
})
export class EngagementFindingBasicDetailsComponent {

  @Input('readonly') readonly ;;


  @Input('finding_id') finding_id;

  loadDetails = new Subject()

  findingDetails;

  constructor(
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

  saveAttr(data) {


    this.saving$ = true;
    this.apiService.updateFinding(this.finding_id, data).subscribe(_ => {
      this.saving$ = false;

      this.loadDetails.next(true);

    })
  }

}
