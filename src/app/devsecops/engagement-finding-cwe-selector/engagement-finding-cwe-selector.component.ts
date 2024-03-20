import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { BehaviorSubject, combineLatest, debounceTime, delay, distinctUntilChanged, first, map, Observable, of, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
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
  @Input('readonly') readonly;;
  @Input('draft') draft;
  @Input('window_id') window_id;





  close(){
    this.windowService.closeById(this.window_id);
  }


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

    this.windowService.open(dialog, {
      windowClass: 'sidebar-window'
    });
    return;

    this.dialogRef = this.dialogService.open(dialog, {
      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
    }).onClose.subscribe(_ => {

      this.searchInput.setValue('', { emitEvent: true });

    })

  }


  loadActiveCwe() {




    this.active_cwe = this.refreshFinding.pipe(switchMap(_ => {


      return this.apiService.getAssessmentsFindingsById(
        this.finding_id).pipe(map(_ => _.data)).pipe(
          switchMap(_ => {
            console.log('cwelookup', _?.cwe)

            if (!!!_?.cwe) {
              return of({ id: undefined });
            }
            return this.apiService.getCWEById(_?.cwe).pipe(map(_ => _.data))
          })
          ,
          shareReplay()
        )

    }))


  }


  @Input('onrefresh') onrefresh : Observable<string>;
  onRefreshPushEventHandler(){
    this.onrefresh?.subscribe(_=>{
      
      console.log('onRefreshPushEventHandler', _)
      this.refreshFinding.next(true);
    })
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


  createFinding(data) {


    return this.engagementService.activeEngagement.pipe(
      first(),

      switchMap(_ => {

        return this.apiService.createFinding(_.id, data);
      })

    )

  }


  updateFinding( finding_id ,  data) {


    return this.engagementService.activeEngagement.pipe(
      first(),

      switchMap(_ => {

        return this.apiService.updateFinding(_.id , finding_id, data);
      })

    )

  }


  @ViewChild('createFindingTmpl') createFindingTmpl;

  goBack(){
    this.windowService.closeAll();
    this.windowService.open(this.createFindingTmpl);



  }

  selectCWE(id, finding) {

    console.log('selectCWE', id, finding)

    if (finding?.type == 'weakness') {
      if (id) {


        this.updateFinding(id, { "cwe": finding?.id }).subscribe(_ => {

          // this.cwe = finding?.id;
          this.searchInput.setValue(finding?.title, { emitEvent: false });

          this.refreshFinding.next(true);

          this.goBack();


          // 




        })

      } else {

        this.createFinding({ "cwe": finding?.id }).subscribe(_ => {

          // this.cwe = finding?.id;

          this.finding_id = _?._id?.$oid;
          this.draft = false;
          this.readonly = false;
          this.searchInput.setValue(finding?.title, { emitEvent: false });

          this.refreshFinding.next(true);

          this.goBack();

        })

    

      }

    }


  }


}
