import { Component, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

import { BehaviorSubject, combineLatest, EMPTY, merge, Observable, of, Subject } from 'rxjs';
import { map, filter, share, startWith, switchMap, tap, scan, shareReplay } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { DrawerService } from '../drawer/drawer.service';
import { FindingStatsComponent } from '../finding-stats/finding-stats.component';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent{


  math = Math
  findingsListLimit = 20;
  totalFindings = 0;

  currentPage;
  totalPages;




  @ViewChild('findingStatsView', { static: true }) findingStatsView: FindingStatsComponent;
  @ViewChild('editTmpl', { static: false }) editTmpl: TemplateRef<any>;



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
    this.triggerRefresh.next(true);


  }

  triggerRefresh = new BehaviorSubject(undefined);
  triggerReset = new Subject<undefined>();

  loadingFindings$ = false;



  // loadingFindings$ = new BehaviorSubject(false);
  // loadingFindings = this.loadingFindings$.asObservable()

  assessments$;



 

  // findings = this.apiService.getFindings('', '')

  constructor(
    private apiService: ApiService,
    private drawerMngr: DrawerService,
    private nbSidebarService: NbSidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    // TODO
    // this.nbSidebarService.collapse(
    //   'buildList'
    // );

    this.loadMoreFindings$.subscribe(page_number => {

      this.assessments$ = this.apiService.getAssessmentsFindings(page_number).pipe(

        map(_ => {

          this.totalFindings = _?.count;
          this.currentPage = _?.page_number ;
          let defaultPageSize = _?.defaultPageSize;


          this.totalPages = this.math.ceil( this.totalFindings / defaultPageSize  )

          return _.data
        }),

      )
    })



    this.activatedRoute.parent.paramMap.pipe(

      tap(_ => {

        console.log(
          'logger2',
          _
        )
      }),

      map(_ => {
        return _?.get('buildId')
      }),
      filter(_ => !!_),
      tap(
        _ => {
          console.log('___', _);
          this.selectedBuildId.setValue(_, {
            emitModelToViewChange: true, emitEvent: false,
            emitViewToModelChange: true
          })
        }
      )
    ).subscribe()

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
    this.openDrawer(finding)
  }
  openDrawer(context, direction = 'left', size?, closeOnOutsideClick = true, template = this.editTmpl, isRoot = true, parentContainer?: any) {
    this.drawerMngr.create({
      direction: DrawerDirection.Left,
      template,
      size,
      context: { finding_id: context?._id },
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

  bottomThresholdTrigger(event) {

    return
    console.log('bottomThresholdTrigger', this.loadingFindings$, this.finishedLoadingFindings$);



    if (this.loadingFindings$ == true)
      return
    if (this.finishedLoadingFindings$ == true)
      return

    console.log('bottomThresholdTrigger', this.lastFindingIdOffset);
    this.loadMoreFindings$.next(this.lastFindingIdOffset);
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

