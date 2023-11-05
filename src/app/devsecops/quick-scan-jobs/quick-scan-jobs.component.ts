import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, forkJoin, interval, merge, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, exhaustMap, filter, first, map, mergeMap, pairwise, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DrawerService } from '../drawer/drawer.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSelectComponent, NbSidebarService } from '@nebular/theme';
import { TransitionState } from '../build-item/build-item.component';
import { AppScrollableItemDirective } from '../app-scrollable-item.directive';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-quick-scan-jobs',
  templateUrl: './quick-scan-jobs.component.html',
  styleUrls: ['./quick-scan-jobs.component.scss']
})
export class QuickScanJobsComponent implements OnInit {

  page_limit = 30

  @ViewChild('formDomainFieldRef')
  formDomainFieldRef: NbSelectComponent

  domainField = new FormControl('', {
    validators: [Validators.required]
  })

  subdomainField = new FormControl('', {
    validators: [Validators.required]
  })

  searchField = new FormControl('', {

  })



  tabs = [


    {
      title: 'Details',
      route: ['details']

    },
    {
      title: 'Finding',
      route: ['issues']

    },

    {
      title: 'Logs',
      route: ['logs']

    },



  ]


  // isMenuOpen: Observable<boolean | never> = 
  isMenuOpen = merge(

    this.nbSidebarService.onExpand(),
    this.nbSidebarService.onToggle(),
    this.nbSidebarService.onCollapse(),
    this.nbSidebarService.onCompact(),
    of({ tag: 'buildList' })

  ).pipe(



    filter(_ => _?.tag == 'buildList'),



    switchMap(_ => {
      return this.nbSidebarService.getSidebarState('buildList')
    }),

    map(state => {
      console.debug('menumenu2', state);

      // 'expanded' | 'collapsed' | 'compacted';
      if (state == 'expanded') {
        return true;
      }

      return false;
    }),
    tap(_ => {
      console.debug('menumenu', _)
    }),


  );



  buildListLimit = 20

  buildInvalidateIds = new Map<string, number>();
  topBuildId = undefined;
  bottomBuildId = undefined;
  // buildInvalidateIds: Observable<any> = new BehaviorSubject<string[]>([]);
  @ViewChildren(AppScrollableItemDirective) scrollableItems: QueryList<AppScrollableItemDirective>
  active_protection: boolean = false;
  extra_filters = {}
  uuid = undefined;
  last_doc: {
    domain_count: number,
    domain_index: number
  } = {
      domain_count: 0,
      domain_index: 0,
    };
  // loading_discovered_assets: boolean;
  loadingResults: boolean = false;
  last_search_val = '';

  public scrollToSelectedItem(id: string) {
    console.log('distinctUntilChanged', id, this.scrollableItems)
    // this.scrollableItems.last.scrollIntoView()
    const item = this.scrollableItems?.find(x => x.key === id);
    item?.scrollIntoView()
    console.log('distinctUntilChanged', id, item)

    // item.scrollIntoView();
  }



  activeBuildId = this.apiService.selectedBuildId.pipe(
    shareReplay()

  );


  scrollToActiveIdObserver = this.activeBuildId.pipe(
    distinctUntilChanged(),


    // filter(_ => !!_),
    tap(_ => {
      console.debug(
        'distinctUntilChanged',
        _
      );

      this.builds$ = [];
      this.initialResultsLoaded = false;
      this.bottomBuildId = _;
      this.buildInvalidateIds.clear();
      // this.bottomThresholdTrigger()
      // this.loadBuilds()
      // this.scrollToSelectedItem(_)
    })

  );

  scrollToActiveIdObserverSubscription = Subscription.EMPTY;

  // 
  routeSubscription = Subscription.EMPTY;
  activeBuildSubscription = Subscription.EMPTY;
  reportDownloaderZipSubscription = Subscription.EMPTY;
  selectedAppSubscription = Subscription.EMPTY;


  // 

  selectedApp = this.apiService.selectedApp


