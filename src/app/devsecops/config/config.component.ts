import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';



import { map, tap } from 'rxjs/operators';

import { ApiService, PUBLIC_SSH_KEY } from '../api.service';
import { BranchValidatorService } from '../branch-validator.service';
import { NbToastrService } from '@nebular/theme';

// const REGEX_GIT_REPO = '(git)?(://)(.*)(\.git)(/)?'
// const REGEX_GIT_REPO = `^[^@]+@[^:]+:[^/]+/[^.]+\.git$`
const REGEX_GIT_REPO = "'(w+://)(.+@)*([wd.]+)(:[d]+){0,1}/*(.*)'"
const URL_PATTERN = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/

export enum StepTypeEnum {
  GIT_URL = 0,
  GIT_BRANCH = 1,
  APP_URL = 2,
  LANG = 3,
  INTEGRATION = 4,

}
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {


  CODE_REPOSITORY_DISABLED = true;
  REPOSITORY_BRANCH_DISABLED = true;
  WEBSITE_URL_DISABLED = true;
  CODING_LANG_DISABLED = true;


  toggleCodeRepo() {

    if (this.CODE_REPOSITORY_DISABLED) {

    } else {
      this.validateGitAccess()
    }
    this.CODE_REPOSITORY_DISABLED = !this.CODE_REPOSITORY_DISABLED
  }


  StepTypeEnum = StepTypeEnum;
  currentStep: StepTypeEnum = StepTypeEnum.GIT_URL;

  code_repository_message = ''
  website_healthcheck_message = ''

  copySshKey(){


    this.clipboard.copy(PUBLIC_SSH_KEY);

    this.nbToastrService.primary(
      // PUBLIC_SSH_KEY,
      'Copied to clipboard!',
      'SSH Public Key',
  )

    
  }

  changeStep(index) {

    switch (index) {
      case 0:
        this.currentStep = StepTypeEnum.GIT_URL;
        break;

      case 1:
        this.currentStep = StepTypeEnum.GIT_BRANCH;

        break;

      case 2:
        this.currentStep = StepTypeEnum.APP_URL;

        break;

      case 3:
        this.currentStep = StepTypeEnum.LANG;

        break;


      case 4:
        this.currentStep = StepTypeEnum.INTEGRATION;

        break;

    }

  }

  repoBranchList = [

  ]


  disableFormChange = false;


  stepper = [
    {
      key: 'GIT_URL',
      alias: '1.Code Repository',
    },
    {
      key: 'GIT_BRANCH',
      alias: '2.Repository Branch',
      depends_upon: 0

    },
    {
      key: 'APP_URL',
      alias: '3.Webapp URL'

    },
    {
      key: 'LANG_NAME',
      alias: '4.Programming Lang.'

    }

  ]


  appDetails = {

    businessId: '',
    businessName: '',
    projectId: '',
    projectName: '',
    platformId: '',
    platformName: '',

    applicationId: '',
    applicationName: '',
  }

  programming_languages = [
    'java',
    'go',
    'javascript',
    'python',
    'ruby',
    'php',
    'nodejs',
    'django',
    'flask',
    'react',
    'Other',



  ]

  branchValidator(control: FormControl): { [key: string]: any } {

    if (this.repoBranchList.includes(control.value)) {
      return null;
    }

    return {
      'error': 'Invalid Branch'
    };;
  }

  scan_details_default = {

    APP_URL: '',
    APP_TYPE: '',
    LANG_NAME: '',
    GIT_URL: '',
    GIT_BRANCH: '',
    DEP_TIME: '',
  }

  scanDetails = new FormGroup(
    {
      GIT_URL: new FormControl('',
        {
          validators: [
            // Validators.pattern(REGEX_GIT_REPO),
            Validators.required]
        }
      ),


      GIT_BRANCH: new FormControl('',
        {
          validators: [
            // Validators.pattern(REGEX_GIT_REPO),
            this.branchValidator.bind(this)
            // Validators.required
          ]
        }
      ),

      APP_URL: new FormControl('',
        {
          validators: [Validators.pattern(URL_PATTERN), Validators.required]
        }
      ),

      APP_TYPE: new FormControl('',
        {
          validators: [Validators.required]
        }
      ),

      LANG_NAME: new FormControl('',
        {
          validators: [Validators.required]
        }
      ),


      DEP_TIME: new FormControl('',
        {
          validators: [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            // Validators.minLength(8),
          ]
        }
      ),
    }
  )


  integrationProgress = this.scanDetails.valueChanges.pipe(

    map(form => {

      return {
        "progress": "10%"
      }
    })
  )
    .subscribe()

  scan_details = { "APP_URL": "", "APP_TYPE": "", "LANG_NAME": "", "GIT_URL": "", "DEP_TIME": "" };


  appSuggestions = {
    GIT_URL: [],
    APP_URL: [],
  }

  constructor(

    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard,
    private nbToastrService: NbToastrService,




  ) { }
  giturl_loading = false;
  website_healthcheck_loading = false;

  getRemoteDetails() {

  }

  ngOnInit(): void {




    this.giturl_loading = true;

    this.apiService.selectedApp.subscribe(app => {



      // this.appDetails.reset()

      this.appDetails.businessId = app?.businessId
      this.appDetails.businessName = app?.businessName
      this.appDetails.projectId = app?.projectId
      this.appDetails.projectName = app?.projectName
      this.appDetails.platformId = app?.platformId
      this.appDetails.platformName = app?.platformName

      this.appDetails.applicationId = ''
      this.appDetails.applicationName = ''

      this.scanDetails.reset()

      let default_scan_data = {

      }



      this.appSuggestions = {
        GIT_URL: [],
        APP_URL: [],
      };
      this.appSuggestions = app?.appSuggestions;

      if (app?.application) {

        this.appDetails.applicationId = app?.application?.applicationId
        this.appDetails.applicationName = app?.application?.applicationName


        if (app?.application?.scan_data) {


          let scan_details = { ...this.scan_details_default, ...app?.application?.scan_data }

          this.scanDetails.setValue(scan_details);

          this.validateGitAccess()



        }

      }

      this.giturl_loading = false;

      // 




    })


  }

  loadingGeneric = false;

  saveScanDetails() {
    this.apiService.addDevsecopsScanDetails(this.appDetails, this.scanDetails.value,)
      .pipe(
        tap(_ => {
          this.loadingGeneric = true;
        })
      )
      .subscribe(_ => {
        this.loadingGeneric = false;

      })
  }

  validateWebsiteHealthCheck() {
    console.log(this.scanDetails.value)
    let appUrl = this.scanDetails.get('APP_URL').value;

    this.website_healthcheck_loading = true;
    this.website_healthcheck_message = 'Checking access to website'

    this.apiService.healthcheck(appUrl).subscribe(_ => {
      this.website_healthcheck_loading = false;
      this.website_healthcheck_message = 'Status Code:' + _?.data;

    })

  }

  retryBranchFetch = false;

  validateGitAccess() {

    this.retryBranchFetch = false;
    let gitUrl = this.scanDetails.get('GIT_URL').value;
    // console.log('gitUrl', gitUrl)
    this.disableFormChange = true;
    this.code_repository_message = 'Validating access to code repository.'
    this.apiService.lsremote(gitUrl).pipe(map(_ => {

      let branchList = [];
      if (_?.status == true) {
        branchList = Object.keys(_?.data);


      } else {
        throw Error("Unauthenticated access. Make sure that `whitehat` group has read permission for this repository.")
      }


      return branchList;
    }
    )
      ,
      map((branches: []) => {
        return branches.map((b: string) => {
          return b.split('/').pop()
        })
      })

    )
      .subscribe((_ => {
        this.repoBranchList = _;
        this.disableFormChange = false;
        this.code_repository_message = '';

        // this.currentStep = 1;

        this.scanDetails.get('GIT_BRANCH').updateValueAndValidity();

        this.scanDetails.markAsTouched()


      }), (_ => {

        this.repoBranchList = [];

        console.error('failed')
        this.disableFormChange = false;
        this.code_repository_message = _;

        this.scanDetails.get('GIT_BRANCH').updateValueAndValidity();
        this.scanDetails.markAsTouched();

        this.retryBranchFetch = true;



      }))

  }

  selectLang(lang) {

    this.scanDetails.get('LANG_NAME').setValue(lang);
    this.saveScanDetails();

  }

  selectBranch(branch) {
    this.scanDetails.get('GIT_BRANCH').setValue(branch);
    this.saveScanDetails();

  }
  nextStep() {
    let cStep = this.currentStep;
    if (cStep < this.stepper.length - 1)
      this.currentStep += 1;
  }

  previousStep() {
    let cStep = this.currentStep;
    if (cStep > 0)
      this.currentStep -= 1;

  }
}
