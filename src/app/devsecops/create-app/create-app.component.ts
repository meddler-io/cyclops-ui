import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { EMPTY, map, of, pairwise, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';

import { ApiService } from '../api.service';

const REGEX_GIT_REPO = "'(w+://)(.+@)*([wd.]+)(:[d]+){0,1}/*(.*)'"
const URL_PATTERN = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/


@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss']
})
export class CreateAppComponent implements OnInit {


  @Input('appId') applicationId;

  loadingGeneric = false;


  @Output('onclose') onClose$ = new EventEmitter();


  business$ = this.apiService.getAssociatedBusinesses().pipe(
    // filter(_=>!!!this.applicationId),

    tap(_ => {
      (this.configurationModel.get('business') as FormControl).setValue(_[0]?._id?.$oid);

      // this.configurationModel.markAllAsTouched()
    })
  )

  projects$;


  platforms$ = this.apiService.getPlatforms().pipe(

    tap(_ => {
      (this.configurationModel.get('platform') as FormControl).setValue(_[0]?._id?.$oid);
      // this.configurationModel.markAllAsTouched()
    })
  )

  configurationModel = new FormGroup({

    business: new FormControl(undefined, [Validators.required]),
    project: new FormControl(undefined, [Validators.required]),
    platform: new FormControl(undefined, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    desc: new FormControl('', []),
    // git: new FormControl('https://github.com/aboul3la/Sublist3r.git', [Validators.required]),
    git: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    url: new FormControl('', []),


    configuration: new FormGroup({
      email: new FormControl(false),
      jira: new FormControl(false),

      git: new FormControl(false),
      url: new FormControl(false),
      apk: new FormControl(false),
      ipa: new FormControl(false),


    })
  })


  loadEdittableApp() {

    this.apiService.getUserApplicationById(this.applicationId)
      .pipe(
        tap(_ => {



          this.configurationModel.setControl(
            'business', new FormControl(
              _?.businessId?.$oid, [
              Validators.required
            ]
            )
          );

          // 

          this.configurationModel.setControl(
            'project', new FormControl(
              _?.projectId?.$oid, [
              Validators.required
            ]
            )
          );

          // 

          this.configurationModel.setControl(
            'platform', new FormControl(
              _?.platformId?.$oid, [
              Validators.required
            ]
            )
          );

          // 

          this.configurationModel.setControl(
            'name', new FormControl(
              _?.application?.applicationName, [
              Validators.required
            ]
            )
          );

          // 

          this.configurationModel.setControl(
            'desc', new FormControl(
              '', [
              Validators.required
            ]
            )
          );

          // 

          this.configurationModel.setControl(
            'git', new FormControl(
              _?.application?.scan_data?.static?.GIT_URL, [
              Validators.required
            ]
            )
          );

          // 

          this.configurationModel.setControl(
            'branch', new FormControl(
              _?.application?.scan_data?.static?.GIT_BRANCH, [
              Validators.required
            ]
            )
          );

          // 

          this.configurationModel.setControl(
            'url', new FormControl(
              _?.application?.scan_data?.dynamic?.APP_URL, [
              Validators.required
            ]
            )
          );

        })
      )
      .subscribe()



  }
  formInvalidated() {

  }


  repoBackupField = ''
  branchBackupField = ''


  focusRepoField(focus: boolean, dialogRef?) {


    let repoVal = this.configurationModel.get('git').value;
    let branchVal = this.configurationModel.get('branch').value;

    console.log(
      '______|', repoVal, '_', this.repoBackupField, focus
    )

    if (focus == true) {
      this.repoBackupField = repoVal;
      this.branchBackupField = branchVal;


    } else {
      if (this.repoBackupField == repoVal) {
        return
      } else {

        this.openDialog(dialogRef, repoVal)
      }
    }
  }
  constructor(
    private apiService: ApiService,
    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,


  ) {

    this.configurationModel.get('url').invalid
  }

  ngOnInit(): void {

    this.loadEdittableApp()

    this.configurationModel.valueChanges
      .pipe(
        startWith(this.configurationModel.value), pairwise()
      )
      .subscribe(_ => {

        let a = _[0];
        let b = _[1];

        if (a.business !== b.business) {

          this.projects$ = this.apiService.getAssociatedBusinessesByProjectId(b.business).pipe(
            tap(_ => {
              (this.configurationModel.get('project') as FormControl).setValue(_[0]?._id?.$oid);

            })
          )


        }

        console.log(
          'valueChanges', _
        )
      })
  }


  onBusinessChange() {

  }


  searchBranchFilter = new FormControl('');

  // 

  dialogRef: NbDialogRef<any>;

  selectBranch(_branch: string) {

    if (_branch?.length == 0) {

      return
    }

    this.configurationModel.get('branch').setValue(_branch);
    this.dialogRef?.close();
  }

  openDialog(dialog: TemplateRef<any>, val) {



    this.dialogRef = this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      // closeOnBackdropClick: false,
      // closeOnEsc: false,
      context: {
        git_url: val,
        lsRemote: this.apiService.lsremote(val)
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

              if (branches?.length == 0) {
                console.log('____', branches)

                this.configurationModel.get('git').setValue(this.repoBackupField);
                this.configurationModel.get('branch').setValue(this.branchBackupField);
              }

              return branches.map((b: string) => {
                return b.split('/').pop()
              })
            })
            ,
            shareReplay()
          )
      }
    })

    this.dialogRef.onClose.subscribe(_ => {


      this.searchBranchFilter.setValue('');
      // this.configurationModel.get('git').setValue(prevVal)
      // this.loadControlData()

    });
  }

  saveApp() {

    let _data = this.configurationModel.value;
    let data = {
      business: {
        '$oid': _data?.business
      }, //  new FormControl(undefined, [Validators.required]),
      project: {
        '$oid': _data?.project
      }, //new FormControl(undefined, [Validators.required]),
      platform: {
        '$oid': _data?.platform
      },
      name: _data?.name,
      desc: _data?.desc,
      git: _data?.git,
      branch: _data?.branch,
      url: _data?.url,
      // name: new FormControl('test', [Validators.required]),
      // desc: new FormControl('', []),
      // git: new FormControl('https://github.com/aboul3la/Sublist3r.git', [Validators.required]),
      // branch: new FormControl('master', [Validators.required]),
      // url: new FormControl('', []),

    }


    this.loadingGeneric = true;

    this.apiService.createApp(data).subscribe(_ => {
      this.loadingGeneric = false;

      console.log('navigating', _?.inserted_id)
      this.onClose$.emit(true)

      if (_?.inserted_id) {

        this.router.navigate(
          [
            '../',
            _?.inserted_id,
            'integration'
          ]
          ,
          {
            relativeTo: this.activatedRoute

          }
        )
      } else {
        this.router.navigate(
          ['./']
        )
      }

    })
  }
}