  assetUrls = this.selectedApp.pipe(
    tap(_ => {

      console.log(
        _
      )
    })
    ,
    filter(_ => !!_?.identifier),
    map(app => {
      return {
        businessId: app?.businessId,
        projectId: app?.projectId,
        platformId: app?.platformId,
        applicationId: app?.application?.applicationId
      }
    }),
    // shareReplay()
  ).pipe(

    take(1),

    mergeMap(_ => {

      return this.apiService.getAssetUrls(
        _?.applicationId?.$oid

      ).pipe(
        // map(_=>{
        //   return _.concat(_).concat(_)
        // })
      )

    })
    ,

    tap(_ => {
      try {

        this.domainField.setValue(_[0]?._id?.$oid, { onlySelf: true, emitModelToViewChange: true, emitViewToModelChange: true })
        console.debug('errror', this.domainField.value)
        // this.domainField.markAsTouched()


      } catch (err) {
        console.debug('errror', err)
      }
    })

  );

  assetSubUrls;

  buttonState = '';

  public onRouterOutletActivate(event: any) {

    if (
      event?.constructor.name == 'FindingsComponent'
    ) {
      this.buttonState = 'finding'
    } else if (
      event?.constructor.name == 'BuildsComponent'
    ) {
      this.buttonState = 'build'

    }
    console.log('event', event);
  }

  buildTransformerPipe = (build) => {

    console.log('buildTransformerPipe', build)

    let timeElpased = 0;
    let build_state = [
      {
        state: build?.state_requested,
        ts: build?.state_requested_ts,
        time_taken: 0,
        title: 'Enqueued'
      },
      {

        state: build?.state_execution,
        ts: build?.state_execution_ts,
        time_taken: 0,
        title: 'Executing'

      },

      {
        state: build?.state_download_raw,
        ts: build?.state_download_raw_ts,
        time_taken: 0,
        title: 'Report Generated'
      },

      {
        state: build?.state_pushed_to_parser,
        ts: build?.state_pushed_to_parser_ts,
        time_taken: 0,
        title: 'Analyzing'
      },

      {
        state: build?.state_parsing_started,
        ts: build?.state_parsing_started_ts,
        time_taken: 0,
        title: 'Parsing'
      },

      {

        state: build?.state_parsing_completed,
        ts: build?.state_parsing_completed_ts,
        time_taken: 0,
        title: 'Finished'
      },

    ]

    build.success = undefined;
    build.failed = false;

    build_state.map((_build_state, index) => {

      if (index == 0) {
        return _build_state
      }

      let prev_build = build_state[index - 1];
      _build_state.time_taken = (_build_state?.ts?.$date - prev_build?.ts?.$date) // milliseconds
      _build_state.time_taken = _build_state?.time_taken / 1000
      _build_state.time_taken = _build_state?.time_taken | 0;
      _build_state.time_taken = Math.ceil(_build_state.time_taken);
      timeElpased += _build_state.time_taken;

      if (_build_state?.state == false) {
        build.failed = true;
      }

      return _build_state;
    })

    build.build_state = build_state;
    build.timeElpased = timeElpased;

    build.finding_stats = this.apiService.getFindingStats(build?.applicationId, build?._id).pipe(


      // map((severityStats: [{ _id: string, count: string }]) => {

      //   let severityMap = {
      //     info: 0,
      //     low: 0,
      //     medium: 0,
      //     high: 0,
      //     critical: 0,
      //   }
      //   severityStats.forEach(_s => {
      //     severityMap[_s._id.toLowerCase()] = _s.count

      //   })
      //   return severityMap;
      // }),


    )

    return build

  }

  buildTopOffsetId$;
  builds$ = []



  allBuildsLoaded: boolean = false;



  constructor(
    private apiService: ApiService,
    private drawerMngr: DrawerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private nbSidebarService: NbSidebarService,




  ) { }
  ngAfterViewInit(): void {


  }

  initialResultsLoaded = false;

  ngOnDestroy(): void {

    this.routeSubscription.unsubscribe();
    this.activeBuildSubscription.unsubscribe();
    this.reportDownloaderZipSubscription.unsubscribe();
    this.selectedAppSubscription.unsubscribe();

    this.scrollToActiveIdObserverSubscription.unsubscribe();
    this.subscrption.unsubscribe()
    this.nbSidebarService.expand();

    this.refreshBuildData.unsubscribe();
  }
  loading = true;

