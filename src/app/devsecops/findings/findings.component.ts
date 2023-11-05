import { Component, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

import { BehaviorSubject, combineLatest, merge, of, Subject } from 'rxjs';
import { map, filter, share, startWith, switchMap, tap, scan, shareReplay } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { DrawerService } from '../drawer/drawer.service';
import { FindingStatsComponent } from '../finding-stats/finding-stats.component';

@Component({
  selector: 'app-findings',
  templateUrl: './findings.component.html',
  styleUrls: ['./findings.component.scss']
})
export class FindingsComponent implements OnInit {


  math = Math
  findingsListLimit = 20;
  totalFindings = 0;




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
  loadMoreFindings$ = new BehaviorSubject<number>(0)

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

  findings = this.triggerRefresh.asObservable().pipe(

    tap(_ => {
      this.loadingFindings$ = true
    }),

    switchMap(
      (_) => {
        return this.selectedBuildId.valueChanges.pipe(

          tap(_ => {
            this.triggerReset.next(undefined);


            this.loadingFindings$ = true;
            this.lastFindingIdOffset = 0;
            this.lastFindingPageLength = 0;
            this.loadMoreFindings$.next(this.lastFindingIdOffset)
            this.finishedLoadingFindings$ = false;
          }),

          startWith(this.selectedBuildId.value),

        );
      }

    ),

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
          return { selectedApp: selectedApp, selectedBuildId: { '$oid': selectedBuildId }, severityFilter: {}, findingStats: {}, totalFindings: 0 }
        }))
      }
    ),

    switchMap(
      (result) => {
        return this.findingStatsView.findingStats.pipe(
          map(_ => {
            result.findingStats = _;
            return result;
          })
        );

      }
    ),

    switchMap((result) => {
      // console.log('_appoopo', result)

      return this.findingStatsView.severityFilter.pipe(
        tap(_ => {
          this.triggerReset.next(undefined);
          this.loadingFindings$ = true;
          this.totalFindings = 0;
        }),

        map(
          severityFilter => {

            let _severityFilter = []
            // let totalFindings = 0;
            // result.totalFindings = 0;


            Object.keys(severityFilter).forEach(key => {

              if (severityFilter[key]) {
                _severityFilter.push(key);
                if (severityFilter[key]) {

                  let _key = key.toLowerCase();

                  if (_key in result.findingStats) {
                    this.totalFindings += result.findingStats[_key];

                    console.log('tappper', result.findingStats[_key], key.toLowerCase(), severityFilter[key], result.findingStats, result.totalFindings)
                    result.totalFindings = result.findingStats[_key];

                  }

                }
              }
            })

            console.log('tappper', result.totalFindings);
            result.severityFilter = _severityFilter;

            return result
          })
      )
    }),

    switchMap(result => {
      console.log(
        'sortFindingFilter', 'loadMoreFindings'
      )
      return this.loadMoreFindings$.pipe(
        map(
          _ => {
            return result;
          }
        )
      )
    }),


    switchMap((result) => {
      console.log('sortFindingFilter', this.sortFindingFilter)


      return this.apiService.getFindings(result.selectedApp?.application?.applicationId, result.selectedBuildId, result?.severityFilter, this.sortFindingFilter, this.lastFindingIdOffset, this.findingsListLimit).pipe(

        tap(
          (findings: {
            _id: {
              $oid: string
            }
          }[]) => {

            // if (findings.length > 0) {
            // this.lastFindingIdOffset = findings[findings.length - 1]?._id?.$oid;
            this.lastFindingPageLength = findings.length;
            this.lastFindingIdOffset += this.lastFindingPageLength;
            // }

            if (findings.length < this.findingsListLimit) {
              this.finishedLoadingFindings$ = true;
            }

          }
        )

      )
    }),



    startWith(undefined),

    // map(data => data?.data),

  )



  _findings = merge(
    this.findings,
    this.triggerReset,
  ).pipe(


    scan((acc: [] | undefined, val: [] | undefined) => {

      console.log(
        '_findings_findings', acc, val
      )
      if (val == undefined) {
        this.lastFindingPageLength = 0;
        this.lastFindingIdOffset = 0;
        this.finishedLoadingFindings$ = false;
        return []
      }


      val?.map((_: any, index) => {
        _['index'] = this.lastFindingIdOffset - this.lastFindingPageLength + index + 1;
        return _;
      })

      if (acc == undefined)
        return val;
      else {
        // acc.push(...val);
        // TODO: Repair
        return val;
      }



    }),

    tap(_ => {
      this.loadingFindings$ = false;
    }),
  )
  // _findings = combineLatest([this.findings, this.triggerRefresh.asObservable()]);


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

    this.lastFindingIdOffset = page * this.findingsListLimit;
    this.loadMoreFindings$.next(this.lastFindingIdOffset);
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
