import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { BehaviorSubject, combineLatest, EMPTY, filter, interval, map, mergeMap, Observable, of, shareReplay, Subject, Subscription, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-build-detail-view',
  templateUrl: './build-detail-view.component.html',
  styleUrls: ['./build-detail-view.component.scss']
})
export class BuildDetailViewComponent implements OnInit, OnDestroy {

  @Input('selected_build')
  set selected_build$(data: { buildId: string, applicationId: string }) {
    console.log('___selectedBuild', data)
    // this.selectedBuild.next(data);
  };




  selectedBuild$: BehaviorSubject<undefined | { buildId: string, applicationId: string }> = new BehaviorSubject(undefined);

  selectedBuild = this.selectedBuild$.pipe(
    // filter(_ => !!_),
    tap(_ => {
      console.log(
        '__selectedBuild', 'ngOnInit', 'Obs'
      )
    })
    // shareReplay()
  );


  buildDetails: Observable<any> = this.selectedBuild.pipe(

    switchMap(build => {

      console.log(
        'buildDetails', build
      );

      if (!!!build) {
        return of(build);
      }

      return this.apiService.getBuildById(build.buildId).pipe(

        tap(_ => {
          console.log(
            'buildDetails', _
          )
        }),

        map(_ => {

          return this.apiService.buildTransformerPipe(_)
        })
        ,


        map(_ => {

          return this.apiService.buildDetailedPipe(_)
        })
        ,


        shareReplay()
      );
    })
  );


  findingStats: Observable<any> = this.selectedBuild.pipe(

    switchMap(build => {
      return this.findingStats = this.apiService.getFindingStats({ '$oid': build.applicationId }, { '$oid': build.buildId });

    })
  );;



  refreshBuildData = Subscription.EMPTY;
  newBuildsAvailable = false;
  REFRESH_INTERVAL_PERIOD = 1000;
  refreshBuildDataFn() {


    // return of(EMPTY)

    return interval(this.REFRESH_INTERVAL_PERIOD).pipe(
      // tap(_ => console.debug('interval hits every second!')),



      tap(_ => {
        // this.reloadComponent();
      })

    )
  }



  constructor(
    public apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService
  ) { }

  ngOnDestroy(): void {
    this.subscription_1.unsubscribe();
    this.subscription_2.unsubscribe();
    this.refreshBuildData.unsubscribe();

    // this.apiService.selectedBuildId$.next(undefined);
  }

  downloadFile(file) {
    this.apiService.downloadFile(file)
      .pipe(

       
        tap(url => { window.open(environment.minio_url + url?.url, '_blank') }),

      )
      .subscribe()
  }

  goToFindings(buildId) {
    this.router.navigate(
      [
        'issues'
        // '../',
        // '../../',
        // 'findings'

      ],
      {
        relativeTo: this.activatedRoute
      }
    )
  }

  forceStopBuild(buildId) {

  }


  subscription_1 = Subscription.EMPTY;
  subscription_2 = Subscription.EMPTY;

  ngOnInit(): void {

    console.log('__selectedBuild', 'ngOnInit')

    this.subscription_1.unsubscribe();
    this.subscription_2.unsubscribe();
    // this.refreshBuildData = this.refreshBuildDataFn().subscribe()


    this.subscription_1 = combineLatest(
      [
        this.apiService.selectedBuildId.pipe(
          tap(_ => {
            this.selectedBuild$.next(undefined);
          }),
          filter(_ => !!_)

        ),
        this.apiService.selectedApp.pipe(
          tap(_ => {
            this.selectedBuild$.next(undefined);
          }),
          map(app => {
            return app?.identifier
          }),
          filter(_ => !!_)
        ),
      ]
    ).subscribe(
      _ => {

        console.log(
          'combineLatest', _
        );
        // this.resetComponent();

        console.log('!__selectedBuild', { applicationId: _[1], buildId: _[0] })

        this.selectedBuild$.next({ applicationId: _[1], buildId: _[0] });

        // this.reloadComponent()



      }
    );


    this.subscription_2 = this.apiService.selectedBuildId.pipe(

      tap((params: any) => {

        this.resetComponent();
      }),

    ).subscribe()


    combineLatest(
      [
        this.activatedRoute.parent.params,
        this.activatedRoute.params
      ]

    ).pipe(

      tap((params: any) => {
        // this.apiService.selectedBuildId$.next(undefined);

        this.resetComponent();
      }),

      map(
        (params) => {

          let _params = {}
          params.forEach(params => {
            _params = Object.assign(_params, params)
          })
          console.log(
            'paramsparms', _params
          );


          return _params;


        }
      ),
      filter(_ => {

        return 'build_id' in _ && 'buildId' in _;
        // return true;
      })
      ,

      tap((params: any) => {

        console.log('_selectedBuild', { applicationId: params?.build_id, buildId: params?.buildId })

        this.selectedBuild$.next({ applicationId: params?.build_id, buildId: params?.buildId });

        // this.apiService.selectedBuildId$.next(this.buildId);
      })


    )






  }

  resetComponent() {

    // this.selectedBuild.next(undefined)
    // this.reloadComponent()

  }

  reloadComponent() {








  }


  openDialog(dialog: TemplateRef<any>, data) {
    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: data
    });
  }

  stopBuildScan(buildId, delete_all, templateRef,) {

    let op = EMPTY;
    if (delete_all == true) {

      this.selectedBuild.pipe(
        switchMap(build => {
          return this.apiService.stopAllPrevious(build.applicationId, buildId)
        })

      ).subscribe(() => { templateRef.close(true) })



    } else {

      this.selectedBuild.pipe(
        switchMap(build => {
          return this.apiService.stopBuildScan(build.applicationId, buildId)
        })

      ).subscribe(() => { templateRef.close(true) })


    }

  }
}
