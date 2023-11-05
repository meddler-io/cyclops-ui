import { KeyValue } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { BehaviorSubject, combineLatest, EMPTY, forkJoin, merge, of, Subject, Subscriber, Subscription } from 'rxjs';
import { combineLatestAll, combineLatestWith, debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, scan, share, shareReplay, startWith, switchMap, tap, throttleTime } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { AppScrollableItemDirective } from '../app-scrollable-item.directive';
import { BusinessListComponent } from '../business-list/business-list.component';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit, OnDestroy {

  _selectedBusiness = new FormControl('');
  _selectedProject = new FormControl('');
  _integrated = new FormControl('');



  projects$;

  business$ = this.apiService.getAssociatedBusinesses().pipe(
    tap(b => {
      console.log('bbb', b)
    })
  );


  searchQuery$ = new BehaviorSubject('')
  searchQuery = this.searchQuery$.asObservable().pipe(
    tap(
      searchQ => {
        console.log('searchQ');
        // this.setupApplicationIdChangeObserver();
        
      }
    ),

    tap(_ => {
      this._loadingBottom = false;
      this._loadingTop = false;
      this.applications$.next('reset');
    }),

    debounceTime(1000),

  )

  @Input('searchQuery') set setSearchQuery(searchQuery) {
    console.log('searchQuery', searchQuery)
    this.searchQuery$.next(searchQuery);
  }

  @ViewChildren(AppScrollableItemDirective) scrollableItems: QueryList<AppScrollableItemDirective>


  @ViewChild('appList') appListEl: ElementRef;

  initLoaded$ = false;

  public handleDayClick(day: string) {
    console.log('appListEl', day, this.scrollableItems)
    this.scrollableItems.last.scrollIntoView()
    // const item = this.scrollableItems.find(x => x.key === day)
    // item.scrollIntoView();
  }

  selectedApp = this.apiService.selectedApp.pipe(


    tap(_ => {

      console.log('selectedApp', _)
    }),
    // filter(_ => !!_),
    shareReplay(),

  )

  // _selectedApp = of('61b78af386478b8f9e9fea51').pipe(
  //   tap(_ => {
  //     // this.initLoaded$ = true;
  //   })
  // )

  pagination_limit = 20;
  current_slice_offset = 0;

  sidebarVisible = true;

  searchFieldControl = new FormControl('')


  searchActivated = false;


  searchFielObserver = this.searchFieldControl.valueChanges.pipe(
    startWith(
      this.searchFieldControl.value),
    // filter(searchVal => searchVal.length > 2),
    tap(val => {
      this.apps_filtered.clear()
      this.loadingSearchResults = true;

    }),
    debounceTime(1000),

    switchMap((searchVal) => {

      if (
        searchVal.length <= 2
      ) {

        return of(new Map());
      }

      searchVal = searchVal.toLowerCase()
      return this.apps.pipe(
        map(apps => {


          let integrated_filtered_app_map = new Map()
          let unintegrated_filtered_app_map = new Map()



          let filtered_apps = [...apps.entries()].filter((entry) => {


            // if()
            let result = entry[1]?.application?.applicationName?.toLowerCase().includes(searchVal)
            if (result == true)
              return true;

            result = entry[1]?.platformName?.toLowerCase().includes(searchVal)
            if (result == true)
              return true;

            result = entry[1]?.projectName?.toLowerCase().includes(searchVal)
            if (result == true)
              return true;

            result = entry[1]?.businessName?.toLowerCase().includes(searchVal)
            if (result == true)
              return true;

            return false;
          }).forEach(entry => {
            if (entry[1]?.application?.scan_data)
              integrated_filtered_app_map.set(...entry);
            else
              unintegrated_filtered_app_map.set(...entry);

          })

          let filtered_app_map = new Map([...Array.from(integrated_filtered_app_map.entries()), ...Array.from(unintegrated_filtered_app_map.entries())]);


          return filtered_app_map;
        }
        ))
    }
    )


  )


  toggleSearch() {
    this.searchFieldControlSubscription.unsubscribe()

    this.searchActivated = !this.searchActivated;

    if (this.searchActivated == true) {

      this.searchFieldControlSubscription = this.searchFielObserver
        .subscribe(filtered_apps => {

          this.loadingSearchResults = false;
          console.log(
            'filtered_apps'
          )
          this.apps_filtered = filtered_apps



        })

    }

  }


  ngAfterViewInit() {
    // this.setFocus(); // If the button is already present...
    // this.durationButton.changes.subscribe(() => {
    //   this.setFocus();
    // });
  }

  buildExplorer = true;

  tabs = [


    {
      title: 'Details',
      route: [
        'details'
      ]

    },
    {
      title: 'Config',
      route: ['config']

    },

    {
      title: 'Integration',
      route: ['integration']
    },


    {
      title: 'Builds',
      disabled: true,
      route: ['builds']
    },



  ]

  // appHier = this.apiService.appHier.subscribe()




  selectedBusiness = this.apiService.selectedBusiness.pipe(
    // share()
  )

  selectedProject = this.apiService.selectedProject.pipe(

    // share()
  )
  changeTab(event) {

    // console.log('changeTab', event)
  }




  // integrated_apps$ = new BehaviorSubject(new Map())
  // unintegrated_apps$ = new BehaviorSubject(new Map())
  apps$ = new BehaviorSubject(new Map())



  // integrated_apps = this.integrated_apps$.pipe()
  // unintegrated_apps = this.unintegrated_apps$.pipe()
  apps = this.apps$.pipe(

    switchMap(apps => {



      return this.toggleInActiveState$.asObservable().pipe(
        combineLatestWith(this.toggleActiveState$.asObservable())
      ).pipe(
        distinctUntilChanged(),
        map(_ => {



          // let filtered_app_map = new Map([...Array.from(integrated_filtered_app_map.entries()), ...Array.from(unintegrated_filtered_app_map.entries())]);


          return new Map(

            Array.from(apps.entries()).filter(([k, v]) => {

              return v?.integrated == _[0] || v?.integrated != _[1]
            })

          )

        })
      )

    }
    )
  )


  pagination_text = this.apps.pipe(
    map(apps => Math.ceil(apps?.size / this.pagination_limit))
    ,
    map(total_pages => {
      return {
        current_page: Math.ceil(this.current_slice_offset / this.pagination_limit),
        total_pages: total_pages
      }
    }),
    shareReplay()
  )

  goToPreviousPage() {

    this.current_slice_offset -= this.pagination_limit;

    this.router.navigateByUrl(

      '/devsec/switch'

    )

  }


  goToNextPage() {

    this.current_slice_offset += this.pagination_limit;

  }


  apps_filtered = new Map();

  bottomOffsetId;
  topOffsetId;


  _loadingTop = false;
  _loadingBottom = false;

  _completedTop = false;
  _completedBottom = false;


  enableTopMoreLoading = false;

  loadMoreTop$ = new Subject<number>()

  loadMoreTop = this.loadMoreTop$.pipe(
    filter(_ => this.enableTopMoreLoading),
    filter(_ => {
      return !this._loadingTop;;
    }),
    tap(_ => {
      this._loadingTop = true;
    }),
    map(_ => {
      return 'above'
      // this._loadingTop = true;
    }
    )
  )


  loadMoreBottom$ = new Subject<number>()
  loadMoreBottom = this.loadMoreBottom$.pipe(
    filter(_ => {
      return !this._loadingBottom;;
    }),
    tap(_ => {
      this._loadingBottom = true;
    }),
    map(_ => {
      return 'below'
      // this._loadingTop = true;
    }
    )
  )

  reset$ = new Subject<'reset'>();

  _reset(event) {
    console.log('reset')
    // this.reset$.next('reset');
    this.setupApplicationIdChangeObserver()
    this.applications$.next('reset');

    this.searchQuery$.next(this.searchFieldControl.value);


  }

  applications$ = new Subject()

  applications = this.applications$.pipe(scan((acc: any, val: any) => {

    console.log('val', val)

    if (val == 'reset') {
      this.topOffsetId = undefined;
      this.bottomOffsetId = undefined;
      console.log('valreset', val)
      this._loadingBottom = false;
      this._loadingTop = false;

    
      return [];
    }

    // // 
    // if (val == undefined) {

    //   if (acc.direction == 'above') {
    //     this._loadingTop = false;
    //   } else {
    //     this._loadingBottom = false;
    //   }

    // } else {

    //   if (val.direction == 'above') {
    //     this._loadingTop = false;
    //   } else {
    //     this._loadingBottom = false;
    //   }
    // }


    // 
    console.log(
      '_findings_findings', acc, val
    )

    if (val == undefined) {
      // this.lastFindingIdOffset = 0;
      return []
    }

    if (acc == undefined)
      return val;
    else {

      if (val.length > 0) {

        if (val[0]['_direction'] == 'above') {
          acc = val.concat(acc);
          this._loadingTop = false;
          // acc = val;

        } else if (val[0]['_direction'] == 'below') {
          acc = acc.concat(val);
          this._loadingBottom = false;

        } else {
          acc = val;




        }

      }

      return acc;
    }



  }
  ),

    tap((_: [any]) => {

      if (_.length > 0) {
        // this.topOffsetId = _[0]?.application?.applicationId?.$oid;
        // this.bottomOffsetId = _[_.length - 1].application?.applicationId?.$oid;

        this.topOffsetId = _[0]?.index;
        this.bottomOffsetId = _[_.length - 1]?.index;
      }
      if (this.initLoaded$ == false) {
        this.initLoaded$ = true;
        this.bottomThresholdTrigger(undefined);
        this.topThresholdTrigger(undefined);
      }

      // this.scrollableItems?.last?.scrollIntoView();

    }),



    startWith([])

  )

  setupApplicationIdChangeObserver() {

    // this.searchQuery$.next('reset');
    this.applications$.next('reset');
    this.applicationIdChangeObserver?.remove(undefined);
    this.applicationIdChangeObserver = this.searchQuery.pipe(
      switchMap(searchQ => {


        console.log(
          'searchQQ', searchQ
        )

        return merge(
          // this.reset$,
          this.activatedRoute.data.pipe(
            filter(_ => !!_),
            filter((_: any) => _?.no_app_selected == !!_),
            map(_ => {
              return undefined;
            })

          ),
          this.loadMoreTop,
          this.loadMoreBottom,
          this.selectedApp.pipe(
            // filter(_ => !!_?.identifier),
            // filter(_ => _?.identifier == '*'),
            map((_: any) => _?.identifier),
          )
        ).pipe(
          mergeMap((direction: 'below' | 'above' | 'reset') => {
            console.debug('nextnext_', direction);
            console.log('direction', direction);

            if (direction == 'reset') {
              this.initLoaded$ = false;
              this._completedTop = false;
              this._completedBottom = false;
              return of('reset')
            }

            if (direction == 'below' || direction == 'above') {

              let offsetId = undefined;
              if (direction == 'below') {
                offsetId = this.bottomOffsetId;
              } else if (direction == 'above') {
                offsetId = this.topOffsetId;
              }


              let getApp = (searchQuery: string) => {
                return this.apiService.getUserApplication({
                  limit: 20,
                  direction: direction,
                  offsetId: offsetId,
                  searchQuery: searchQuery,
                  filterProjectId: this._selectedProject.value,
                  filterBusinessId: this._selectedBusiness.value,
                  integrated: this._integrated.value

                }).pipe(
                  map((_: any) => {
                    return (_?.data as []).map((_: {}) => {
                      _['_direction'] = direction;
                      return _;
                    })
                  }),

                  tap((_: []) => {
                    if (_.length <= 0) {
                      if (direction == 'below') {
                        this._completedBottom = true;
                        this._loadingBottom = false;


                      } else if (direction == 'above') {
                        this._completedTop = true;
                        this._loadingTop = false;

                      }
                    }

                  })
                  ,
                  finalize(() => {
                    this._loadingBottom = false;
                    this._loadingTop = false;
                  })


                );
              }

              return getApp(searchQ)
              // return this.searchQuery.pipe(


              //   switchMap(_ => getApp(_)))

            } else {

              // this.applications$.next('reset')

              this.initLoaded$ = false;
              this._completedTop = false;
              this._completedBottom = false;

              // if(direction == undefined)
              // return of([]);

              let limit = 1;
              if (direction == undefined) {
                limit = 20;
              }




              let getApp = (searchQuery: string) => {

                return this.apiService.getUserApplication({
                  limit: limit,
                  offsetId: direction,
                  includeOffsetId: true,
                  searchQuery: searchQuery,
                  filterProjectId: this._selectedProject.value,
                  filterBusinessId: this._selectedBusiness.value,
                  integrated: this._integrated.value



                }).pipe(
                  map((_: any) => {

                    if (_?.status == false)
                      return [];

                    return (_?.data as []).map((_: {}) => {
                      _['_direction'] = direction;
                      return _;
                    })
                  }),




                  finalize(() => {
                    this._loadingBottom = false;
                    this._loadingTop = false;
                  })


                )

              }

              return getApp(searchQ)

              return this.searchQuery.pipe(

                switchMap(_ => getApp(_)))


            }

          })
        )


      })
    ).subscribe(_ => {

      console.log('nextnext', _)
      this.applications$.next(_)
    })


  }

  applicationIdChangeObserver = Subscription.EMPTY;

  _applications = this.apiService.applications.pipe(

    tap(_ => {
      console.debug('appppp', _)
    }),

    map((items: []) => {

      let integrated_apps = new Map()
      let unintegrated_apps = new Map()

      let apps = new Map()



      items.forEach((item: any) => {
        if (item?.application?.scan_data) {
          item['integrated'] = true;
          integrated_apps.set(item?.application?.applicationId?.$oid, item);
        }
        else {
          item['integrated'] = false;
          unintegrated_apps.set(item?.application?.applicationId?.$oid, item);
        }





        // unintegrated_apps[item?.application?.applicationId?.$oid] = item;


      })

      let index = 0;

      integrated_apps.forEach((v, k) => {

        v['index'] = index;
        apps.set(k, v);
        index += 1;
      })

      unintegrated_apps.forEach((v, k) => {

        v['index'] = index;

        // TODO: Debug performance
        // if (index < 20)
        apps.set(k, v);

        index += 1;


      })


      return {
        // integrated_apps: integrated_apps,
        // unintegrated_apps: unintegrated_apps,
        apps: apps

      }
    }),

    tap(_ => {



      // this.integrated_apps$.next(_.integrated_apps)
      // this.unintegrated_apps$.next(_.unintegrated_apps)

      this.apps$.next(_.apps)





    },




    ),


    startWith(undefined)




  )




  BusinessListComponent = BusinessListComponent
  ProjectListComponent = ProjectListComponent


  activeAppId = this.activatedRoute.parent.paramMap.pipe(


    map(
      _ => {

        console.debug(
          'activeAppId', _
        )
        return _.get('app_id')
      }
    ),
    filter(_ => {
      this.reset$.next('reset');
      this.loadSelectedAppDetailedView(_)

      // console.log('activatedroute', _)

      if (!!!_)
        return false;

      return true;


    }),

    shareReplay(),

  )

  setDefaultAppForSelection() {



    // console.log(
    //   'boomboom',
    //   this.integrated_apps$.value.values(),
    //   this.integrated_apps$.value.values().next().value?.
    // )

    // 
    if (!!this.apps && this.apps$?.value.size > 0) {
      this.selectApp(this.apps$.value.values().next().value)

    } else {
      this.selectApp(undefined)

    }




    // 
  }

  loadSelectedAppDetailedView(appId) {




    if (appId == '*') {
      return this.setDefaultAppForSelection()
    }

    if (!!!appId)
      return this.setDefaultAppForSelection()



    if (this.apps$.value.has(appId)) {
      this.apiService.selectApp(this.apps$.value.get(appId))
      return
    } else {
      return this.setDefaultAppForSelection()

    }




  }

  open(dialog: TemplateRef<any>, data) {
    this.dialogService.open(dialog, { context: data });
  }


  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      dialogClass: 'positionalDilog',

      context: {
        title: 'Are you sure you want to delete all the tasks ?',
        description: 'All the tasks will be lost, and you won\'t be able to recover them in future.    '

      }
    })
      .onClose
      .subscribe(data => {

      })
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private dialogService: NbDialogService,
    public accessChecker: NbAccessChecker





  ) {



  }
  ngOnDestroy(): void {
    this.appSubscription.unsubscribe()
    this.searchFieldControlSubscription.unsubscribe()
    this.applicationIdChangeObserver.unsubscribe();

    // console.log('onDestroy')

  }

  loadingSearchResults = false;
  appSubscription = Subscriber.EMPTY;
  searchFieldControlSubscription = Subscriber.EMPTY;
  ngOnInit(): void {
    this.setupApplicationIdChangeObserver()

    this.appSubscription.unsubscribe();
    this.appSubscription = this.selectedApp.subscribe(console.log)
    console.log('ngOnInot');


    this._selectedBusiness.valueChanges.pipe(
      startWith(this._selectedBusiness.value),
      tap(_ => {
        console.log('_selectedBusiness', _);
        this._selectedProject.setValue('');
        this._integrated.setValue('');

        if (_ == '') {
          this.projects$ = this.apiService.getAllProjects()
        } else {
          this.projects$ = this.apiService.getAssociatedBusinessesByProjectId(_)
        }


        this.applications$.next('reset');
        this.searchQuery$.next(this.searchQuery$.value);



      })
    ).subscribe()

    this._selectedProject.valueChanges.pipe(
      startWith(this._selectedProject.value),
      tap(_ => {
        console.log('_selectedProject', _);
        this.applications$.next('reset');
        this.searchQuery$.next(this.searchQuery$.value);




      })
    ).subscribe()


    this._integrated.valueChanges.pipe(
      startWith(this._integrated.value),
      tap(_ => {
        console.log('_selectedProject', _);
        this.applications$.next('reset');
        this.searchQuery$.next(this.searchQuery$.value);


      })
    ).subscribe()



  }

  selectApp(app) {
    return;


    let secondary_route = {
      app_main: [
        'subcomp',
        'config'
      ]
    }


    if (!!app?.application?.scan_data) {


      secondary_route = {
        app_main: [
          'subcomp',
          'builds'
        ]
      }

    }



    if (
      !!!app?.application?.applicationId?.$oid

    )
      return

    console.log('routerselectapp', app)
    // return;

    this.router.navigate([

      // 'app_menu',
      // '312312'

      '/',
      'devsec',
      // 'new_test',
      app?.application?.applicationId?.$oid,
      'builds'
      // '',devs
      // {
      //   outlets: {
      //     app_main: [
      //       app?.application?.applicationId?.$oid
      //     ]
      //   }
      // }

    ],
      // { relativeTo: this.activatedRoute.parent }
    )


  }


  customOrder = (a: KeyValue<string, { index: number }>, b: KeyValue<number, { index: number }>): number => {

    return a.value.index > b.value.index ? 1 : -1;
  }


  toggleInActiveState$ = new BehaviorSubject(true);
  toggleActiveState$ = new BehaviorSubject(true);

  toggleInActive(event) {
    this.toggleActiveState$.next(event)


  }

  toggleActive(event) {
    this.toggleInActiveState$.next(event)

  }

  trackByFn(index, item) {
    console.log('customOrder', item)
    return item.name;
  }

  bottomThresholdTrigger(event) {

    if (this._completedBottom)
      return

    if (!this.initLoaded$)
      return
    console.log('bottomThresholdTrigger', event);
    // if (this._loadingBottom)
    // return
    // this._loadingBottom = true;
    this.loadMoreBottom$.next(-1);
  }

  topThresholdTrigger(event) {

    if (this._completedTop)
      return

    if (!this.initLoaded$)
      return
    console.log('topThreshold', event)
    // if (this._loadingTop)
    // return

    // this._loadingTop = true;
    this.loadMoreTop$.next(1);

  }

  edit(ref, identifier, data) {

    this.apiService.
      editBusiness(identifier, data)
      .subscribe(d => {
        ref.close();

        this.business$ = this.apiService.getAssociatedBusinesses().pipe(
          tap(b => {
            console.log('bbb', b)
          })
        );

        this.applications$.next('reset');
        this.searchQuery$.next(this.searchQuery$.value);


      })
  }

  editproject(ref, businessId, _id, data) {

    console.log(businessId, _id, data)


    this.apiService.
      editProject(businessId, _id, data)
      .subscribe(d => {

        ref.close();

        // this.applications$.next('reset');
        // this.searchQuery$.next(this.searchQuery$.value);

        this._selectedBusiness.setValue(this._selectedBusiness.value)


      })

    // ref.close()
  }

}
