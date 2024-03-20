import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { BehaviorSubject, EMPTY, Observable, of, pipe, Subject, throwError } from 'rxjs';
import { catchError, delay, distinct, distinctUntilChanged, distinctUntilKeyChanged, filter, first, map, mergeMap, share, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TransitionState } from './build-item/build-item.component';

export const PUBLIC_SSH_KEY = `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1Bkdt4M4kJ8K01EUxyY3c/pBCPj8ForBIQs7Up9VaWaKpJ6HqY8Z14k5KnN8T3tu2G0EOP2TQ3PIHDhQBJaU6xpEbqmYk4VCb30uRBUjfOz4xJSPqVl8DcpU7USupSSFqJMWXj4YLjVmMQTq1vA/MFAuVlpTuDOy86AnqIbq6mw4vrUpZoZegozg/jA4NzaXkQTEOYI92fWC6w1YznynFQNQtI+aXp33LhzgUGTYFLTDD7/ueINjlu5PAc2Rle8+tQ7cUxBC9xKUxzTC2+NI9PIlh6LJCiogESjLUXouNw5f7lmkIhmr9NdE3I/i1D2E6Oefgxnk9iAjbYIkl6GNv prakhar.agnihotri@prakharagnihotri.local`

function generateColorCode(id: string): string {
  // Simple hash function
  let hash: number = 0;
  for (let i: number = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Ensure the hash is a positive number
  const positiveHash: number = Math.abs(hash);

  // Convert hash to a 6-digit hexadecimal color code
  const color: string = (positiveHash % 0x1000000).toString(16).padStart(6, '0');

  return '#' + color;
}

@Injectable()
export class ApiService {


  //  mockDelay = 2000;
   mockDelay = 0;

  assignResourcesToEngagement(engagement_id, resource_id, pull = false) {

    if (pull)
      return this.deleteRequest(`api/v1/devsecops/resources/${engagement_id}/${resource_id}`).pipe()

    return this.putRequest(`api/v1/devsecops/resources/${engagement_id}/${resource_id}`).pipe(

    )

  }



  getCWE(query: string) {

    return this.getRequest(`api/v1/devsecops/cwe`, { query }).pipe(
      // map(_ => _?.data)

    )

  }

  getCWEById(id: number) {

    return this.getRequest(`api/v1/devsecops/cwe/${id}`, {  }).pipe(
      // map(_ => _?.data)

    )

  }

  getResourcesForEngagement(engagement_id) {

    return this.getRequest(`api/v1/devsecops/resources/${engagement_id}`).pipe(
      map(_ => _?.data)

      ,
      map((_: []) => {
        return _.map((_: any) => {


          _['primary_color'] = generateColorCode(_['email'])
          return _;

        })
      })
    )

  }



  getResources() {

    return this.getRequest(`api/v1/devsecops/resources`).pipe(
      map(_ => _?.data)

      ,
      map((_: []) => {
        return _.map((_: any) => {


          _['primary_color'] = generateColorCode(_['email'])
          return _;

        })
      })
    )

  }

  // Get Team Members
  getTeamMembers(businessId) {

    return this.getRequest(`api/v1/devsecops/team-members/${businessId}`).pipe(
      map(_ => _?.data?.users)

      ,
      map((_: []) => {
        return _.map((_: any) => {



          return {
            'primary_color': generateColorCode(_),
            'email': _
          };

        })
      })
    )

  }

  // new API
  getApplications(businessId?: string, projectId?: string, platform?: string) {


    return this.getRequest('api/v1/devsecops/apps', {
      projectId: projectId,
      businessId: businessId,
      platform: platform
    }).pipe(
      map(_ => _?.data),


      map((_: []) => {
        return _.map((_: any) => {


          _['primary_color'] = generateColorCode(_['business_id']['$oid']);

          return _;

        })
      })


    )
  }


  markIssueToBeverified(engagement_id: string, issue_id: string) {

    return this.putRequest(`api/v1/devsecops/engagement/${engagement_id}/mark-for-revalidation/${issue_id}`).pipe(
      map(_ => _?.data)
    )
  }

  markMultipleIssueToBeverified(engagement_id: string, issue_ids: any[]) {

    return this.putRequest(`api/v1/devsecops/engagement/${engagement_id}/mark-for-revalidation` , issue_ids).pipe(
      map(_ => _?.data)
    )
  }

  unmarkMultipleIssueToBeverified(engagement_id: string, issue_ids: any[]) {

    return this.putRequest(`api/v1/devsecops/engagement/${engagement_id}/unmark-for-revalidation` , issue_ids).pipe(
      map(_ => _?.data)
    )
  }


  unmarkIssueToBeverified(engagement_id: string, issue_id: string) {

    return this.deleteRequest(`api/v1/devsecops/engagement/${engagement_id}/${issue_id}`).pipe(
      map(_ => _?.data)
    )
  }


  getApplicationById(id: string) {

    if (!id) {
      return throwError(() => { new Error('Invalid Application') })
    }


    return this.getRequest(`api/v1/devsecops/app/${id}`).pipe(
      map(_ => _?.data)
    )
  }

  getProjectById(id: string) {

    if (!id) {
      return throwError(() => { new Error('Invalid Application') })
    }


    return this.getRequest(`api/v1/devsecops/project/${id}`).pipe(
      map(_ => _?.data)
    )
  }

  createSastEngagement(application_id: string, tags?: string[], changelogs?: string) {
    return this.postRequest(`api/v1/devsecops/engagement/sast`,
      {
        'application_id': application_id,
        tags,
        changelogs
      }

    ).pipe(

    )
  }


  createDastEngagement(application_id: string, tags?: string[], changelogs?: string) {
    return this.postRequest(`api/v1/devsecops/engagement/dast`,
      {
        'application_id': application_id,
        tags,
        changelogs
      }

    ).pipe(

    )
  }


  createPentestEngagement(application_id: string, tags?: string[], changelogs?: string) {
    return this.postRequest(`api/v1/devsecops/engagement/pentest`,
      {
        'application_id': application_id,
        tags,
        changelogs
      }

    ).pipe(

    )
  }

  updateApplicationById(id: string, env: string, data) {
    return this.postRequest(`api/v1/devsecops/app/${env}/${id}`,
      data

    ).pipe(
      delay(this.mockDelay),
      map(_ => _?.data)
    )
  }


  updateFindingPush( engagement_id: string,  finding_id: string, step_id: string, type: string, data) {

    if (type == 'step') {

      return this.updateStepToFinding(engagement_id, finding_id, step_id, data)

    }

    // Impact

    return this.updateImpactToFinding(finding_id, step_id, data)

  }





  public upload(file: File, id: string, env: string) {

    let fileId = 'fileId';
    // this will be the our resulting map
    // const status: { [key: string]: { progress: Observable<Object> } } = {};

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('files', file, file.name);
    // formData.append('data', 'fileUploading');


    // create a http-post request and pass the form
    // tell it to report the upload progress

    let headers = new HttpHeaders();

    // headers = headers.append('content-type', "multipart/form-data");

    let req = this.http.post(this.localUrl + '/api/v1/devsecops/upload', formData, {
      reportProgress: true,
      observe: 'events',

    })

    // create a new progress-subject for every file
    // const progrxess = new Subject<any>();

    // send the http-request and subscribe for progress-updates
    return req.pipe(

      map(

        (event) => {

          console.log('event.type', event.type);
          if (event.type === HttpEventType.UploadProgress) {

            // calculate the progress percentage
            const percentDone = Math.round(100 * event.loaded / event.total);

            // pass the percentage into the progress-stream

            // progress.next({ "progress": percentDone, "id": fileId });
            return of({ "progress": percentDone, "id": fileId, "completed": false });
          } else if (event.type === HttpEventType.Response) {

            // Close the progress-stream if we get an answer form the API
            let url = environment.minio_url + event.body['files'][0]['presigned_url'];
            let filedata = event.body['files'][0]['data'];
            console.log('boommmeer', url);

            return this.http.put(url, file, { withCredentials: true }).pipe(

              map(res => {

                return this.updateApplicationById(id, env,
                  { 'file': filedata },
                ).pipe(
                  map(
                    _ => {
                      console.log('updateApplicationById', id, env, filedata, _)

                      return { "progress": 100, "data": _, "id": fileId, "completed": true };

                    }
                  ));


                return this.http.post(this.localUrl + '/api/v1/devsecops/upload_linker',
                  filedata).pipe(
                    map(data => {
                      console.log(data);
                      if (data["status"] == true) {
                        // progress.next({ "progress": 100, "data": data['data'], "id": fileId })
                        // progress.complete();
                        return { "progress": 100, "data": data['data'], "id": fileId, "completed": true };


                      }
                      else {
                        this.toastrService.danger("Error occurred while uploading file!!");
                        return { "status": false }
                      }

                    })
                  )

              }

              )

              ,

              mergeMap(_ => _)

            )
            // The upload is complete
            // progress.next({ "progress": 100, "data": event.body, "id": fileId })
            // progress.complete();
          } else {
            console.log('event.type');

            return of({ "progress": 100, "completed": false });
          }
          // progress.next(123);
          // 
        }
      )



      // ,
      // mergeMap(_ => progress)
    )




    // return the map of progress.observables
    // return status;
  }


  public uploadToFinding(file: File, engagement_id: string , finding_id: string, step_id: string, attr: string, type: string) {

    let fileId = 'fileId';
    // this will be the our resulting map
    // const status: { [key: string]: { progress: Observable<Object> } } = {};

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('files', file, file.name);
    // formData.append('data', 'fileUploading');


    // create a http-post request and pass the form
    // tell it to report the upload progress

    let headers = new HttpHeaders();

    // headers = headers.append('content-type', "multipart/form-data");

    let req = this.http.post(this.localUrl + '/api/v1/devsecops/upload', formData, {
      reportProgress: true,
      observe: 'events',

    })

    // create a new progress-subject for every file
    // const progrxess = new Subject<any>();

    // send the http-request and subscribe for progress-updates
    return req.pipe(

      map(

        (event) => {

          console.log('event.type', event.type);
          if (event.type === HttpEventType.UploadProgress) {

            // calculate the progress percentage
            const percentDone = Math.round(100 * event.loaded / event.total);

            // pass the percentage into the progress-stream

            // progress.next({ "progress": percentDone, "id": fileId });
            return of({ "progress": percentDone, "id": fileId, "completed": false });
          } else if (event.type === HttpEventType.Response) {

            // Close the progress-stream if we get an answer form the API
            let url = environment.minio_url + event.body['files'][0]['presigned_url'];
            let filedata = event.body['files'][0]['data'];
            console.log('boommmeer', url);

            return this.http.put(url, file, { withCredentials: true }).pipe(

              map(res => {

                let data = {};
                data[attr] = { 'file': filedata }

                return this.updateFindingPush(engagement_id, finding_id, step_id,
                  type,
                  data,
                ).pipe(
                  map(
                    _ => {

                      return { "progress": 100, "data": _, "id": fileId, "completed": true };

                    }
                  ));


                return this.http.post(this.localUrl + '/api/v1/devsecops/upload_linker',
                  filedata).pipe(
                    map(data => {
                      console.log(data);
                      if (data["status"] == true) {
                        // progress.next({ "progress": 100, "data": data['data'], "id": fileId })
                        // progress.complete();
                        return { "progress": 100, "data": data['data'], "id": fileId, "completed": true };


                      }
                      else {
                        this.toastrService.danger("Error occurred while uploading file!!");
                        return { "status": false }
                      }

                    })
                  )

              }

              )

              ,

              mergeMap(_ => _)

            )
            // The upload is complete
            // progress.next({ "progress": 100, "data": event.body, "id": fileId })
            // progress.complete();
          } else {
            console.log('event.type');

            return of({ "progress": 100, "completed": false });
          }
          // progress.next(123);
          // 
        }
      )



      // ,
      // mergeMap(_ => progress)
    )




    // return the map of progress.observables
    // return status;
  }



  businessMaping() {
    return this.getRequest('api/v1/business/businessMaping', {
    }).pipe(
      map(_ => _.data),

      map((_: []) => {
        return _.map((_: any) => {

          _['color'] = generateColorCode(_['_id']['$oid']);

          _.projects.map(_ => {
            _['color'] = generateColorCode(_['_id']['$oid']);
            return _;
          })

          return _;

        })
      })

      ,
      // shareReplay(1)
      shareReplay(1, 1)
    )

  }

  addAssetUrl(url, applicationId) {

    return this.putRequest('api/v1/business/assets/dns', {
      applicationId: applicationId,
      domain: url
    })

  }

  removeAssetUrl(urlId, applicationId) {

    return this.deleteRequest('api/v1/business/assets/dns/' + applicationId + '/' + urlId)

  }

  getAssetUrls(applicationId) {

    return this.getRequest('api/v1/business/assets/dns/' + applicationId).pipe(
      map(_ => {
        _?.data?.unshift({
          domain: 'All',
          _id: {
            '$oid': '*'
          }

        })
        return _?.data
      }
      )
    )

  }

  getDiscoveredAssets(assetId, last_val = 0, searchField = '', page_limit = 3000) {

    return this.getRequest('api/v1/business/assets/dns/discovered/' + assetId

      , {
        last_val: last_val,
        search: searchField,
        limit: page_limit
      }
    ).pipe(
      map(_ => _?.data)
    )

  }

  getDiscoveredAllFilteredAssets(assetId, last_val = 0, searchField = '', page_limit = 30) {

    return this.getRequest('api/v1/business/assets/dns/discovered/filtered/' + assetId

      , {
        last_val: last_val,
        search: searchField,
        limit: page_limit
      }
    ).pipe(
      map(_ => _?.data)
    )

  }

  deleteApplication(id) {
    return this.getRequest('api/v1/customer/request/delete/' + id).pipe(
      map(_ => _?.data)
    )
  }


  editBusiness(businessId, data) {

    return this.putRequest('api/v1/business/' + businessId, data)

  }

  editProject(businessId, projectId, data) {

    return this.putRequest('api/v1/business/' + businessId + '/' + projectId, data)

  }

  createApp(data: any) {
    return this.postRequest('api/v1/devsecops/create_app', data).pipe(
      map(_ => _?.data)
    )
  }


  buildDetailedPipe(build) {


    let buildState = 'Unknown';

    let buildProgress = 0;
    let transition_state = build?.transition_state;

    let files = build?.files?.map(_ => {

      _['download_url'] = this.downloadFile(_).pipe(
        map(_ => {

          _.url = environment.minio_url + _.url;
          console.log('__download_url', _)

          return _.url;
        }),

        switchMap(_ => {
          return this.http.get(_, { responseType: 'text' })
        })
      );


      console.log('download_url', _)

      return _
    });

    build['files'] = files;

    if (transition_state <= TransitionState.FAILED) {
      buildState = 'Failed';
      buildProgress = 0;
    } else if (transition_state == TransitionState.ENQUEUED) {
      buildState = 'Enqueued';
      buildProgress = 5;
    }
    else if (
      transition_state >= TransitionState.EXECUTION_ENQUEUED
      &&
      transition_state <= TransitionState.EXECUTION_REPORT_DOWNLOADED

    ) {
      buildState = 'Executing';
      buildProgress = 25;

    }

    else if (
      transition_state >= TransitionState.PARSING_ENQUEUED
      &&
      transition_state <= TransitionState.PARSING_STARTED

    ) {
      buildState = 'Parsing';
      buildProgress = 75;

    } else if (
      transition_state >= TransitionState.PARSING_FINISHED

    ) {
      buildState = 'Completed';
      buildProgress = 100;

    } else {

    }


    let progressIcon = 'loader-outline';
    let _status = 'primary';


    if (transition_state == 0) {
      progressIcon = 'close-outline';
      _status = 'danger';
    } else if (transition_state == 8) {
      progressIcon = 'checkmark-outline'
      _status = 'success';

    }


    build['buildState'] = buildState;
    build['buildProgress'] = buildProgress;
    build['buildProgress'] = Math.ceil(transition_state / 8 * 100);
    build['progressIcon'] = progressIcon;
    build['_status'] = _status;


    return build;
  };

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

    build.finding_stats = this.getFindingStats(build?.applicationId, build?._id).pipe(





    )

    return build

  }



  selectedBuildId$ = new BehaviorSubject(undefined)
  selectedBuildId = this.selectedBuildId$.asObservable(
  ).pipe(

    // filter(_=>!!_)

  )

  loading = new BehaviorSubject(false);
  localUrl = environment.url
  lastSubscription



  selectApp(app) {


    console.log(
      'selectApp'
      ,
      app
    )
    this.selectedApp$.next(app);


  }

  selectProject(index, callback?: () => any) {
    this.selectedBusiness.pipe(
      first(),

      tap(
        _ => {



          this.selectedProject$.next(
            _?.project[index]

          )
        }

      )
    ).subscribe(_ => {
      if (callback) {
        callback()
      }
    })
  }

  selectBusiness(index, callback?: () => any) {


    this.appHier.pipe(
      first(),
      tap(
        _ => {

          this.selectedBusiness$.next(
            _[index]

          )
        }

      )
    ).subscribe(_ => {

      this.selectProject(0, callback)

    })


  }


  //TODO: Refactor Little Tricky
  getPlatforms() {
    return this.getRequest('api/v1/customer/items/platform').pipe(
      map(_ => _?.data)

    )
  }


  getUserApplication(filter?: {
    limit?: number,
    searchQuery?: string,
    direction?: 'above' | 'below',
    offsetId?: any,
    includeOffsetId?: boolean,
    filterBusinessId?: string,
    filterProjectId?: string,
    integrated?: boolean | string


  }) {

    if (!(filter?.integrated == true || filter?.integrated == false)) {
      delete filter['integrated']
    }


    if (filter?.includeOffsetId != true) {
      delete filter['includeOffsetId']
    }
    return this.getRequest('api/v1/customer/getUserApplication', filter)


  }

  getUserApplicationById(appId: string) {
    return this.getRequest('api/v1/customer/getUserApplication/' + appId).pipe(
      tap(_ => {
        if (_?.status == false) {
          // throw Error("No such app found");
          this.router.navigate(
            ['/',
              'devsec',
              // 'new_test',
              // '*',
              'switch'


            ]
          )
        }
      }),
      map(_ => _?.data)

    )


  }




  getDevsecopsBuildData(data, qparams) {

    return this.postRequest('api/v1/devsecops/build', data, qparams).pipe(
      map(_ => _?.data)
    )

  }


  getBusinesses() {

    return this.getRequest('api/v1/business/?limit=9999999999').pipe(
      map(_ => _?.data)
    )

  }

  getExternalTools() {

    return this.getRequest('api/v1/devsecops/getExternalToolsList').pipe(
      map(_ => _?.data.map(_ => {
        return _;
      }))
    )

  }

  getExternalDevSecTools() {
    return this.getRequest('api/v1/devsecops/getExternalDevToolsList').pipe(
      map(_ => _?.data)
    )

  }

  runExtetnalTool(data) {

    return this.postRequest('api/v1/devsecops/runAdhocExternalTools', data).pipe(
      map(_ => _?.data)
    )

  }

  runExtetnalToolNew(data) {

    return this.postRequest('api/v1/devsecops/runAdhocExternalToolsNew', data).pipe(
      map(_ => _?.data)
    )

  }


  getProjects() {

    return this.getRequest('api/v1/user/project/').pipe(
      map(_ => _?.data)
    )

  }



  suppressFindingById(id, data) {
    return this.postRequest(`api/v1/devsecops/finding/suppress/${id}`, data)

  }

  resetStateFindingById(id, data) {
    return this.postRequest(`api/v1/devsecops/finding/reset_state/${id}`, data)

  }



  acceptRiskFindingById(id, data) {
    return this.postRequest(`api/v1/devsecops/finding/accept_risk/${id}`, data)

  }
  getFindingById(id) {

    return this.getRequest(`api/v1/devsecops/finding/fetch/${id}`)
  }

  createFinding(id, data) {

    return this.postRequest(`api/v1/devsecops/engagement/${id}/finding` , data)

  }


  updateFinding(id , finding_id, data) {

    return this.putRequest(`api/v1/devsecops/engagement/${id}/finding/${finding_id}`, data)

  }

  addStepToFinding(id, finding_id,  data) {

    return this.postRequest(`api/v1/devsecops/engagement/${id}/finding/${finding_id}/step`,data)

  }

  addImpactToFinding(id) {

    return this.postRequest(`api/v1/devsecops/engagement/${id}/finding/impact`,)

  }


  getStepToFinding(engagement_id, finding_id, step_id) {

    return this.getRequest(`api/v1/devsecops/engagement/${engagement_id}/finding/${finding_id}/step/${step_id}`).pipe(
      map(_ => _?.data)

    );

  }

  deleteStepToFinding(engagement_id, finding_id, step_id) {

    return this.deleteRequest(`api/v1/devsecops/engagement/${engagement_id}/finding/${finding_id}/step/${step_id}`).pipe(
      map(_ => _)


    );

  }

  getImpactById(id, impact_id) {

    return this.getRequest(`api/v1/devsecops/engagement/${id}/finding/impact/${impact_id}`).pipe(
      map(_ => _?.data)


    );

  }

  updateStepToFinding(engaement_id: string,  finding_id: string,  step_id: string, data) {

    return this.putRequest(`api/v1/devsecops/engagement/${engaement_id}/finding/${finding_id}/step/${step_id}`,
      data
    ).pipe(
      delay(this.mockDelay)
    )

  }



  updateImpactToFinding(id: string, step_id: string, data) {

    return this.putRequest(`api/v1/devsecops/engagement/${id}/finding/impact/${step_id}`,
      data
    ).pipe(
      delay(this.mockDelay)
    )

  }

  stopBuildScan(applicationId, buildId) {

    return this.postRequest(`api/v1/devsecops/build/stop/${applicationId}/${buildId}`).pipe(
      map(_ => _?.data)
    )
  }


  stopAllPrevious(applicationId, buildId) {

    return this.postRequest(`api/v1/devsecops/build/stop/allprevious/${applicationId}/${buildId}`).pipe(
      map(_ => _?.data)
    )
  }


  getBuildByIds(buildIds, buildTopOffsetId?: string, filters?: any) {

    return this.postRequest(`api/v1/devsecops/builds`, {
      'build_ids': buildIds,
      'build_top_offset': buildTopOffsetId,
      filters: filters
    }).pipe(
      map(_ => _?.data)
    )
  }


  getBuildById(id) {

    return this.postRequest(`api/v1/devsecops/build/${id}`).pipe(
      map(_ => _?.data)
    )
  }


  getAssessmentsFindingsById(id) {

    return this.getRequest(`api/v1/devsecops/beta_findings/${id}`)
  }

  getOpenFindingsByAssessment(filter: string, assessment_id?: string, page_number: number = 1) {

    return this.getRequest(`api/v1/devsecops/engagement/findings/${filter}/${assessment_id}`, {
      // 'cursor_id': '652d14878eacec4be51de38d',
      // 'type': 'OLD'
      page: page_number,

    }).pipe(

      tap(
        _ => {
          console.log(_)
        }
      ),



    )

  }

  getAssessmentsFindings(business_id?: string, project_id?: string, application_id?: string, page_number: number = 1) {

    return this.getRequest('api/v1/devsecops/beta_findings', {
      // 'cursor_id': '652d14878eacec4be51de38d',
      // 'type': 'OLD'
      page: page_number,
      business_id,
      project_id,
      application_id,

    }).pipe(

      tap(
        _ => {
          console.log(_)
        }
      ),



    )

  }
  getEngagementDetailsById(engagement_id: string, business_id?: string, project_id?: string, application_id?: string, page_number: number = 1) {

    return this.getRequest(`api/v1/devsecops/engagement/details/${engagement_id}`).pipe(

      tap(
        _ => {
          console.log(_)
        }
      ),

      map(_ => _?.data)


    )

  }



  getEngagement(engagement: string, business_id?: string, project_id?: string, application_id?: string, page_number: number = 1) {

    return this.getRequest(`api/v1/devsecops/engagement${engagement}`, {

      page: page_number,
      business_id,
      project_id,
      application_id,

    }).pipe(

      tap(
        _ => {
          console.log(_)
        }
      ),


      map((_) => {
        _['data'] = _['data'].map((_: any) => {


          _['primary_color'] = generateColorCode(_['application_id']['$oid']);

          return _;

        });

        return _;
      })


    )

  }



  getAssessments(application_id?: string, page_number: number = 1) {

    return this.getRequest('api/v1/customer/assesment/history', {
      // 'cursor_id': '652d14878eacec4be51de38d',
      // 'type': 'OLD'
      page: page_number,
    }).pipe(

      tap(
        _ => {
          console.log(_)
        }
      ),


    )

  }


  getFindings(applicationId, buildId, severityFilter, sortBy, offset, limit) {

    return this.postRequest('api/v1/devsecops/finding/fetch',
      {
        match:
        {
          // 'applicationId': applicationId,
          'refrence_ids': buildId,
          'active': true,
          // 'buildId': buildId,
          'severity': {
            '$in': severityFilter
          }
        },

        sort: sortBy

        // 'businessId': { '$oid': '5e0dbac209caf2fedfd310f6' }
      },

      {
        'offset': offset,
        'limit': limit
      }
    ).pipe(
      map(_ => _?.data)
    )


  }

  getFindingStats(applicationId, buildId) {

    return this.postRequest('api/v1/devsecops/getFindingStats', {
      // 'applicationId': applicationId,
      'refrence_ids': buildId,
      'active': true,

      // 'businessId': { '$oid': '5e0dbac209caf2fedfd310f6' }
    }).pipe(
      map(_ => _?.data),

      map((severityStats: [{ _id: string, count: string }]) => {

        let severityMap = {
          info: 0,
          low: 0,
          medium: 0,
          high: 0,
          critical: 0,
        }
        severityStats.forEach(_s => {
          severityMap[_s._id.toLowerCase()] = _s.count

        })
        return severityMap;
      })

    )



  }

  getUserApplicationHierarchy() {

    return this.getRequest('api/v1/customer/getUserApplicationHierarchy')
  }

  public setLoading(isLoading: boolean) {
    if (this.lastSubscription)
      this.lastSubscription.unsubscribe()

    let animatedDelay = 0;

    if (isLoading)
      animatedDelay = 0;

    this.lastSubscription = of(isLoading).pipe(delay(animatedDelay)).subscribe(() => {
      this.loading.next(isLoading)
    })

  }

  getRequest(url, params = {}, headers = {}, inBackground = false): Observable<any> {

    return this.http.get<any[]>(
      `${this.localUrl}/${url}`, { params: params, headers: headers })


  }

  deleteRequest(url, params = {}, headers = {}, inBackground = false): Observable<any> {

    return this.http.delete<any[]>(
      `${this.localUrl}/${url}`, { params: params, headers: headers })


  }



  postRequest(url, data = {}, params = {}, headers: HttpHeaders = new HttpHeaders(), inBackground = false,): Observable<any> {

    Object.keys(params).forEach(key => params[key] === undefined && delete params[key])


    return this.http.post<any[]>(
      `${this.localUrl}/${url}`, data, { params: params, headers: headers })

  }


  putRequest(url, data = {}, params = {}, headers: HttpHeaders = new HttpHeaders(), inBackground = false,): Observable<any> {

    Object.keys(params).forEach(key => params[key] === undefined && delete params[key])


    return this.http.put<any[]>(
      `${this.localUrl}/${url}`, data, { params: params, headers: headers })

  }

  public selectedBusiness$ = new BehaviorSubject(undefined);
  public selectedBusiness = this.selectedBusiness$.asObservable().pipe(
    // shareReplay()

  )

  public selectedProject$ = new BehaviorSubject(undefined);
  public selectedProject = this.selectedProject$.asObservable().pipe(
    // shareReplay()
  )




  public applicationList$ = EMPTY.pipe(
    switchMap(_ => {
      return this.getUserApplication().pipe(
        map(_ => {
          return _?.data
        })
      )


    })
  )

  public appHier$ = this.getUserApplicationHierarchy().pipe(

    map((data) => {

      let all_business = {
        businessName: 'All',
        title: 'All',
        businessId: { $oid: '*' },
        _id: { $oid: '*' },
        project: []
      }



      data = data?.data




      let all_projects = []
      let all_project_count = 1;



      data.forEach(d => {




        d?.project.forEach(d => {


          let bId = d?.businessId

          d.businessId = bId;
          d.projectId = d?._id;
          d.title = d?.name;



        })


      })

      all_business.project = all_projects;
      data?.unshift(all_business);



      data.map((d) => {





        d.title = d?.businessName;
        d?.project.map((d, i) => {
          let bId = d?.businessId
          d.index = i
          d.businessId = bId;
          d.projectId = d?._id;

          d.title = d?.name;

          // d?.platform.forEach(d => {
          //   all_projects?.platform?.push(d)
          // });
        });


        d?.project?.unshift({
          businessId: d?.businessId,
          projectId: { $oid: '*' },
          _id: { $oid: '*' },
          // businessName: 'All',
          title: 'All',

        })

        d?.project.map((d, i) => {
          d.index = i



          if (i > 0) {
            let _d = Object.assign({}, d);
            _d.index = all_project_count;


            all_project_count += 1;

            all_projects.push(
              _d
            )

          }


        })



        return d;
      })



      data.map(
        (d, i) => {

          d.index = i
          return d;
        }
      )


      // this.appHier$.next(data);


      console.debug('debug', data)

      if (data?.length > 0) {
        this.selectBusiness(0);
      }

      return data





    }
    )

  );


  public appHier = this.appHier$.pipe(
    shareReplay()
  );


  public applicationList = this.applicationList$.pipe(

    shareReplay()
  )


  public applicationIntUnIntStats = this.applicationList.pipe(

    filter(_ => !!_),
    // map(_=>_?.data),

    map((_apps: []) => {

      let integrated_apps_count = 0;
      let unintegrated_apps_count = 0;

      _apps.forEach(
        (_apps: {
          application: []
        }
        ) => {

          _apps.application.forEach((app: {

            scan_data?: {}


          }) => {

            if (!!app?.scan_data) {
              integrated_apps_count += 1;
            } else {
              unintegrated_apps_count += 1;

            }
          });

          // let apps = _apps?.

        }
      )




      return {
        integrated_apps_count: integrated_apps_count,
        unintegrated_apps_count: unintegrated_apps_count,
      }
    })
  )



  public selectedApp$ = new BehaviorSubject(undefined);
  public selectedApp: Observable<any> = this.selectedApp$.asObservable().pipe(


    filter(_ => !!_),
    map((app: any) => {
      if (app == undefined) {
        return undefined;
      }
      // if (!!!app) {
      //   return {
      //     identifier: undefined
      //   };
      // }

      app.identifier = app?.application?.applicationId?.$oid

      let plafromName = app?.platformName || '';
      plafromName = plafromName.toLowerCase()
      if (plafromName?.indexOf('web') >= 0) {
        app.platformTag = 'web'
      } else if (plafromName?.indexOf('android') >= 0) {
        app.platformTag = 'mobile'
      } else if (plafromName?.indexOf('ios') >= 0) {
        app.platformTag = 'mobile'
      } else {
        app.platformTag = 'unknown'

      }


      return app;
    })
    ,
    distinctUntilKeyChanged('identifier'),

    // switchMap(app => {

    //   if (app?.identifier == undefined) {
    //     return of(app);;
    //   }

    //   if (!!!app) {

    //     return of(app);
    //   }
    //   // TODO: Change this



    //   return this.getAutoSuggestions({
    //     businessId: app?.businessId,
    //     projectId: app?.projectId,
    //     platformId: app?.platformId,
    //     applicationId: app?.application?.applicationId
    //   }).pipe(
    //     map(appSuggestions => {

    //       if (!!!appSuggestions?.data)
    //         appSuggestions.data = {}
    //       app.appSuggestions = appSuggestions?.data;
    //       return app
    //     }),


    //   )
    // })
    // ,

    // shareReplay(),



  )


  public applications = this.applicationList.pipe(
    tap(console.debug),
    // map(_ => _?.data),

  )


  public _applications = this.selectedProject.pipe(

    filter(_ => !!_),

    switchMap(selectedProject => {

      return this.applicationList.pipe(
        // tap(console.log),
        // map(_ => _?.data),
        map(items => {
          items = items.filter((_ => {

            let platformId = _.platformId.$oid;
            let platforms = selectedProject?.platform?.filter(_ => {
              return _?.platformId?.$oid == '*' || _?.platformId?.$oid == platformId;
            })


            return (_?.businessId?.$oid == selectedProject?.businessId?.$oid || selectedProject?.businessId?.$oid == '*') && (_?.projectId?.$oid == selectedProject?.projectId?.$oid || selectedProject?.projectId?.$oid == '*')

            return _?.projectId?.$oid == '*' || _?.projectId?.$oid == _?._id?.$oid;
          }))
          return items
        })
      )


    }),
    map(items => {
      let new_items = []

      items.forEach(item => {

        item?.application?.forEach(element => {
          let _d = Object.assign({}, item);
          _d.application = element;
          new_items.push(_d)


        });

      });



      return new_items;
    }),

    shareReplay()


    // Turn Array To Object
    // map((items: [{ applicationId: { $oid: string } }]) => {
    //   return items.reduce((obj, item) => Object.assign(obj, { [item.applicationId?.$oid]: item }), {});
    // })
  )





  init() {




    this.getUserApplication()
      .pipe(tap(_ => {

        // this.applicationList$.next(_?.data)

      }))
      .subscribe(_ => {




        this.getUserApplicationHierarchy().subscribe(


          (data) => {

            let all_business = {
              businessName: 'All',
              title: 'All',
              businessId: { $oid: '*' },
              _id: { $oid: '*' },
              project: []
            }



            data = data?.data




            let all_projects = []
            let all_project_count = 1;



            data.forEach(d => {




              d?.project.forEach(d => {


                let bId = d?.businessId

                d.businessId = bId;
                d.projectId = d?._id;
                d.title = d?.name;



              })


            })

            all_business.project = all_projects;
            data?.unshift(all_business);



            data.map((d) => {





              d.title = d?.businessName;
              d?.project.map((d, i) => {
                let bId = d?.businessId
                d.index = i
                d.businessId = bId;
                d.projectId = d?._id;

                d.title = d?.name;

                // d?.platform.forEach(d => {
                //   all_projects?.platform?.push(d)
                // });
              });


              d?.project?.unshift({
                businessId: d?.businessId,
                projectId: { $oid: '*' },
                _id: { $oid: '*' },
                // businessName: 'All',
                title: 'All',

              })

              d?.project.map((d, i) => {
                d.index = i



                if (i > 0) {
                  let _d = Object.assign({}, d);
                  _d.index = all_project_count;


                  all_project_count += 1;

                  all_projects.push(
                    _d
                  )

                }


              })



              return d;
            })



            data.map(
              (d, i) => {

                d.index = i
                return d;
              }
            )


            // this.appHier$.next(data);



            if (data?.length > 0) {
              this.selectBusiness(0);


              // if (data[0]?.project?.length > 0)
              // this.selectProject(0)
            }





          })

      })
  }


  constructor(
    public toastrService: NbToastrService,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone

  ) {


    // this.applications.subscribe()




  }

  getAutoSuggestions(data) {
    return this.postRequest('api/v1/devsecops/getRepositoryData', data)
  }

  getAppToken(data) {
    return this.postRequest('api/v1/devsecops/getAppToken', data)
  }

  forceRebuild(data, token) {
    return this.postRequest(`api/v1/devsecops/getBusinessHierarchy?token=${token}`, data)
  }

  getDevsecopsScanData(data) {
    return this.postRequest('api/v1/devsecops/getDevsecopsScanData', data).pipe(
      map(data => data?.data)
    )
  }

  getConfigureTools(match) {
    return this.postRequest('api/v1/devsecops/configure_tools', match)
  }

  setConfigureTools(match, data) {
    match['tools_config'] = data;
    return this.putRequest('api/v1/devsecops/configure_tools', match)
  }


  addDevsecopsScanDetails(data, scan_details) {
    return this.postRequest('api/v1/devsecops/addScanDetails', { "data": data, "details": scan_details })
  }

  getDevsecopsStaticScanData(data) {
    return this.postRequest('api/v1/devsecops/getDevsecopsScanData/static', data).pipe(
      map(data => data?.data)
    )
  }

  setDevsecopsActivationState(data, active_state) {
    return this.postRequest('api/v1/devsecops/addScanDetails/configure', { "data": data, "details": { 'active_state': active_state } })
  }

  setDevsecopsConfigActivationFlag(data, flag_name, active_state) {
    let details = {};
    details[flag_name] = active_state;
    return this.postRequest('api/v1/devsecops/addScanDetails/configure', { "data": data, "details": details })
  }

  addDevsecopsStaticScanDetails(data, scan_details) {
    return this.postRequest('api/v1/devsecops/addScanDetails/static', { "data": data, "details": scan_details })
  }

  getDevsecopsDynamicScanData(data) {
    return this.postRequest('api/v1/devsecops/getDevsecopsScanData/dynamic', data).pipe(
      map(data => data?.data)
    )
  }

  addDevsecopsDynamicScanDetails(data, scan_details) {
    return this.postRequest('api/v1/devsecops/addScanDetails/dynamic', { "data": data, "details": scan_details })
  }

  downloadReportZip(data) {
    return this.getRequest('api/v1/devsecops/getDevsecopsReport', data).pipe(
      map(data => data?.data?.url),
      filter(_ => !!_),

      tap(url => { window.open(environment.minio_url + url, '_blank') }),
      tap(_ => {
        this.toastrService.success("Downloading report  ", 'Download Started')
      }),
    )
  }



  retry(data) {
    return this.postRequest('api/v1/devsecops/retry', data)
  }

  lsremote(url) {
    return this.postRequest('api/v1/devsecops/config/remote', { 'url': url })
  }

  healthcheck(url) {
    return this.postRequest('api/v1/devsecops/config/healthCheck', { 'url': url }).pipe(

      map(_ => {

        return {
          status_code: _?.data,
          status: _?.status,

        }
      }),
      delay(this.mockDelay)
    )
  }

  runRecon(data) {
    return this.postRequest('api/v1/devsecops/runRecon', data)
  }


  runQuickDynamicScan(data) {
    return this.postRequest('api/v1/devsecops/runQuickDynamicScan', data)
  }

  runScan(uuid) {
    return this.postRequest('api/v1/devsecops/scm/run', { 'uuid': uuid })
  }

  updateBitbucketMapping(data) {
    return this.postRequest('api/v1/devsecops/scm/accesscontrol', data)
  }

  getAllScmRepos() {
    return this.getRequest('api/v1/devsecops/scm/repository').pipe(
      map(_ => _?.data)
    )
  }

  getAllScmProjects() {
    return this.getRequest('api/v1/devsecops/scm/projects').pipe(
      map(_ => _?.data)
    )

  }

  getAllProjects() {
    return this.getRequest('api/v1/customer/getUserApplicationHierarchy').pipe(

      map(_ => _?.data)
      ,
      map(_ => {

        let projects = [];
        _.forEach(__ => {

          __?.project?.map(___ => {

            let _p = ___;
            _p['businessId'] = __?.businessId;
            _p['businessName'] = __?.businessName;
            projects.push(_p);
          })





        });

        return projects;

      })

    )

  }

  downloadFile(file) {

    // let data = { "bucketName": "testbucket", "filename": file.name, "path": file.path }
    let data = { "bucketName": file.bucket, "filename": file.filename, "path": file.path }

    return this.getRequest("api/v1/external_tools/getPresignedUrl", data).pipe(
      map(_ => _?.data)
    )
  }

  downloadFileDirectly(file) {

    // let data = { "bucketName": "testbucket", "filename": file.name, "path": file.path }
    let data = { "bucket": file.bucket, "filename": file.filename, "path": file.path }

    return this.getRequest("api/v1/devsecops/download", data).pipe(
      map(_ => _?.data)
    )
  }

  downloadAppArtifact(fileId, env) {


    // window.location.href = `${this.localUrl}/api/v1/download/${fileId}`
    // let headers = new HttpHeaders();
    // headers = headers.append('businessName', businessName);
    // headers = headers.append('projectName', projectName);



    return this.getRequest(`api/v1/devsecops/download/${env}/${fileId}`)
      .pipe(
        map(data => {
          if (data.status == true) {
            let url = environment.minio_url + data.data["url"]
            let filename = data.data["filename"]
            console.log('minio_url', url)

            window.open(url, '_blank')
          }
          else
            this.toastrService.danger("Some error occured while downloading file!!");

        }
        )
      )



  }




  getAssociatedBusinesses(): Observable<any> {

    return this.getRequest('api/v1/business/?limit=9999999999').pipe(
      map(_ => _.data)
    )

  }

  getAssociatedBusinessesProjects(): Observable<any> {

    return this.getRequest('api/v1/project').pipe(
      map(_ => _.data)
    )

  }

  getAssociatedBusinessesByProjectId(businessId): Observable<any> {

    return this.getRequest('api/v1/business/' + businessId).pipe(
      map(_ => _.data?.projects)
    )

  }


}
