import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject, catchError, combineLatest, delay, distinctUntilChanged, map, mergeMap, of, shareReplay, tap, throwError, zip } from 'rxjs';
import { ApiService } from './api.service';
import { QueryParamsHandling, Router } from '@angular/router';

export const STATE_CONSTANT_NULL = 0;
export const STATE_CONSTANT_LOADING = 1;
export const STATE_CONSTANT_FAILED = 2;



const mergeById = ([t, s]) => t.map(p => Object.assign({}, p, s.find(q => p.id === q.id)));

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {



  stateCatcher(data) {

    if (typeof data == 'number') {
      return throwError(() => { new Error('Not application, but a state change') })
    } else {

      return data; // of(data).pipe(mergeMap(_ => _) );
    }
  }

  private activeBusinessId$: Subject<{ id: string, app: any } | number> = new BehaviorSubject(STATE_CONSTANT_NULL);
  private activeProjectId$: Subject<{ id: string, app: any } | number> = new BehaviorSubject(STATE_CONSTANT_NULL);
  private activeApplicationId$: Subject<{ id: string, app: any } | number> = new BehaviorSubject(STATE_CONSTANT_NULL);



  resetAllState() {
    this.activeBusinessId$.next(STATE_CONSTANT_NULL);
    this.activeProjectId$.next(STATE_CONSTANT_NULL);
    this.activeApplicationId$.next(STATE_CONSTANT_NULL);
  }



  public activeBusinessId = this.activeBusinessId$.asObservable().pipe(

    distinctUntilChanged(),
    shareReplay()
    ,


  );
  public activeProjectId = this.activeProjectId$.asObservable().pipe(
    distinctUntilChanged(),

    shareReplay()
    ,

  );
  public activeApplicationId = this.activeApplicationId$.asObservable().pipe(
    distinctUntilChanged(),

    shareReplay()
    ,


  );




  activeStateIds$ = combineLatest(
    [
      this.activeBusinessId$.pipe(map((_: any) => _?.id)),
      this.activeProjectId$.pipe(map((_: any) => _?.id)),
      this.activeApplicationId$.pipe(map((_: any) => _?.id)),
    ]
  ).pipe(
    map(([businessId, projectId, applicationId]) => ({ businessId, projectId, applicationId }))
  )

  constructor() {

  }



  setProjectId(projectId: string, apiService: ApiService, router: Router, queryParamsHandling: QueryParamsHandling = null) {


    console.log('setProjectId___', projectId)
    apiService.getProjectById(projectId)
      .pipe(tap({
        next: (app) => {
          console.log('setProjectId', 'fetched_app', projectId);
          console.log('setProjectId', 'fetched_app', app);
          projectId = app?._id?.$oid;
          let businessId = app?.businessId?.$oid;

          this.activeProjectId$.next({ id: projectId, app: app });
          // this.setBusinessId(businessId, apiService , router)

          console.log('setAppId', app);;


          router.navigate([],
            {
              queryParams: {
                'projectid': projectId,

              }
              ,
              queryParamsHandling: queryParamsHandling
              , replaceUrl: true

            }
          )

        },
        error: () => {

          this.activeProjectId$.next(STATE_CONSTANT_FAILED);
        }
      }

      )

        ,
        catchError((err, exc) => {

          console.log('fetched_app', 'error', err)
          this.activeProjectId$.next(STATE_CONSTANT_FAILED);
          return EMPTY;
        }),

      )

      .subscribe()

  }

  setAppId(appId: string, apiService: ApiService, router: Router, queryParamsHandling: QueryParamsHandling = null) {


    apiService.getApplicationById(appId)
      .pipe(tap({
        next: (app) => {
          console.log('fetched_app', appId);
          console.log('fetched_app', app);
          appId = app?._id?.$oid;

          if (!!!appId) {
            this.activeApplicationId$.next(STATE_CONSTANT_FAILED)
            return;
          }

          this.activeApplicationId$.next({ app: app, id: appId })
          let projectId = app?.project_id?.$oid;
          // console.log('__setProjectId__', projectId)
          // console.log('setAppId', appId, logger);;
          this.setProjectId(projectId, apiService, router, 'merge');


          router.navigate([],
            {
              queryParams: {
                'appid': appId
              }
              ,
              queryParamsHandling: queryParamsHandling
              , replaceUrl: true


            }
          )

        },
        error: () => {

          this.activeApplicationId$.next(STATE_CONSTANT_FAILED);
        }
      }

      )

        ,
        catchError((err, exc) => {

          console.log('fetched_app', 'error', err)
          this.activeApplicationId$.next(STATE_CONSTANT_FAILED);
          return EMPTY;
        }),

      )

      .subscribe()
  };


  setBusinessId(businessId: string, apiService: ApiService, router: Router, queryParamsHandling: QueryParamsHandling = null) {



    apiService.getProjectById(businessId)
      .pipe(tap({
        next: (app) => {


          businessId = app?._id?.$oid;
          console.log('businessid', businessId)

          this.activeBusinessId$.next({ id: businessId, app: app })



          router.navigate([],
            {
              queryParams: {
                'businessid': businessId,

              }
              ,
              queryParamsHandling: queryParamsHandling
              , replaceUrl: true

            }
          )

        },
        error: () => {

          this.activeBusinessId$.next(STATE_CONSTANT_FAILED);
        }
      }

      )

        ,
        catchError((err, exc) => {

          console.log('fetched_app', 'error', err)
          this.activeBusinessId$.next(STATE_CONSTANT_FAILED);
          return EMPTY;
        }),

      )

      .subscribe()


  };




}
