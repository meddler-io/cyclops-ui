import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, of, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { NewSidebarService } from 'src/app/new-sidebar.service';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-finding-cwe-selector',
  templateUrl: './engagement-finding-cwe-selector.component.html',
  styleUrls: ['./engagement-finding-cwe-selector.component.scss']
})
export class EngagementFindingCweSelectorComponent implements OnInit {

  @Input('finding_id') finding_id;


  searching = false;
  searchInput = new FormControl('');
  searchPattern = 'cross site';
  cwe$;
  active_cwe;


  constructor(private apiService: ApiService,
    private engagementService: EngagementService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private windowService: NewSidebarService,


  ) {

  }
  dialogRef;

  openDialog(dialog: TemplateRef<any>) {

    this.windowService.open(dialog , {
      windowClass: 'sidebar-window'
    });
    return;

    this.dialogRef = this.dialogService.open(dialog, {
      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
    }).onClose.subscribe(_=>{

      this.searchInput.setValue('', { emitEvent: true });

    })

  }


  loadActiveCwe() {




    this.active_cwe = this.refreshFinding.pipe(switchMap(_ => {


      return this.apiService.getAssessmentsFindingsById(
        this.finding_id).pipe(map(_ => _.data)).pipe(
          switchMap(_ => {
            console.log('cwelookup', _?.cwe)
            return this.apiService.getCWEById(_?.cwe).pipe(map(_ => _.data))
          })
          ,
          shareReplay()
        )

    }))

  
    
  }

  ngOnInit(): void {




    // this.active_cwe = this.apiService.getAssessmentsFindingsById(
    //   this.finding_id).pipe(map(_ => _.data)).pipe(
    //     switchMap(_ => {
    //       console.log('cwelookup', _?.cwe)
    //       return this.apiService.getCWEById(_?.cwe).pipe(map(_ => _.data))
    //     })
    //   )

    this.loadActiveCwe();





    this.cwe$ = combineLatest([of(this.finding_id), this.activatedRoute.paramMap.pipe(

      map(_ => {
        return _.get('finding_id')

      }))]).pipe(

        map(([value1, value2]) => {
          // Use the latest non-null value from either observable
          return value1 !== null ? value1 : value2;
        })
        ,


      )
      .pipe(


        switchMap(_ => {

          return this.searchInput.valueChanges.pipe(

            debounceTime(this.threshHoldDelay), // Adjust the delay (in milliseconds) based on your requirements
            distinctUntilChanged(),

            startWith(this.searchInput.value),
            switchMap(query => {

              this.searching = true;

              return this.apiService.getCWE(query).pipe(

                map(_ => {

                  this.searchPattern = _['regex_pattern']

                  console.log('cwecwe', _);
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

        })

      )
  }



  threshHoldDelay = 500;
  refreshFinding = new BehaviorSubject(true);





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
