import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbSidebarService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { BehaviorSubject, map, filter, switchMap, tap, share, startWith, Subject } from 'rxjs';
import { NewSidebarService } from 'src/app/new-sidebar.service';
import { ApiService } from '../api.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { DrawerService } from '../drawer/drawer.service';
import { EngagementService } from '../engagement.service';
import { FindingStatsComponent } from '../finding-stats/finding-stats.component';

@Component({
  selector: 'app-engagement-findings',
  templateUrl: './engagement-findings.component.html',
  styleUrls: ['./engagement-findings.component.scss']
})
export class EngagementFindingsComponent implements OnInit, AfterViewInit {

  math = Math
  findingsListLimit = 20;
  totalFindings = 0;



  under_review_count = 0;
  open_count = 0;
  all_count = 0;

  currentPage;
  totalPages;


  filter_finding_tab = new BehaviorSubject('all'); // 'all' , 'open' , under_review'


  @ViewChild('findingStatsView', { static: true }) findingStatsView: FindingStatsComponent;
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

  findings$;





  // findings = this.apiService.getFindings('', '')

  constructor(
    private apiService: ApiService,
    private drawerMngr: DrawerService,
    private nbSidebarService: NbSidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private engagementService: EngagementService,


    private windowService: NewSidebarService


  ) { }
  ngAfterViewInit(): void {
    // this.openDrawer({},  this.createFindingTmpl)




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
  }
  markForVerification(data) {


    let _id = data?._id?.$oid;
    let engagement_id = data?.engagement_id;
    console.log('markForVerification', engagement_id, _id);
    this.apiService.markIssueToBeverified(engagement_id, _id).subscribe(_ => {
      this.refreshFindings()

    });
  }

  switch_finding_filter(filter) {

    // this.currentPage = 0;
    this.loadMoreFindings$.next(1);
    this.filter_finding_tab.next(filter);
  }


  unmarkForVerification(data) {

    this.refreshFindings()


    let _id = data?._id?.$oid;
    let engagement_id = data?.engagement_id;
    console.log('markForVerification', engagement_id, _id);
    this.apiService.unmarkIssueToBeverified(engagement_id, _id).subscribe(_ => {
      this.refreshFindings()

    });
  }

  activeEngagement = this.engagementService.activeEngagement;

  ngOnInit(): void {

    this.findings$ = this.filter_finding_tab.asObservable().pipe(

      switchMap(filter_state => {

        return this.engagementService.activeEngagement

          .pipe(
            filter(_ => !!_)

            ,
            map((engagement) => {


              return this.loadMoreFindings$.pipe(
                map(page_number => {

                  return this.apiService.getOpenFindingsByAssessment(filter_state, engagement.id, page_number).pipe(

                    map(_ => {


                      this.totalFindings = _?.count || 0;


                      this.under_review_count = _?.under_review_count || 0;
                      this.all_count = _?.all_count || 0;
                      this.open_count = _?.open_count || 0;


                      this.findingsListLimit = _?.defaultPageSize || 0;



                      this.currentPage = _?.page_number;


                      let defaultPageSize = _?.defaultPageSize;


                      this.totalPages = this.math.ceil(this.totalFindings / defaultPageSize)
                      console.log('totalFindings', this.totalFindings, this.totalPages)

                      _.data = _.data.map(_ => {
                        _.engagement_id = engagement.id;
                        return _;
                      })

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

    )



    // TODO
    // this.nbSidebarService.collapse(
    //   'buildList'
    // );







  }

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
    this.openDrawer({}, this.createFindingTmpl)
  }

  // onClickFinding


  view_finding(finding_id) {
    console.log('view_finding', finding_id)
    this.openDrawer({
      finding_id

    }, this.viewFindingTmpl)
  }

  openDrawer(context, template = this.editTmpl, direction = 'left', size?, closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {
    this.drawerMngr.create({
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



}
