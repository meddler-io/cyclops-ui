import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { ApiService } from '../api.service';
import { Observable, EMPTY, Subscription, tap, map, mergeMap, startWith, shareReplay, filter, of, BehaviorSubject, switchMap, takeUntil, Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-apps-sidebar',
  templateUrl: './manage-apps-sidebar.component.html',
  styleUrls: ['./manage-apps-sidebar.component.scss']
})
export class ManageAppsSidebarComponent implements AfterContentChecked, OnInit, OnDestroy, AfterViewInit {

  // visible lists

  searchActive = false;


  webappsVisible = true;
  toggleWebAppList() {
    this.webappsVisible = !this.webappsVisible;
  }


  webserviceVisible = true;
  toggleWebServiceList() {
    this.webserviceVisible = !this.webserviceVisible;
  }



  iosVisible = true;
  toggleIosList() {
    this.iosVisible = !this.iosVisible;
  }


  androidVisible = true;
  toggleAndroidList() {
    this.androidVisible = !this.androidVisible;
  }



  toggleSearchBar(value: boolean) {

    this.searchActive = value;
  }


  inputProjectFormControlFinalised = '';

  inputProjectFormControl: FormControl = new FormControl('', { validators: [Validators.required] });

  businessMaping = this.apiService.businessMaping().pipe(
    shareReplay(),
    tap({
      next: (_) => {
        console.log('loggerbithc', _[5])
      }
    })
  )

  filteredControlOptions: Observable<any> = this.apiService.businessMaping().pipe(
    shareReplay()
  )


  filters$ = new BehaviorSubject(
    {
      projectId: undefined,
      businessId: undefined
    }
  );



  applications = this.filters$.asObservable().pipe(
    mergeMap(filter => {


      return this.apiService.getApplications(filter?.businessId, filter?.projectId);
    }

    )
    ,
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

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public accessChecker: NbAccessChecker,
    private router: Router,
    private changeDetector: ChangeDetectorRef,

  ) { }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  ngAfterViewInit(): void {

  }

  searchViewHandle(data) {
    if (typeof data === 'string') {
      return data;
    }
    return data?.name;
  }

  onProjectChanged(event) {

    console.log('projectChanged', event);

    this.filters$.next(event
    );

  }

  currentAppId = this.activatedRoute.parent.firstChild.paramMap.pipe(

    map(_ => _.get('appid')),
    // shareReplay()
  )

  manageApp(oldAppId, appId) {


    const newUrl = this.router.url.replace(oldAppId, appId);
    console.log(
      'newUrl', newUrl,
      this.activatedRoute.snapshot.parent.children
    )


    this.router.navigate(
      [{ 'outlets': { 'primary': ['manage-apps', appId, 'settings'] } }], { relativeTo: this.activatedRoute.parent }
    );


    // this.router.navigateByUrl(newUrl);




  }
  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  ngOnInit(): void {


    this.activatedRoute.parent.children.forEach(_ => {
      _.paramMap
        .pipe(takeUntil(this.destroy$))
        .pipe(
          map((paramMap: ParamMap) => {
            // Access the parameters using the paramMap
            return paramMap.get('appid');
          })
        )


        .subscribe(_ => {
          console.log('debugger', _)
        })





    })
    
    this.filteredControlOptions = this.inputProjectFormControl.valueChanges
      .pipe(
        tap({
          next: (_) => {
            console.log('loggerbithc', _)
          }
        })
        ,
        startWith(''),
        map(filterString => this.filter(filterString)),
        mergeMap(_ => _)
      );


    console.log('activatedRoute', this.activatedRoute.snapshot.parent.url)


  }



  identify(index, val) {
    // console.log('identify', val?._id?.$oid);
    return val?._id?.$oid;
  }


  private filter(value: any) {

    let filterValue = value;
    if (typeof value !== 'string') {
      filterValue = '';
    }

    filterValue = filterValue.toLowerCase();

    const filterValue$ = filterValue;
    console.log('filter', value, '312', value)


    return this.businessMaping
      .pipe(

        map((_: any) => {
          // If business name matches
          // return _.filter((optionValue: any) => optionValue?.name?.toLowerCase().includes(filterValue))

          let searchedResults = [];
          console.log(
            'filtertest', _, filterValue$
          )
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

}
