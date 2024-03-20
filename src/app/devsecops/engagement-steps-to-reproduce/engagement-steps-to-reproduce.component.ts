import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, delay, filter, map, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';
import { NewSidebarService } from 'src/app/new-sidebar.service';

@Component({
  selector: 'app-engagement-steps-to-reproduce',
  templateUrl: './engagement-steps-to-reproduce.component.html',
  styleUrls: ['./engagement-steps-to-reproduce.component.scss']
})
export class EngagementStepsToReproduceComponent implements OnInit {


  @Input('finding_id') finding_id;
  @Input('readonly') readonly;;

  @Input('draft') draft;

  refreshFinding = new Subject();


  loadDetails = new Subject()

  findingDetails;


  private engagement_id;


  @Input('onrefresh') onrefresh: Observable<string>;
  onRefreshPushEventHandler() {
    this.onrefresh?.subscribe(_ => {
      console.log('onRefreshPushEventHandler', _)
      this.loadDetails.next(_);
    })
  }

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private windowService: NewSidebarService,


  ) {

  }

  addStep(finding_id) {
    // this.apiService.addStepToFinding(finding_id).subscribe()
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

  openDrawer(template) {

    this.windowService.open(template);


  }


}

