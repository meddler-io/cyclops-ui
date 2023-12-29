import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { BehaviorSubject, Observable, shareReplay, tap, map, startWith, mergeMap, switchMap, first, filter, of } from 'rxjs';
import { ApiService } from '../api.service';
import { STATE_CONSTANT_FAILED, STATE_CONSTANT_LOADING, STATE_CONSTANT_NULL, StateManagerService } from '../state-manager.service';

@Component({
  selector: 'app-a-p-selector',
  templateUrl: './a-p-selector.component.html',
  styleUrls: ['./a-p-selector.component.scss']
})
export class APSelectorComponent {

  @Output('onchange') onChange = new EventEmitter<{ project_id?: string, business_id?: string }>();

  loading = true;

  activeApplicationId = this.stateManagerService.activeApplicationId.pipe(

    filter(_ => {

      console.log('loading_loading', _);


      if (!!!_) {
        this.loading = false;
        return false;
      }
      
      if (typeof _ == 'number') {
        if (_ == STATE_CONSTANT_NULL) {
          this.loading = false;
          return;


        } else if (_ == STATE_CONSTANT_LOADING) {
          this.loading = true;
          return;



        }
        else if (_ == STATE_CONSTANT_FAILED) {
          this.loading = false;
          return;


        }
        return false;
      }

      this.loading = false;
      return true;
    }),
    // first(),
    tap({
      next: (app: any) => {

        // let projectId = app?.app?.project_id?.$oid;
        // this.stateManagerService.setProjectId(projectId, this.apiService, this.router);
        console.log('activeApplicationId', app, { name: app?.app?.title, appId: app?.id });
        // this.onProjectChanged( { name: app?.app?.title, appId: app?.id } );
        // this.inputProjectFormControl.setValue({ 'name': 'All', 'appId': appId }, { emitEvent: false });
        // this.inputProjectFormControl = new FormControl( appId , {   validators: [Validators.required] });
        this.value = { name: app?.app?.title, appId: app?.id };


      }
    })
  )

  constructor(
    private apiService: ApiService,
    private stateManagerService: StateManagerService,
    public accessChecker: NbAccessChecker,
    private router: Router,
    private changeDetector: ChangeDetectorRef,

  ) { }

  filters$: BehaviorSubject<{ business_id?: string, project_id?: string }> = new BehaviorSubject({});

  applications = this.filters$.asObservable().pipe(
    mergeMap(filter => { return this.apiService.getApplications(filter?.business_id, filter?.project_id); }),
    shareReplay()
  )


  androidApplications = this.applications.pipe(
    map(_ => _.filter(_ => _?.platform == 'android'))
  )

  webApplications = this.applications.pipe(

    map(_ => _.filter(_ => _?.platform == 'webapp'))

  )

  webserviceApplications = this.applications.pipe(

    map(_ => _.filter(_ => _?.platform == 'webservice'))

  )

  iosApplications = this.applications.pipe(

    map(_ => _.filter(_ => _?.platform == 'ios'))

  )


  @Input('backRouterLink') backRouterLink = [];

  onModelChange(value: string) {
    this.filteredControlOptions = of(this.filter(value)).pipe(
      mergeMap(_ => _)
    );
  }


  // inputProjectFormControl = new FormControl(undefined, { validators: [Validators.required] });

  value;

  filteredControlOptions: Observable<any> = this.apiService.businessMaping().pipe(
    shareReplay()
  )

  businessMaping = this.apiService.businessMaping().pipe(
    shareReplay(),
    tap({
      next: (_) => {

      }
    })
  )


  onProjectChanged(app) {

    console.log(
      'onProjectChanged1', app
    );
    let appId = app?.appId;


    if (appId == '' || appId == undefined || appId == null)
      return


    console.log('fetched_app', 'appId')
    this.stateManagerService.setAppId(appId, this.apiService, this.router);

    this.value = app;

  }

  identify(index, val) {

    return val?._id?.$oid;
  }
  private filter(value: any) {

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

    this.activeApplicationId.subscribe();

    this.stateManagerService.activeProjectId.subscribe( (_: any )=>{
      if(_?.id){
        console.log('poop_activ_ProjectId', _);
        this.filters$.next({project_id: _?.id})
      }
    })


    this.stateManagerService.activeBusinessId.subscribe( (_: any )=>{
      if(_?.id){
        console.log('poop_activ_ProjectId business', _);
        this.filters$.next({business_id: _?.id})
      }
    })


  }


  searchViewHandle(data) {
    console.log('searchViewHandle', data)
    if (typeof data === 'string') {
      return data;
    }
    return data?.name;
  }

}
