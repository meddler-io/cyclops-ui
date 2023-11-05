import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { BehaviorSubject, tap, filter, map, Subscription, combineLatest, shareReplay, Observable, switchMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss']
})
export class LogStreamComponent implements OnInit {


  MINIO_URL = environment.minio_url;



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

  constructor(
    public apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService
  ) { }

  subscription = Subscription.EMPTY;

  ngOnInit(): void {

    this.subscription = combineLatest(
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
  }

}
