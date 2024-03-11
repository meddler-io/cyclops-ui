import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, filter, map, of, startWith, Subject, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';


@Component({
  selector: 'app-engagement-impact',
  templateUrl: './engagement-impact.component.html',
  styleUrls: ['./engagement-impact.component.scss']
})
export class EngagementImpactComponent {

  @Input('finding_id') finding_id;
  @Input('readonly') readonly ;;



  refreshFinding = new Subject();
  finding$;

  dataForm = this.fb.group({

    impact: this.fb.array([])
  })

  get impact() {
    return this.dataForm.get('impact') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private engagementService: EngagementService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,

  ) {

  }

  addImpactToFinding(finding_id) {
    this.apiService.addImpactToFinding(finding_id).subscribe()
  }

  ngOnInit(): void {



    this.finding$ = combineLatest([of(this.finding_id), this.activatedRoute.paramMap.pipe(

      map(_ => {
        return _.get('finding_id')

      }))]).pipe(

        map(([value1, value2]) => {
          // Use the latest non-null value from either observable
          return value1 !== null ? value1 : value2;
        }),

        filter(_ => !!_)
        ,
        switchMap(finding_id => {
          console.log('bommmerr', finding_id);


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
