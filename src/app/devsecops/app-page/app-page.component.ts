import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter, share, startWith, switchMap, tap, scan, shareReplay, mergeMap, catchError } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { FormControl, Validators } from '@angular/forms';
import { Platform } from 'src/environments/constants';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent implements OnInit {

  envs = [
    { route: 'development', title: 'Development' },
    { route: 'staging', title: 'Staging' },
    { route: 'production', title: 'Production' },

  ]


  allowed_extensions_for_file_upload = {
    'android': '.zip, .apk, .apks, .xapk, .obb  ',
    'ios': '.zip, .xcarchive, .ipa, .app  ',
    'webservice': '.zip, .yaml, .json  ',
  }

  searchBranchFilter = new FormControl('');


  curRoute = this.activatedRoute.paramMap;
  curEnv = this.curRoute.pipe(
    map(_ => _.get('env')),

    tap({
      next: (_) => {
        console.log('__', _)

      },
      error: (_ => {
        console.log('__', _)

      })
    })

    ,
    shareReplay()
  )

  url: FormControl = new FormControl('', [Validators.required]);
  urlEditEnabled = false;
  urlPlaceholder;
  urlToggleEditMode() {
    if (!this.urlEditEnabled) {

      this.urlPlaceholder = this.url.value;
      this.urlEditEnabled = true;
    }
  }

  urlFocusout() {
    if (this.urlEditEnabled) {

      this.url.setValue(this.urlPlaceholder);
      this.urlPlaceholder = '';
      this.urlEditEnabled = false;
      // console.log('urlFocusout', this.urlPlaceholder)
    }
  }


  // File Artifact data
  fileArtifact: { path: string, filename: string, bucket: string } = {
    path: '',
    filename: '',
    bucket: ''
  }
  fileArtifactEditEnabled = false;
  fileArtifactPlaceholder;
  fileArtifactToggleEditMode() {
    if (!this.urlEditEnabled) {

      this.urlPlaceholder = this.url.value;
      this.urlEditEnabled = true;
    }
  }

  fileArtifactFocusout() {
    if (this.urlEditEnabled) {

      this.url.setValue(this.urlPlaceholder);
      this.urlPlaceholder = '';
      this.urlEditEnabled = false;
      // console.log('urlFocusout', this.urlPlaceholder)
    }
  }

  // 



  repository: FormControl = new FormControl('', [Validators.required]);
  repositoryPlaceholder;
  repositoryBranch: FormControl = new FormControl('', [Validators.required]);


  repositoryEditEnabled = false;

  selectBranch(branch) {
    console.log('selectBranch', branch)
    this.repositoryBranch.setValue(branch);
  }


  repositoryToggleEditMode() {
    if (!this.repositoryEditEnabled) {
      this.repositoryPlaceholder = this.repository.value;
      this.repositoryEditEnabled = true;
    }
  }

  repositoryFocusout() {
    if (this.repositoryEditEnabled) {

      this.repository.setValue(this.repositoryPlaceholder);
      this.repositoryPlaceholder = '';
      this.repositoryEditEnabled = false;
      // console.log('urlFocusout', this.urlPlaceholder)
    }
  }


  resetAllFormFields() {
    this.url.setValue('');

    this.repository.setValue('');
    this.repositoryBranch.setValue('');
    this.fileArtifact = {
      bucket: '',
      filename: '',
      path: '',
    }
  }


  setApplicationRef() {
    this.application = this.curRoute.pipe(

      map(_ => _.get('appid')),

      mergeMap(_ => {
        return this.apiService.getApplicationById(_)
      })
      ,
      mergeMap(app => {
        return this.curEnv.pipe(
          map(curEnv => {
            app['active_env'] = curEnv;
            return app;
          })
        )
      })
      ,



      tap({
        next: (app) => {


          this.resetAllFormFields()

          let platform: Platform = app['platform']

          let config = {};

          if (app.active_env == 'staging') {
            if ('staging' in app['config'])
              config = app['config']['staging']

          } else if (app.active_env == 'development') {
            if ('development' in app['config'])
              config = app['config']['development']

          } else if (app.active_env == 'production') {
            if ('production' in app['config'])
              config = app['config']['production']

          } else {

          }

          let appRef = undefined;

          if (platform == 'webapp') {


            if (platform in config) {

              appRef = config[platform];
              if ('endpoint' in appRef) {
                let endpoint = appRef['endpoint'];
                this.url.setValue(endpoint)
              }

              if ('repository' in appRef) {

                let repository = appRef.repository;

                let remote = repository?.remote;
                let branch = repository?.branch;
                this.repository.setValue(remote)
                this.repositoryBranch.setValue(branch);
                console.log('repositoryBranch', branch)



              }
            }
          } else if (platform == 'webservice') {

            appRef = config[platform];
            if (appRef)
              if ('file' in appRef) {
                let file = appRef["file"];

                this.fileArtifact.bucket = file?.bucket;
                this.fileArtifact.filename = file?.filename;
                this.fileArtifact.path = file?.path;

              }


          } else if (platform == 'ios') {

            appRef = config[platform];
            if (appRef)
              if ('file' in appRef) {
                let file = appRef["file"];

                this.fileArtifact.bucket = file?.bucket;
                this.fileArtifact.filename = file?.filename;
                this.fileArtifact.path = file?.path;

              }
          } else if (platform == 'android') {

            appRef = config[platform];
            if (appRef)
              if ('file' in appRef) {
                let file = appRef["file"];

                this.fileArtifact.bucket = file?.bucket;
                this.fileArtifact.filename = file?.filename;
                this.fileArtifact.path = file?.path;

              }

          } else {

          }





        }
      })
      ,

      shareReplay()

    )
  }

  application;



  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService



  ) { }
  ngOnInit(): void {
    this.setApplicationRef();
  }

  openDialog(dialog: TemplateRef<any>, id: string, url: string, env: string) {

    this.urlEditEnabled = false;

    console.log(
      'openDialog_application',
      id,
      url,
      env

    )

    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {
        app_url: this.url.value,
        lsRemote: this.apiService.healthcheck(this.url.value)
          .pipe(map(_ => {

            return { status_code: _?.data }

          }
          ),

          )
      }
    }).onClose.subscribe(_ => {

      console.log(
        'openDialog_application',
        'onC;ose',
        _
      );

      if (_ == true) {

        this.apiService.updateApplicationById(id, env, {
          'endpoint': url
        }).subscribe(_ => {
          this.setApplicationRef();
        });


      } else {
        this.setApplicationRef();


      }
      // this.loadControlData()

    });
  }


  openDialogToSaveRepository(dialog: TemplateRef<any>, id: string, url: string, env: string) {



    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {
        git_url: url,
        lsRemote: this.apiService.lsremote(url)
          .pipe(
            switchMap(_ => {

              return this.searchBranchFilter.valueChanges.pipe(
                startWith(this.searchBranchFilter.value)
              ).pipe(
                map(val => {

                  console.debug('map_val', val, _);
                  if (_.status == false) {
                    return [];
                  }

                  return Object.keys(
                    _?.data
                  ).filter(branch => {
                    return branch.toLowerCase().indexOf(val) != -1
                  })

                })
              );
            })
          )
          .pipe(

            map((branches: [] | undefined) => {


              return branches.map((b: string) => {
                return b.split('/').pop()
              })
            })
            ,
            shareReplay()
          )
      }
    }).onClose.subscribe(branch => {

      console.log(
        'loadControlData',
        branch
      );

      if (branch == false || branch == undefined) {

        this.setApplicationRef();


      } else {

        this.apiService.updateApplicationById(id, env, {
          'remote': url,
          'branch': branch,
        }).subscribe(_ => {
          this.setApplicationRef();
        });

      }



    });
  }



  @ViewChild("file") file
  public files: Set<File> = new Set()

  onFilesAdded(id: string, platform: string, env: string) {
    console.log(
      'onFilesAdded', id, platform, env
    )

    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);

        this.apiService.upload(files[key], id, env)
          .pipe(mergeMap(_ => _))
          .pipe(
            catchError((err, exc) => {
              console.log('BOOBOO', 'catcherror');

              return EMPTY;
            }),
          )
          .subscribe(
            {
              next: (data) => {
                console.log('BOOBOO', data);
                this.setApplicationRef()
              },

              error: (err) => console.log("BOOBOO", err),
              complete: () => console.log("BOOBOO", 'COMPLETED'),


            }






          );
      }
    }
  }

  uploadFile() {
    this.file.nativeElement.click();

    // this.apiService.downloadFile('654e0489e2286e3542548a87')

  }
  download(id, env) {
    this.apiService.download(id, env).subscribe(_ => {



    })

  }



}