  getBuildData(target) {

    this
      .activatedRoute
      .params
      .pipe(take(1))
      .pipe(tap(_ => {
        console.log(
          'console__', _
        )
      }))
      .subscribe(_ => {

      })


    let data: any = {
      // businessId: app?.businessId,
      // projectId: app?.projectId,
      // platformId: app?.platformId,
      // applicationId: app?.application?.applicationId,
      applicationId: target,
      ...this.extra_filters

    }

    if (this.active_protection === true) {
      // data['active_protection'] = true;
      data = {
        "active_protection": true,
        ...this.extra_filters

      };
    }

    return this.apiService.getDevsecopsBuildData(data, {
      // offset: this.bottomBuildId,
      limit: this.buildListLimit,
      includeOffsetId: !this.initialResultsLoaded ? true : undefined,
    }).pipe(
      filter(_ => !!_),
      map((data: [any]) => {

        return data.map(build => {
          return this.buildTransformerPipe(build)
        })


      }),


      tap(builds => {

        if (builds?.length < this.buildListLimit)
          this.allBuildsLoaded = true;

        if (builds.length <= 0 || !!!builds) {
          console.log(
            'noBuilds',
            builds
          )
          // TODO: Done
          // this.router.navigate(['nobuilds'], { relativeTo: this.activatedRoute })



        } else {



          console.log(
            'activeBuildId',
            this.bottomBuildId
          )
          let build = builds[0];


          if (this.initialResultsLoaded == false) {

            this.buildTopOffsetId$ = build?._id?.$oid;

            this.initialResultsLoaded = true;
            // this.router.navigate(['./', ])
            this.routeSubscription = combineLatest([
              this.activatedRoute.data,
              this.activatedRoute.params
            ]).pipe(
              take(1),
              map(_ => {

                return Object.assign({}, ..._);
              })
              ,

              tap(_ => {
                console.log(
                  'activedataroute', _,
                  this.buttonState,
                  this.buttonState == 'finding'
                );

                if (_?.buildId != build?._id?.$oid) {

                  if (this.buttonState == 'finding') {
                    this.router.navigate([`${build?._id?.$oid}`, 'issues'], { relativeTo: this.activatedRoute })
                  } else {
                    this.router.navigate([`${build?._id?.$oid}`], { relativeTo: this.activatedRoute })

                  }
                }

              })
            ).subscribe()
          }



          this.activeBuildSubscription = this.activeBuildId.pipe(
            take(1)
          ).subscribe(activeBuildId => {


            if (activeBuildId == undefined) {
              console.log(
                'activeBuildId', activeBuildId
              )
              console.log(
                'activeBuildId', activeBuildId,
                `${build?._id?.$oid}`
              )

              // this.router.navigate([`${build?._id?.$oid}`], { relativeTo: this.activatedRoute })
            }

          })




        }

      }),

      tap(builds => {

        let buildIdsToBeRefreshed = new Map<string, number>()
        builds.forEach((build, index) => {

          if (index == 0) {
            this.topBuildId = build?._id?.$oid;
          }

          if (index + 1 == builds?.length) {
            this.bottomBuildId = build?._id?.$oid;
          }




          if (
            build?.transition_state != TransitionState.FAILED
            &&
            build?.transition_state != TransitionState.PARSING_FINISHED
          ) {
            buildIdsToBeRefreshed.set(
              build?._id?.$oid, index
            )
          }
        });

        this.buildInvalidateIds = buildIdsToBeRefreshed;
        console.log(
          'buildInvalidateIds', this.buildInvalidateIds
        )
      })
    )
  }

  downloadRaw(app) {
    this.reportDownloaderZipSubscription = this.apiService.downloadReportZip(
      {
        // businessId: app?.businessId?.$oid,
        // projectId: app?.projectId?.$oid,
        // platformId: app?.platformId?.$oid,
        ...this.extra_filters

        // applicationId: app?.application?.applicationId,
      }

    ).subscribe(_ => {

    })
  }

  onClick(build, index) {



    return;
    // this.apiService.getBuildById(build?._id?.$oid)
    //   .pipe(
    //     switchMap(
    //       build => {
    //         return this.builds
    //           .pipe(
    //             take(1),
    //             map(builds => {


    //               builds[index] = build?.data
    //               return builds
    //             })
    //           )
    //       }

    //     ),
    //     tap(builds => {

    //       // this.builds$.next(builds);
    //       this.builds$ = builds;

    //       console.log(
    //         'noBuilds', builds
    //       )


    //     })
    //   )
    //   .subscribe()


  }

