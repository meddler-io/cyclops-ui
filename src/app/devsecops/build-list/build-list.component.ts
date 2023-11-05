import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, EMPTY, forkJoin, interval, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { exhaustMap, filter, first, map, mergeMap, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DrawerService } from '../drawer/drawer.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { TransitionState } from '../build-item/build-item.component';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {


  buildListLimit = 20

  buildInvalidateIds = new Map<string, number>();
  topBuildId = undefined;
  bottomBuildId = undefined;
  // buildInvalidateIds: Observable<any> = new BehaviorSubject<string[]>([]);



  activeBuildId = this.apiService.selectedBuildId.pipe(
    shareReplay(),
    tap(_=>{
      console.log(
        'resetBuilds',
        _
      )
    })

  );



  selectedApp = this.apiService.selectedApp


  buildTransformerPipe = (build) => {


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
  ngOnDestroy(): void {

    this.nbSidebarService.expand();

    this.refreshBuildData.unsubscribe();
  }
  loading = true;

  getBuildData(app) {
    return this.apiService.getDevsecopsBuildData({
      businessId: app?.businessId,
      projectId: app?.projectId,
      platformId: app?.platformId,
      applicationId: app?.application?.applicationId,


    }, {
      offset: this.bottomBuildId,
      limit: this.buildListLimit,
      direction: 'below'
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
            'activeBuildId'
          )

          let build = builds[0];
          this.activeBuildId.pipe(
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

              this.router.navigate([`${build?._id?.$oid}`], { relativeTo: this.activatedRoute })
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
    this.apiService.downloadReportZip(
      {
        businessId: app?.businessId?.$oid,
        projectId: app?.projectId?.$oid,
        platformId: app?.platformId?.$oid,
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
        // console.debug("request has started!")

        let buildIds = Array.from(
          this.buildInvalidateIds.keys()
        )

        if (
          buildIds.length == 0 && this.buildTopOffsetId$) {

          return EMPTY;
        }



        return this.apiService.getBuildByIds(
          buildIds,
          this.buildTopOffsetId$
        )
          .pipe( // simulation that takes 3 seconds to complete
            tap(_ => console.debug(_)),
          )
      })
      ,
      tap(_ => console.debug(_))
      ,



      tap((buildData: { newBuildsFound?: boolean, builds: [{ _id: any }] }) => {


        buildData.builds.forEach(build => {
          let buildId = build?._id?.$oid;
          let index = this.buildInvalidateIds.get(buildId)
          // build = this.buildTransformerPipe(build);
       

        })

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
          mBuild['index'] = this.builds$[mIndex].index;
          this.builds$[mIndex] = mBuild;


        })
      }
      )
  ,
    )
  }

  resetBuilds() {
    this.builds$ = []
  }

  loadBuilds() {

    this.selectedApp.pipe(
      tap((_) => {

      this.resetBuilds()
        
        this.loading = true;
      }),
      filter(_ => !!_),
      switchMap(selectedApp => {

        return this.getBuildData(selectedApp)
      }),

      tap((_) => {
        if (_.length > 0)
          this.buildTopOffsetId$ = _[0]?._id?.$oid
        else
          this.buildTopOffsetId$ = undefined
        // this.builds$ = _;
        this.builds$.push(..._)
        this.loading = false;

      }),
    ).subscribe()

  }

  ngOnInit(): void {


    this.refreshBuildData = this.refreshBuildDataFn().subscribe()



    this.nbSidebarService.collapse();


    let routEndpoints = this.activatedRoute.children;


    this.loadBuilds()


  }



  onClickBuild(build) {

    this.router.navigate([`${build?._id?.$oid}`], { relativeTo: this.activatedRoute });
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


  loadNewBuilds() {
    this.loadBuilds()

  }


  bottomThresholdTrigger(event) {
    if (
      this.loading
      ||
      this.allBuildsLoaded
    )
      return
    console.log('bottomThresholdTrigger', this.allBuildsLoaded, event)
    this.loadBuilds()

  }

}
