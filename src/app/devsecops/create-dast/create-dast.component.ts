import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbSidebarService, NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { ApiService } from '../api.service';
import { DrawerService } from '../drawer/drawer.service';
import { StateManagerService } from '../state-manager.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, Subject, of } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Platform } from 'src/environments/constants';

@Component({
  selector: 'app-create-dast',
  templateUrl: './create-dast.component.html',
  styleUrls: ['./create-dast.component.scss']
})
export class CreateDastComponent {

  @Input('environment') environment = 'staging';

  tags: Set<string> = new Set<string>();
  options: string[] = [];

  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
    this.options.push(tagToRemove.text);
  }

  onTagAdd(value: string): void {
    if (value) {
      this.tags.add(value);
      this.options = this.options.filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }


  url: FormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  urlEditEnabled = false;
  urlPlaceholder;

  changelogs = new FormControl('', [Validators.required]);

  saving$ = false;
  reconfirm = new Subject();

  cancel() {

    this.reconfirm.next(undefined);

    this.url.setValue(this.urlPlaceholder);
    this.urlPlaceholder = '';
    this.urlEditEnabled = false;

  }

  saveUrl(id, url) {

    this.reconfirm.next({
      action: 'saving'
      , message: `Updating application details`, url: url, id: id
    });
    this.apiService.updateApplicationById(id, this.environment, {
      endpoint: url
    }).subscribe(_ => {
      this.reconfirm.next(undefined);
    })
  }


  testConnectivity(id, url, force: boolean = false) {

    this.reconfirm.next({
      action: 'check_connectivity',
      message: 'Checking connectivity'
    })


    this.urlEditEnabled = false;
    this.saving$ = true;

    this.apiService.healthcheck(url)
      .pipe(
        map(_ => {

          if (_?.status_code == 200) {


            this.reconfirm.next({
              action: 'saving'
              , status_code: _?.status_code, message: `Invalid status code: ${_?.status_code} `, url: url, id: id
            });
            return this.apiService.updateApplicationById(id, this.environment, {
              endpoint: url
            })
          } else {


            this.reconfirm.next({
              action: 'reconfirm'
              , status_code: _?.status_code, message: `Invalid status code: ${_?.status_code} `, url: url, id: id
            });
            throw Error("Invalid status code");
          }


        }
        ),

        mergeMap(_ => _),
        catchError(error => {

          return EMPTY;
        })

      ).subscribe(_ => {

        this.urlEditEnabled = true;

        this.reconfirm.next(undefined);

      })

  }
  urlToggleEditMode() {
    if (!this.urlEditEnabled) {

      this.urlPlaceholder = this.url.value;
      this.urlEditEnabled = true;
    }
  }

  urlFocusout() {
    console.log('urlFocusout');


    if (this.urlEditEnabled) {

      this.url.setValue(this.urlPlaceholder);
      this.urlPlaceholder = '';
      this.urlEditEnabled = false;

    }
  }


  allowed_extensions_for_file_upload = {
    'android': '.zip, .apk, .apks, .xapk, .obb  ',
    'ios': '.zip, .xcarchive, .ipa, .app  ',
    'webservice': '.zip, .yaml, .json  ',
  }
  @ViewChild("file") file;
  public files: Set<File> = new Set()


  onFilesAdded(id: string, platform: string) {
    console.log(
      'onFilesAdded', id, platform, this.environment
    )

    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);

        this.apiService.upload(files[key], id, this.environment)
          .pipe(mergeMap(_ => _))
          .pipe(
          // mergeMap(_ => {

          //   return this.apiService.updateApplicationById(id, this.environment, {
          //     file: _['data']
          //   })

          // })
        )
          .pipe(
            catchError((err, exc) => {

              return EMPTY;
            }),
          )
          .subscribe(
            {
              next: (data) => {



                this.setApplicationRef()
              },

              error: (err) => console.log("BOOBOO", err),
              complete: () => console.log("BOOBOO", 'COMPLETED'),

            }






          );
      }
    }
  }


  @Input('application_id') application_id = undefined;
  application;

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


  constructor(
    private apiService: ApiService,
    private drawerMngr: DrawerService,
    private nbSidebarService: NbSidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stateManagerService: StateManagerService


  ) { }
  ngOnInit(): void {

    this.setApplicationRef();


  }

  resetAllFormFields() {
    this.url.setValue('');
    this.fileArtifact = {
      bucket: '',
      filename: '',
      path: '',
    }
  }

  setApplicationRef() {
    this.application = this.apiService.getApplicationById(this.application_id).pipe(
      tap({
        next: (app) => {


          this.resetAllFormFields()

          let platform: Platform = app['platform']

          let config = {};

          if ('config' in app)

            if (this.environment == 'staging') {
              if ('staging' in app['config'])
                config = app['config']['staging']

            } else if (this.environment == 'development') {
              if ('development' in app['config'])
                config = app['config']['development']

            } else if (this.environment == 'production') {
              if ('production' in app['config'])
                config = app['config']['production']

            } else {

            }

          let appRef = undefined;

          console.log('repositoryBranch', config)




          appRef = config;


          if (platform == Platform.WEBAPP) {



            if ('endpoint' in appRef) {
              let endpoint = appRef['endpoint'];
              this.url.setValue(endpoint)
            }



          } else if (platform == Platform.WEBSERVICE) {

            if (appRef)
              if ('file' in appRef) {
                let file = appRef["file"];

                this.fileArtifact.bucket = file?.bucket;
                this.fileArtifact.filename = file?.filename;
                this.fileArtifact.path = file?.path;

              }


          } else if (platform == Platform.IOS) {


            if (appRef)
              if ('file' in appRef) {
                let file = appRef["file"];

                this.fileArtifact.bucket = file?.bucket;
                this.fileArtifact.filename = file?.filename;
                this.fileArtifact.path = file?.path;

              }
          } else if (platform == Platform.ANDROID) {

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
    )

  }

  uploadFile() {
    this.file.nativeElement.click();

    // this.apiService.downloadFile('654e0489e2286e3542548a87')

  }
  download(id) {
    this.apiService.downloadAppArtifact(id, this.environment).subscribe(_ => {



    })

  }

  createEngagement() {
    this.apiService.createSastEngagement(
      this.application_id,
      Array.from(this.tags.values()),
      this.changelogs.value).subscribe()
  }
}