  refreshBuildData = Subscription.EMPTY;
  newBuildsAvailable = false;
  REFRESH_INTERVAL_PERIOD = 1000;
  refreshBuildDataFn() {


    // return of(EMPTY)

    return interval(this.REFRESH_INTERVAL_PERIOD).pipe(
      // tap(_ => console.debug('interval hits every second!')),
      exhaustMap(_ => {
        console.debug("REFRESH_INTERVAL_PERIOD!")


        let buildIds = Array.from(
          this.buildInvalidateIds.keys()
        )

        // if (
        //   buildIds.length == 0 && this.buildTopOffsetId$) {

        //   return EMPTY;
        // }



        return this.apiService.getBuildByIds(
          buildIds,
          this.buildTopOffsetId$,
          this.extra_filters
        )
          .pipe( // simulation that takes 3 seconds to complete
            tap(_ => console.debug(_)),
          )
      })
      ,
      tap(_ => console.debug(_))
      ,



      tap((buildData: { newBuildsFound?: boolean, builds: [{ _id: any, index?: number }] }) => {


        buildData.builds.forEach(build => {
          let buildId = build?._id?.$oid;
          let index = this.buildInvalidateIds.get(buildId)
          // build = this.buildTransformerPipe(build);

        })

        console.log(
          'newBuildsAvailable',
          this.extra_filters

        )
        this.newBuildsAvailable = buildData?.newBuildsFound


      })

      ,

      tap(buildData => {

        let mBuilds = buildData.builds;


        mBuilds.forEach(mBuild => {

          console.debug(
            'mBuild;d',
            mBuild

          )

          mBuild = this.buildTransformerPipe(mBuild);

          console.debug(
            '_mBuild;d',
            mBuild

          )


          let mbuildId = mBuild?._id?.$oid;
          let mIndex = this.buildInvalidateIds.get(mbuildId);

          mBuild.index = this.builds$[mIndex].index;
          this.builds$[mIndex] = mBuild;


        })
      }
      )
  ,
    )
  }

  loadBuilds() {

    this.selectedAppSubscription = this.selectedDomain.pipe(
      filter(_ => !!_),
      switchMap(selectedApp => {


        console.log('_appoopo', selectedApp)
        return this.getBuildData(selectedApp)
      }),

      tap((_) => {
        if (_.length > 0) {


          // this.buildTopOffsetId$ = _[0]?._id?.$oid;

          // this.router.navigate([
          //   './',
          //   this.buildTopOffsetId$
          // ],
          //   {
          //     relativeTo: this.activatedRoute
          //   })
        }
        else {

          this.buildTopOffsetId$ = undefined;

        }
        // this.builds$ = _;
        this.builds$.push(..._)
        this.loading = false;

      }),
    ).subscribe()

  }

