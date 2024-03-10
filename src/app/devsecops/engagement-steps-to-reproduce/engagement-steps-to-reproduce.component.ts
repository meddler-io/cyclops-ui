import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, filter, map, of, startWith, Subject, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-steps-to-reproduce',
  templateUrl: './engagement-steps-to-reproduce.component.html',
  styleUrls: ['./engagement-steps-to-reproduce.component.scss']
})
export class EngagementStepsToReproduceComponent implements OnInit {


  @Input('finding_id') finding_id;


  refreshFinding = new Subject();
  finding$;


  

  
  constructor(
    private fb: FormBuilder,
    private engagementService: EngagementService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,

  ) {

  }

  addStep(finding_id) {
    this.apiService.addStepToFinding(finding_id).subscribe()
  }

  ngOnInit(): void {



    this.finding$ = combineLatest([of(this.finding_id), this.activatedRoute.paramMap.pipe(

      map(_ => {
        return _.get('finding_id')

      }))]).pipe(

        map(([value1, value2]) => {
          // Use the latest non-null value from either observable
          return value1 !== null ? value1 : value2;
        })
        ,

        filter(_ => !!_)
        ,
        switchMap(finding_id => {

          return this.refreshFinding.pipe(
            startWith(true),
            switchMap(_ => {
              return this.apiService.getAssessmentsFindingsById(finding_id).pipe(map(_ => _.data))

            }));


        }
        )
      );



      
  }


}

