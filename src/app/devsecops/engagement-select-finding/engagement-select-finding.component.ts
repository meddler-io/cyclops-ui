import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, find, map, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-select-finding',
  templateUrl: './engagement-select-finding.component.html',
  styleUrls: ['./engagement-select-finding.component.scss']
})
export class EngagementSelectFindingComponent implements OnInit {

  @ViewChildren('detailTab') detailTab: QueryList<ElementRef>;


  updateSingleSelectGroupValue(index, event) {
    console.log('updateSingleSelectGroupValue', index, event)
  }

  searchInput = new FormControl('')

  searchPattern = 'cross site';

  dataForm = this.fb.group({

    stepsToReproduce: this.fb.array([])
  })

  get stepsToReproduce() {
    return this.dataForm.get('stepsToReproduce') as FormArray;
  }








  refreshFinding = new Subject();
  finding$;



  constructor(private apiService: ApiService,
    private engagementService: EngagementService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

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

          }) );


      }
      ) 
      );

  





  }

  searching = false;

  threshHoldDelay = 500;

  findings$ = this.searchInput.valueChanges.pipe(

    debounceTime(this.threshHoldDelay), // Adjust the delay (in milliseconds) based on your requirements
    distinctUntilChanged(),

    startWith(this.searchInput.value),
    switchMap(query => {

      this.searching = true;

      return this.apiService.getCWE(query).pipe(

        map(_ => {

          this.searchPattern = _['regex_pattern']
          // let _new = []
          // _.forEach(element => {

          //   _new.push({
          //     'id': element['id'],
          //     'title': element['title'],
          //     'type': element['type'],
          //   })

          //   element.weakness.forEach(element => {
          //     _new.push({
          //       'id': element['id'],
          //       'title': element['title'],
          //       'type': element['type'],
          //     })

          //   });

          // });

          return _['data'];

        })


      )
    }

    )
    ,
    tap(_ => {

      this.searching = false;
    })

  )

  cwe = 474;
  selectCWE(id, finding) {

    if (finding?.type == 'weakness') {

      this.apiService.updateFinding(id, { "cwe": finding?.id }).subscribe(_ => {

        // this.cwe = finding?.id;
        this.searchInput.setValue(finding?.title, { emitEvent: false });

        this.refreshFinding.next(true);


      })

    }

  }
}
