import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { Observable, shareReplay, tap, startWith, map, mergeMap, BehaviorSubject, of, filter, merge } from 'rxjs';
import { ApiService } from '../api.service';
import { STATE_CONSTANT_FAILED, STATE_CONSTANT_LOADING, STATE_CONSTANT_NULL, StateManagerService } from '../state-manager.service';
import { NbAutocompleteComponent, NbAutocompleteDirective, NbThemeModule } from '@nebular/theme';




@Component({
  selector: 'app-b-p-selector',
  templateUrl: './b-p-selector.component.html',
  styleUrls: ['./b-p-selector.component.scss']
})
export class BPSelectorComponent implements OnInit {




  @ViewChild('inputSearch') inputSearch;
  @ViewChild('auto') autocomplete: NbAutocompleteComponent<any>;


  @ContentChild(NbAutocompleteDirective) autocompleteDirctive: NbAutocompleteDirective<any>;


  loading = true;



  activeProjectId = merge(this.stateManagerService.activeBusinessId, this.stateManagerService.activeProjectId).pipe(

    filter(_ => {
      console.log('projectId____', _)

      if (typeof _ == 'number') {
        if (_ == STATE_CONSTANT_NULL) {
          this.loading = false;


        } else if (_ == STATE_CONSTANT_LOADING) {
          this.loading = true;


        }
        else if (_ == STATE_CONSTANT_FAILED) {
          this.loading = false;

        }
        return false;
      }


      this.loading = false;
      return true;
    }),
    // first(),
    tap({
      next: (b_p: any) => {
        console.log('activeApplicationId_b_p', b_p);

        // this.value = { name: b_p?.app?.name, appId: b_p?.id };
        this.value = { name: '', appId: b_p?.id, placeholder: b_p?.app?.name };


      }
    })
  )


  value;


  @Output('onchange') onChange = new EventEmitter<{ project_id?: string, business_id?: string }>();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public accessChecker: NbAccessChecker,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private stateManagerService: StateManagerService,

  ) {

    this.activeProjectId.subscribe();

  }



  filters$ = new BehaviorSubject(
    {
      projectId: undefined,
      businessId: undefined
    }
  );

  unlockDisplay() {
    this.lockDisplay = false;

    console.log('autocompleteDirctive', this.autocompleteDirctive, this.autocomplete['destroy$'])
    this.autocompleteDirctive.hide();

    // this.inputSearch.nativeElement.click();
  }

  focusoutEvent(event) {
    // console.log('unnlcoking_', this.inputSearch.nativeElement.value);

    console.log('focusoutEvent')
    this.inputSearch.nativeElement.value = this.value?.name;
    this.onModelChange('')
    this.lockDisplay = true;

  }

  focussed$ = false;

  focus$(_in: boolean) {
    this.focussed$ = _in;
    if (_in) {
      // this.value.name = '' ; //  = { name: '', appId: b_p?.id };


    } else {
      // this.inputSearch.nativeElement.value = '';
      // this.onModelChange('')
    }
  }

  @Input('backRouterLink') backRouterLink = [];

  inputProjectFormControlFinalised = '';
  inputProjectFormControl: FormControl = new FormControl('', { validators: [Validators.required] });

  filteredControlOptions: Observable<any> = this.apiService.businessMaping().pipe(
    shareReplay()
  )

  businessMaping = this.apiService.businessMaping().pipe(
    shareReplay(),
    tap({
      next: (_) => {

        // this.inputProjectFormControl.patchValue(   { 'name': 'All Prpjects' , businessId: ''}  , {emitEvent: true});

      }
    })
  )


  lockDisplay = false;

  onProjectChanged(event) {

    console.log('onProjectChanged$$', event);
    this.inputSearch.nativeElement.blur();


    if (!!!event)
      return

    console.log('onProjectChanged', event);


    if ('businessId' in event) {
      this.stateManagerService.resetAllState();

      this.stateManagerService.setBusinessId(event?.businessId, this.apiService, this.router)

      // this.onChange.emit({
      //   'business_id': event?.businessId
      // })

    } else if ('projectId' in event) {
      this.stateManagerService.resetAllState();
      this.stateManagerService.setProjectId(event?.projectId, this.apiService, this.router)


      // this.onChange.emit({
      //   'project_id': event?.projectId
      // })

    }
    this.lockDisplay = true;
    this.value = event;


    this.filteredControlOptions = of(this.filter('')).pipe(
      mergeMap(_ => _)
    );
    return;
    this.filters$.next(event

    );





  }

  identify(index, val) {
    return val?._id?.$oid;
  }
  private filter(value: any) {

    console.log('filterfilter', value, typeof value)
    let filterValue = value;
    if (typeof value !== 'string') {

      filterValue = '';
    }

    filterValue = filterValue.toLowerCase();

    const filterValue$ = filterValue;



    return this.businessMaping
      .pipe(

        map((_: any) => {
          // If business name matches
          // return _.filter((optionValue: any) => optionValue?.name?.toLowerCase().includes(filterValue))

          let searchedResults = [];

          _.forEach(_element => {

            const element = { ..._element };



            if (element?.name?.toLowerCase().includes(filterValue$)) {
              searchedResults.push(element)
            }
            else {
              const projects = [];
              element?.projects?.forEach(element => {

                if (element?.name?.toLowerCase().includes(filterValue$)) {

                  projects.push(element);



                }

              });

              if (projects.length > 0) {
                element.projects = projects;
                searchedResults.push(element)

              }


            }
          });
          // If project name matches

          return searchedResults
        })

      )

  }


  ngOnInit(): void {

    this.filteredControlOptions = this.inputProjectFormControl.valueChanges
      .pipe(
        tap({
          next: (_) => {

          }
        })
        ,
        startWith(''),
        map(filterString => this.filter(filterString)),
        mergeMap(_ => _)
      );



  }


  searchViewHandle(data) {

    if (typeof data === 'string') {
      return data;
    }
    return data?.name;
  }

  onModelChange(value: string) {
    console.log(
      'autoNgModel', value
    )

    this.filteredControlOptions = of(this.filter(value)).pipe(
      mergeMap(_ => _)
    );



  }


}