  subscrption = Subscription.EMPTY;
  ngOnInit(): void {

    this.routeSubscription.unsubscribe();
    this.activeBuildSubscription.unsubscribe();
    this.reportDownloaderZipSubscription.unsubscribe();
    this.selectedAppSubscription.unsubscribe();


    this.subscrption.unsubscribe();
    this.scrollToActiveIdObserverSubscription.unsubscribe();
    this.scrollToActiveIdObserverSubscription = this.scrollToActiveIdObserver.subscribe()
    this.nbSidebarService.expand('buildList')

    this.subscrption = combineLatest(
      [
        // this.activatedRoute?.parent?.params,
        this.activatedRoute?.params,
        this.activatedRoute?.data,
      ]

    ).pipe(

      tap((params: any) => {
        this.apiService.selectedBuildId$.next(undefined);
      }),

      map(
        (params) => {

          console.log(
            'paramspaps', params
          )

          let _params = {}
          params.forEach(params => {
            _params = Object.assign(_params, params)
          })




          return _params;


        }
      ),

      tap((params: any) => {




        this.apiService.selectedBuildId$.next(params?.buildId);


      })


    ).subscribe(_ => {

      this.active_protection = _?.active_protection || false;
      this.extra_filters = _?.extra_filters || {};

      if (_?.uuid) {
        this.uuid == _?.uuid;
        this.extra_filters['uuid'] = _?.uuid;
      }
      console.debug(
        'active+protection', _.active_protection, this.extra_filters
      )
      // this.activeBuildId.pipe(take(1)).subscribe(_ => {
      this.loadBuilds();

      // })

    });

    // 

    // this.refreshBuildData = this.refreshBuildDataFn().subscribe()


    // TODO: 
    // this.nbSidebarService.collapse();





    this.domainField.valueChanges.pipe(

      startWith('')

      ,
      pairwise(),
      filter(_ => {
        return _[0] != undefined;
      })
      ,
      map(_ => {
        console.log(
          'startWith(0)'
          ,
          _[1]
        )
        if (
          _[0]
          !=
          _[1]
        ) {
          this.searchField.setValue('');

          this.last_search_val = this.searchField.value;

          this.last_doc = {
            domain_count: 0,
            domain_index: 0,
          };
        } else {
          this.last_search_val = this.searchField.value;
        }

        return _[1];
      })
      ,

      tap(_ => {
        this.loadingResults = true;
        console.log(
          'getDiscoveredAssets', _
        )

        if (_ == '*') {
          this.assetSubUrls = this.apiService.getDiscoveredAllFilteredAssets(_
            ,
            this.last_doc.domain_index,
            this.searchField.value,
            this.page_limit).pipe(
              tap(_ => {



                try {


                  if (_?.length > 0) {

                    let __ = _[_.length - 1];
                    this.last_doc = {
                      domain_count: __.domain_count,
                      domain_index: __.domain_index,
                    }


                  } else {
                    this.last_doc = {
                      domain_count: 0,
                      domain_index: 0,
                    };
                  }


                  this.subdomainField.setValue(_[0]?.domain, { onlySelf: true, emitModelToViewChange: true, emitViewToModelChange: true })
                } catch (er) {

                }

              }
              )
              ,
              map((__: any) => {

                console.debug('debugger', __);



                let lastUrl = '';
                __ = __.map(_ => {

                  lastUrl = _?.domain;

                  _.riskScoreColor = 'info';

                  if ('Critical' in _?.item) {
                    _.riskScoreColor = 'critical'
                  }
                  else if ('High' in _?.item) {
                    _.riskScoreColor = 'high'
                  }
                  else if ('Medium' in _?.item) {
                    _.riskScoreColor = 'medium'
                  }
                  else if ('Low' in _?.item) {
                    _.riskScoreColor = 'low'
                  }
                  else if ('Unknown' in _?.item) {
                    _.riskScoreColor = 'info'
                  } else if ('Info' in _?.item) {
                    _.riskScoreColor = 'info'
                  } else {
                    _.riskScoreColor = 'none'

                  }


                  return _;

                })

                console.debug('debugger', _)

                this.lastUrl = lastUrl;
                return __;



              })

              ,
              tap(_ => {
                this.loadingResults = false;

              })




            )
        } else {

          this.assetSubUrls = this.apiService.getDiscoveredAssets(
            _,
            this.last_doc.domain_index,
            this.searchField.value,
            this.page_limit
          ).pipe(
            tap(_ => {



              try {


                if (_?.length > 0) {

                  let __ = _[_.length - 1];
                  this.last_doc = {
                    domain_count: __.domain_count,
                    domain_index: __.domain_index,
                  }


                } else {
                  this.last_doc = {
                    domain_count: 0,
                    domain_index: 0,
                  };
                }


                this.subdomainField.setValue(_[0]?.domain, { onlySelf: true, emitModelToViewChange: true, emitViewToModelChange: true })
              } catch (er) {

              }

            }
            )
            ,
            map((__: any) => {

              console.debug('debugger', __);



              let lastUrl = '';
              __ = __.map(_ => {

                lastUrl = _?.domain;

                _.riskScoreColor = 'info';

                if ('Critical' in _?.item) {
                  _.riskScoreColor = 'critical'
                }
                else if ('High' in _?.item) {
                  _.riskScoreColor = 'high'
                }
                else if ('Medium' in _?.item) {
                  _.riskScoreColor = 'medium'
                }
                else if ('Low' in _?.item) {
                  _.riskScoreColor = 'low'
                }
                else if ('Unknown' in _?.item) {
                  _.riskScoreColor = 'info'
                } else if ('Info' in _?.item) {
                  _.riskScoreColor = 'info'
                } else {
                  _.riskScoreColor = 'none'

                }


                return _;

              })

              console.debug('debugger', _)

              this.lastUrl = lastUrl;
              return __;



            })

            ,
            tap(_ => {
              this.loadingResults = false;

            })




          )
        }

      })
    ).subscribe(_ => {


    })

    this.subdomainField.valueChanges.pipe(

    ).subscribe(_ => {

      this.selectedDomain.next(_);
    })



  }
  lastUrl = '';
  selectedDomain = new Subject();


