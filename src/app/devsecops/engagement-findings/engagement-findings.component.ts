import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbCheckboxComponent, NbContextMenuDirective, NbOverlayService, NbPopoverComponent, NbPosition, NbSidebarService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { BehaviorSubject, map, filter, switchMap, tap, share, startWith, Subject, shareReplay, Observable, take, of } from 'rxjs';
import { NewSidebarService } from 'src/app/new-sidebar.service';
import { ApiService } from '../api.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { DrawerService } from '../drawer/drawer.service';
import { EngagementService } from '../engagement.service';
import { FindingStatsComponent } from '../finding-stats/finding-stats.component';
import { ColorSeverity, EngagementState } from 'src/environments/constants';
import { trigger } from '@angular/animations';
import { DRAWER_ANIMATION } from '../drawer/drawer.animation';

@Component({
  selector: 'app-engagement-findings',
  animations: [trigger('drawerTransition', DRAWER_ANIMATION)],

  templateUrl: './engagement-findings.component.html',
  styleUrls: ['./engagement-findings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EngagementFindingsComponent implements OnInit {

  @ViewChildren('markFind') markFind: QueryList<NbCheckboxComponent>;


  ColorSeverity = ColorSeverity;
  @ViewChild(NbContextMenuDirective) contextMenu: NbContextMenuDirective;

  markMode = false;

  markAll$ = false;

  markAll() {



    this.findings$.pipe(
      take(1),
      tap((_: any[]) => {
        _.forEach(_ => {

          _?.subscribe(_ => {


            if (_?.marked_for_review_under_other_engagement == false)
              this.markedFindings.add(_?._id?.$oid)

          })


          return true;
        })
      })

    ).subscribe()


  }

  markedFindings = new Set()

  markModeChanged() {
    this.markAll$ = false;
    this.markedFindings.clear();

    if (this.markMode) {
      this.markAll();
    }
  }

  markFindingWithChecks(finding, id) {

  }

  markFinding(marked, index, id) {






    if (marked == true)
      this.markedFindings.add(id);
    else
      this.markedFindings.delete(id);


  }

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  openMenu() {


    setInterval(

      () => {

        this.contextMenu.position = NbPosition.BOTTOM;



        // U

      }
      ,
      10
    )
    // this.contextMenu.rebuild();

    this.contextMenu.show();
    return false;
  }



  math = Math
  findingsListLimit = 20;
  totalFindings = 0;



  under_review_count = 0;
  under_review_others_count = 0;
  under_review_current_count = 0;

  open_count = 0;
  all_count = 0;

  currentPage;
  totalPages;


  filter_finding_tab$ = new BehaviorSubject('open'); // 'all' , 'open' , under_review' , 'under_review_others : new , recurrent , draft

  filter_finding_tab = this.filter_finding_tab$.pipe(shareReplay());


  @ViewChild('editTmpl', { static: false }) editTmpl: TemplateRef<any>;
  @ViewChild('createFindingTmpl', { static: false }) createFindingTmpl: TemplateRef<any>;
  @ViewChild('viewFindingTmpl', { static: false }) viewFindingTmpl: TemplateRef<any>;







  sortFindingFilter: {
    numerical_severity?: number,
    active?: number,
    found_by?: number,

  } = {
      numerical_severity: 1,
      // active: 0,
      // found_by: 0,
      // numerical_severity: 0,

    }
  lastFindingIdOffset: number = 0;
  lastFindingPageLength: number = 0;
  finishedLoadingFindings$: boolean = false;
  loadMoreFindings$ = new BehaviorSubject<number>(1)

  toggleSort(key: any) {
    if (this.sortFindingFilter[key] == undefined
      ||
      this.sortFindingFilter[key] == 0

    ) {
      this.sortFindingFilter = {

      }

      this.sortFindingFilter[key] = 1
    } else {

      if (
        this.sortFindingFilter[key] == 1
      ) {

        this.sortFindingFilter[key] = -1
      } else {
        this.sortFindingFilter[key] = 1

      }
    }

    console.log('sortFilter', this.sortFindingFilter)
    this.refreshFindings()
  }


  refreshFinding(_id) {
    this.refreshIndividualFindingSignal.get(_id).next(1);

  }
  selectedBuildId = new FormControl();



  selectedApp = this.apiService.selectedApp;



  builds = this.activatedRoute.paramMap.pipe(

    map(_ => {
      return _?.get('buildId')
    }),
    filter(_ => !!_),

    switchMap(buildId => {
      return this.selectedApp.pipe(

        filter(_ => !!_?.identifier),


        switchMap(selectedApp => {

          console.log(
            'switchMap', selectedApp
          )
          return this.getBuildData(selectedApp)
        }),
        // map(data => data?.data),
        tap((builds: [{ _id: { $oid: string } }]) => {
          if (builds?.length > 0) {
            // this.selectedBuildId.setValue(builds[0]?._id?.$oid);
            // this.selectedBuildId.setValue(buildId);
            this.selectedBuildId.setValue(buildId);

          }
        }),

        share(),
        startWith(undefined),


      )
    })
  );

  // TODO: Add sel. build
  _builds = this.selectedApp.pipe(

    filter(_ => !!_?.identifier),


    switchMap(selectedApp => {

      console.log(
        'switchMap', selectedApp
      )
      return this.getBuildData(selectedApp)
    }),
    // map(data => data?.data),
    tap((builds: [{ _id: { $oid: string } }]) => {
      if (builds?.length > 0) {
        this.selectedBuildId.setValue(builds[0]?._id?.$oid);

      }
    }),

    share(),
    startWith(undefined),


  )

  getBuildData(app) {
    return this.apiService.getDevsecopsBuildData({
      businessId: app?.businessId,
      projectId: app?.projectId,
      platformId: app?.platformId,
      applicationId: app?.application?.applicationId,
    },
      {

      }).pipe(


        tap(
          console.log
        )
      )
  }


  selectedBuildIdFilter = new BehaviorSubject(undefined);


  findingStats = this.selectedBuildId.valueChanges.pipe(



    startWith(this.selectedBuildId.value)
    ,
    tap(_ => {
      console.debug(
        'selectedBuildId',
        _
      )
    }),

    filter(_ => !!_),

    map(
      _ => {
        if (!!!_) {
          return []
        }

        return _;
      }
    ),

    switchMap(
      (selectedBuildId) => {
        return this.selectedApp.pipe(map(selectedApp => {
          return { selectedApp: selectedApp, selectedBuildId: { '$oid': selectedBuildId } }
        }))
      }
    ),

    switchMap((result) => {

      return this.apiService.getFindingStats(result.selectedApp?.application?.applicationId, result.selectedBuildId)
    }),






  )


  refreshFindings() {
    console.log('refreshFindings');
    this.markMode = false;

    // this.triggerRefresh.next(true);
    let loadMoreFindings = this.loadMoreFindings$.value;
    // console.log('loadMoreFindings', loadMoreFindings)
    this.loadMoreFindings$.next(loadMoreFindings);



  }

  triggerRefresh = new BehaviorSubject(undefined);
  triggerReset = new Subject<undefined>();

  loadingFindings$ = false;



  // loadingFindings$ = new BehaviorSubject(false);
  // loadingFindings = this.loadingFindings$.asObservable()







  // findings = this.apiService.getFindings('', '')

  constructor(

    private apiService: ApiService,
    private drawerMngr: DrawerService,
    private nbSidebarService: NbSidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private engagementService: EngagementService,


    private windowService: NewSidebarService,
    private overlayService: NbOverlayService,


  ) { }
  ngOnInit(): void {
    console.log('afterviewinit')

  }



  goTo(slug: string) {
    this.router.navigate(['../', slug], {
      queryParamsHandling: 'merge',

      relativeTo: this.activatedRoute
    })
    // this.router.navigate([  {  outlets: { 'content': ['../assessment'] } }  ]  , {relativeTo: this.activatedRoute} ) 
  }




  onChange(event) {

    console.log('event', event)
  };

  loading_staate_for_individual: Map<string, number> = new Map();

  markForVerification(data) {



    let _id = data?._id?.$oid;


    this.loading_staate_for_individual.set(_id, 1);

    let engagement_id = data?.engagement_id;
    this.apiService.markIssueToBeverified(engagement_id, _id).subscribe(_ => {

      const timestamp = Date.now();

      this.loading_staate_for_individual.set(_id, timestamp);
      console.log('markForVerification', engagement_id, _id, data);

      this.refreshFindings();


    });
  }

  switch_finding_filter(filter) {


    // this.currentPage = 0;
    this.loadMoreFindings$.next(1);
    this.filter_finding_tab$.next(filter);
  }


  unmarkForVerification(data) {






    let _id = data?._id?.$oid;

    this.loading_staate_for_individual.set(_id, 1);

    let engagement_id = data?.engagement_id;
    this.apiService.unmarkIssueToBeverified(engagement_id, _id).subscribe(_ => {
      const timestamp = Date.now();

      this.loading_staate_for_individual.set(_id, timestamp);

      console.log('unmarkForVerification', engagement_id, _id);
      this.refreshFindings();

    });
  }

  current_route = EngagementState.OPEN;



  refreshIndividualFindingSignal = new Map<string, any>();

  findingMappedFunc$ = (_, timestamp, engagement_id) => {


    if (this.loading_staate_for_individual.has(_?._id?.$oid)) {
      if (this.loading_staate_for_individual.get(_?._id?.$oid) <= timestamp) {

        this.loading_staate_for_individual.delete(_?._id?.$oid)

      }


    }




    _.engagement_id = engagement_id;

    _.engagement_ids_under_review = _.engagement_ids_under_review.map(_ => _.$oid);





    switch (_.severity) {
      case 'Info':
        _.color = ColorSeverity.INFO;

        break;
      case 'Low':
        _.color = ColorSeverity.LOW;

        break;

      case 'Medium':
        _.color = ColorSeverity.MEDIUM;

        break;
      case 'High':
        _.color = ColorSeverity.HIGH;

        break;
      case 'Critical':
        _.color = ColorSeverity.CRITICAL;

        break;
    }


    return _;

  }
  activeEngagement = this.engagementService.activeEngagement

  .pipe(
    filter(_ => !!_),
    
    tap(_ => {

      // return;
      this.current_route = _.engagement.state;
      console.log('current_route', this.current_route);
      // return;


      if (this.current_route == EngagementState.DRAFT) {
        this.switch_finding_filter('all');

      } else if (this.current_route == EngagementState.OPEN) {
        this.switch_finding_filter('under_review_current');

      }
      else if (this.current_route == EngagementState.IN_PROGRESS) {
        this.switch_finding_filter('new');

      }
      else if (this.current_route == EngagementState.PENDING_REVIEW) {

      } else if (this.current_route == EngagementState.UNDER_REVIEW) {

      } else if (this.current_route == EngagementState.ACCEPTED) {

      } else if (this.current_route == EngagementState.CLOSED) {

      } else if (this.current_route == EngagementState.REJECTED) {

      }




    })
    ,
    map(_ => _.id),

  
    
  );


  loadingFindings = false;

  findings$ = this.filter_finding_tab.pipe(

tap(_=>{

  this.loadingFindings = true;
  console.log('loading_cfindings', 'started');
}),

    switchMap(filter_state => {

      console.log('boomboom', filter_state);
      return this.engagementService.activeEngagement
        .pipe(
          filter(_ => !!_)
          ,

          map(_ => _.id),

          map((engagement_id) => {


            return this.loadMoreFindings$.pipe(
              map(page_number => {

                const timestamp = Date.now();

                return this.apiService.getOpenFindingsByAssessment(filter_state, engagement_id, page_number).pipe(

                  map(_ => {


                    this.totalFindings = _?.count || 0;


                    this.under_review_count = _?.under_review_count || 0;
                    this.under_review_current_count = _?.under_review_current_count || 0;
                    this.under_review_others_count = _?.under_review_others_count || 0;


                    this.all_count = _?.all_count || 0;
                    this.open_count = _?.open_count || 0;


                    this.findingsListLimit = _?.defaultPageSize || 0;



                    this.currentPage = _?.page_number;


                    let defaultPageSize = _?.defaultPageSize;


                    this.totalPages = this.math.ceil(this.totalFindings / defaultPageSize)
                    console.log('totalFindings', this.totalFindings, this.totalPages)


                    _.data = _.data.map((_) => { return this.findingMappedFunc$(_, timestamp, engagement_id) })





                    this.refreshIndividualFindingSignal.clear();
                    _.data = _.data.map(_ => {


                      let refSignal = new BehaviorSubject(undefined).pipe(


                        switchMap((value: any) => {
                          console.log('bububub', value);
                          if (value) {
                            // If a value is emitted, switch to fetching data from the API
                            return this.apiService.getOpenFindingsByAssessmentByFindingId(engagement_id, _?._id?.$oid).pipe(
                              map(_ => _?.data),
                              map(_ => {
                                return this.findingMappedFunc$(_, timestamp, engagement_id)
                              })
                            );
                          } else {
                            // If no value is emitted, return an empty observable
                            return of(_);
                          }
                        }),



                      );

                      let _id = _._id.$oid;



                      this.refreshIndividualFindingSignal.set(_id, refSignal);
                      // return of(_);
                      return refSignal

                    })




                    // _.data = _.data.map(_ => of(_))

                    return _.data
                  }),


                )


              }),
              switchMap(_ => _),


            )
          })

          ,

          switchMap(_ => _)





        )

    })

    ,
    tap(_=>{
      this.loadingFindings = false;

      console.log('loading_cfindings', 'end');
    }),
    // shareReplay(),

  )
  // To avoid errors..ngonint moved to ngafterviewinit
 
  

  ngOnDestroy(): void {
    // TODO
    this.nbSidebarService.expand(
      'buildList'
    )
  }

  loadMoreStatic() {

  }

  onClickFinding(finding) {
    // return;
    this.openDrawer(finding)
  }

  create_finding() {
    this.openDrawer({

    }, this.createFindingTmpl)
  }

  // onClickFinding



  on_click_list_item(finding_id, finding) {

    if (finding?.marked_for_review_under_other_engagement == true) {
      return
    }


    if (this.markMode) {

      this.markFinding(!this.markedFindings.has(finding_id), 0, finding_id)
      return;
    }

    this.view_finding(finding_id)

  }

  test(testTemplate){
  //  let xo =  this.overlayService.create();

    // let sd : NbPopoverComponent;
    // sd.overlayContainer
  }

  view_finding(finding_id) {


    console.log('view_finding', finding_id)
    this.openDrawer({
      finding_id

    }, this.viewFindingTmpl).onClose.subscribe(_ => {

      if (
        this.refreshIndividualFindingSignal.has(finding_id)
      ) {
        this.refreshIndividualFindingSignal.get(finding_id).next(1)

      }
    })
  }

  openDrawer(context, template = this.editTmpl, direction = 'left', size?, closeOnOutsideClick = true, isRoot = true, parentContainer?: any): NbWindowRef {
    return this.drawerMngr.create({
      direction: DrawerDirection.Left,
      template,
      size,
      context: context,
      closeOnOutsideClick,
      parentContainer,
      isRoot
    });



  }


  currentBuildId = undefined;
  previousBuildId = undefined;

  onMouseOver(build) {
    this.currentBuildId = build?._id?.$oid;
    this.previousBuildId = build?.parser_meta_data?.previous_build_id?.$oid;


  }

  onMouseOut() {
    this.currentBuildId = undefined;
    this.previousBuildId = undefined;

  }



  nextPage() {

    if (this.loadingFindings$ == true)
      return

    // if (this.finishedLoadingFindings$ == true)
    // return

    this.loadingFindings$ = true;


    this.loadMoreFindings$.next(this.lastFindingIdOffset);
  }

  goto(page) {
    this.loadingFindings$ = true;
    // this.lastFindingIdOffset = page ;
    this.loadMoreFindings$.next(page);
  }

  previousPage() {
    if (this.loadingFindings$ == true)
      return

    if (this.lastFindingIdOffset <= this.findingsListLimit)
      return

    this.loadingFindings$ = true;

    this.lastFindingIdOffset = this.lastFindingIdOffset - this.lastFindingPageLength - this.findingsListLimit;
    this.loadMoreFindings$.next(this.lastFindingIdOffset);

  }


  markForRevalidation() {
    console.log('markForRevalidation');


    let marked = Array.from(this.markedFindings);
    marked.forEach((_id: string) => {

      this.loading_staate_for_individual.set(_id, 1);
    })


    this.activeEngagement.pipe(take(1)).pipe(switchMap(engagement_id => {







      return this.apiService.markMultipleIssueToBeverified(engagement_id, marked)
    }))

      .subscribe(_ => {

        const timestamp = Date.now();
        marked.forEach((_id: string) => {

          this.loading_staate_for_individual.set(_id, timestamp);
        })




        this.refreshFindings();
      })

  }

  unmarkForRevalidation() {
    console.log('unmarkForRevalidation');

    let marked = Array.from(this.markedFindings);
    marked.forEach((_id: string) => {

      this.loading_staate_for_individual.set(_id, 1);
    })

    this.activeEngagement.pipe(take(1)).pipe(switchMap(engagement_id => {

      let marked = Array.from(this.markedFindings);



      return this.apiService.unmarkMultipleIssueToBeverified(engagement_id, marked)
    }))

      .subscribe(_ => {
        const timestamp = Date.now();
        marked.forEach((_id: string) => {

          this.loading_staate_for_individual.set(_id, timestamp);
        })

        this.refreshFindings();
      })

  }

  moveToPublish(data) {


    let _id = data?._id?.$oid;


    this.loading_staate_for_individual.set(_id, 1);

    let engagement_id = data?.engagement_id;
    this.apiService.moveFindingToPublish(engagement_id, _id).subscribe(_ => {

      const timestamp = Date.now();

      this.loading_staate_for_individual.set(_id, timestamp);
      console.log('moveFindingToPublish', engagement_id, _id, data);

      this.refreshFindings();


    });

  }

  moveToDraft(data) {
    let _id = data?._id?.$oid;


    this.loading_staate_for_individual.set(_id, 1);

    let engagement_id = data?.engagement_id;
    this.apiService.moveFindingToDraft(engagement_id, _id).subscribe(_ => {

      const timestamp = Date.now();

      this.loading_staate_for_individual.set(_id, timestamp);
      console.log('moveFindingToDraft', engagement_id, _id, data);

      this.refreshFindings();


    });

  }


}
