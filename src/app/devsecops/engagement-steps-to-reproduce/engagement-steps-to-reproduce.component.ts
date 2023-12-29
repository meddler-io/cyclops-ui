import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, startWith, Subject, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-steps-to-reproduce',
  templateUrl: './engagement-steps-to-reproduce.component.html',
  styleUrls: ['./engagement-steps-to-reproduce.component.scss']
})
export class EngagementStepsToReproduceComponent implements OnInit {



  refreshFinding = new Subject();
  finding$;

  dataForm = this.fb.group({

    stepsToReproduce: this.fb.array([])
  })

  get stepsToReproduce() {
    return this.dataForm.get('stepsToReproduce') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private engagementService: EngagementService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,

  ) {

  }

  addStep(  finding_id )  {
    this.apiService.addStepToFinding(   finding_id ).subscribe()
  }

  ngOnInit(): void {


    this.finding$ = this.activatedRoute.paramMap.pipe(

      map(_ => {
        return _.get('finding_id')

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


    for (let i = 0; i < 3; i++)

      (this.dataForm.get('stepsToReproduce') as FormArray).push(this.fb.group(
        {
          title: new FormControl('Title of step'),
          description: new FormControl('Description of Text'),
          cURL: new FormControl('')
        }

      ));
  }


}