  onClickBuild(build) {


    console.log(
      'onClickBuild',
      build?.last_success_build?._id?.$oid
    )
    if (build?.last_success_build?._id?.$oid)
      this.router.navigate(['../', `${build?.last_success_build?._id?.$oid}`], { relativeTo: this.activatedRoute });
    // this.downloadRaw(build?.application)
    return;
    this.openDrawer(build)
    console.log('build', build)
  }
  @ViewChild('editTmpl', { static: false }) editTmpl: TemplateRef<any>;

  openDrawer(context, direction = 'left', size?, closeOnOutsideClick = true, template = this.editTmpl, isRoot = true, parentContainer?: any) {
    this.drawerMngr.create({
      direction: DrawerDirection.Left,
      template,
      size,
      context: {
        build_id: context?._id?.$oid,
        application_id: context?.applicationId?.$oid,


      },
      closeOnOutsideClick,
      parentContainer,
      isRoot
    });
  }

  trackBuild(index, item) { return item?._id?.$oid; }

  toggleSidebar() {
    this.nbSidebarService.toggle(false, 'buildList')
  }
  loadNewBuilds() {
    this.router.navigate(
      [
        './'

      ],
      {
        relativeTo: this.activatedRoute.parent
      }
    )
    this.loadBuilds()

  }


  bottomThresholdTrigger(event?) {
    if (
      this.loading
      ||
      this.allBuildsLoaded
    )
      return
    console.log('bottomThresholdTrigger', this.allBuildsLoaded, event)
    this.loadBuilds()

  }
  resetBuilds() {
    this.builds$ = []
  }


  runQuickDynamicScan(url) {
    this.selectedApp.pipe(

      filter(_ => !!_?.identifier),
      map(app => {
        return {
          businessId: app?.businessId,
          projectId: app?.projectId,
          platformId: app?.platformId,
          applicationId: app?.application?.applicationId
        }
      })
    ).pipe(

      take(1),
      mergeMap(_ => {
        _['target'] = url;
        return this.apiService.runQuickDynamicScan(_)
      })

    ).subscribe(_ => {
      return;

    })



  }

  previousPage() {

    this.last_doc.domain_index -= this.page_limit;
    if (this.last_doc.domain_index <= 0) {
      this.last_doc.domain_index = 0;
    }

    this.domainField.setValue(this.domainField.value, {
      emitEvent: true,
      emitModelToViewChange: false,
      emitViewToModelChange: false
    })
  }

  goToNext() {
    // this.loadingResults = true;

    this.domainField.setValue(this.domainField.value, {
      emitEvent: true,
      emitModelToViewChange: false,
      emitViewToModelChange: false
    })

  }
  goto(page) {
    // this.loadingResults = true;

    this.last_doc.domain_index = this.page_limit * page;
    this.domainField.setValue(this.domainField.value, {
      emitEvent: true,
      emitModelToViewChange: false,
      emitViewToModelChange: false
    })
  }
  math = Math

  searchDomain() {

    this.last_doc = {
      domain_count: 0,
      domain_index: 0,
    };

    this.domainField.setValue(this.domainField.value, {
      emitEvent: true,
      emitModelToViewChange: false,
      emitViewToModelChange: false
    })
  }


  searchDeactivated(event) {
    this.searchActive = false;

    console.log('searchDomain', event)

    this.searchField.setValue(this.last_search_val);

    return

    if (this.last_search_val != this.searchField.value)
      this.searchDomain()


  }
  searchActive = false;
  searchActivated(event) {
    this.searchActive = true;
  }

  cancelSearch() {

    this.searchField.setValue(this.last_search_val);

  }

}
