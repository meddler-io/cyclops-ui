import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';

import { combineLatest, combineLatestAll, EMPTY, filter, map, merge, pairwise, shareReplay, startWith, Subscription, switchMap, take, tap } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-external-tools-runner',
  templateUrl: './external-tools-runner.component.html',
  styleUrls: ['./external-tools-runner.component.scss']
})
export class ExternalToolsRunnerComponent implements OnInit {

  dialogFormGroup = new FormGroup({
    url: new FormControl('', [Validators.required]),
    repo: new FormControl('', [Validators.required]),

  })

  @ViewChild('parent') parent: ViewContainerRef



  loadingGeneric = false;
  selectedApp = this.apiService.selectedApp.pipe(
    filter(_ => !!_?.identifier),
    map(app => {
      console.log('map 1', app)
      return {
        businessId: app?.businessId,
        projectId: app?.projectId,
        platformId: app?.platformId,
        applicationId: app?.application?.applicationId
      }
    }),
    shareReplay()
  )



  external_tools = {};

  email_notifications = new FormControl(undefined);
  active_state = new FormControl(undefined);

  external_tools_list = this.apiService.getExternalTools();
  external_tools_devsec_list = this.apiService.getExternalDevSecTools().pipe(
    map(data => data.tools),
    map(_ => {
      return _.map(element => {
        return { name: Object.keys(element)[0]  , parse: element['PARSE'] };
      });
    })
  );





  constructor(
    private apiService: ApiService,

    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,



  ) { }
  ngOnDestroy(): void {

    // this.dialogRef?.close()

    this.subscription_1.unsubscribe();
    this.subscription_2.unsubscribe();
    this.subscription_3.unsubscribe();


  }





  ngOnInit(): void {
    // this.dialogRef?.close()

    this.dialogFormGroup.reset();
    this.subscription_1.unsubscribe();
    this.subscription_2.unsubscribe();
    this.subscription_3.unsubscribe();







    this.loadingGeneric = true;





  }



  canSave = false;


  formEnabled = false;


  subscription_1 = Subscription.EMPTY;
  subscription_2 = Subscription.EMPTY;
  subscription_3 = Subscription.EMPTY;


  runExternalTool(tool, appUrl, gitUrl) {

    this.subscription_1 = this.selectedApp.pipe(
      map(_ => {
        console.log('map 2', _);

        _['toolId'] = tool["_id"]["$oid"]
        _["scan_data"] = { "URL": appUrl, "REPO": gitUrl };
        console.log('runExternalTool', _, tool);

        return _;

      }),
      switchMap(_ => {
        return this.apiService.runExtetnalTool(_)
      })
    ).subscribe(_ => {


      console.log(
        'nbigating to',
        ['external_tool_scans', _]
      )
      this.router.navigate(['external_tool_scans', _], {
        relativeTo: this.activatedRoute.parent
      })

    })
  }

  runExternalToolNew(tool, appUrl, gitUrl) {

    this.subscription_1 = this.selectedApp.pipe(
      map(_ => {

        let domain = '';

        try {

          domain = (new URL(appUrl)).hostname;
        } catch (er) {
          domain = appUrl;
        }
        console.log('map 2', _);
        let toolName = "_EXT_" + tool['name']
        let parsingEnabled =  tool['parse'];

        _['toolId'] = tool["name"];
        _['parse'] = parsingEnabled;
        _["scan_data"] = {


          "APP_URL": appUrl,
          "DOMAIN": domain,
          "bucket_env": 0,
          // "REPO": gitUrl
        };
        _['scan_data'][toolName] = 'True'
        console.log('runExternalTool', _, tool);

        return _;

      }),
      switchMap(_ => {

        return this.apiService.runExtetnalToolNew(_)
      })
    ).subscribe(_ => {


      console.log(
        'nbigating to',
        ['external_tool_scans', _]
      )

      return;
      this.router.navigate(['external_tool_scans', _], {
        relativeTo: this.activatedRoute.parent
      })

    })
  }

  openDialog(dialog: TemplateRef<any>, tool) {
    console.log('open', dialog, tool, this.dialogService)

    this.subscription_2 = combineLatest(
      [

        this.appUrl,
        this.gitRepo
      ]
    ).pipe(take(1)).subscribe(_ => {

      console.log('merge', _)



      // this.dialogFormGroup.get('url').setValue('');
      // this.dialogFormGroup.get('repo').setValue('');

      // if (tool?.required_field?.indexOf('URL') >= 0) 
      {
        this.dialogFormGroup.setControl(
          'url', new FormControl(_[0], [Validators.required])
        )
      }


      // if (tool?.required_field?.indexOf('REPO') >= 0) 
      {
        this.dialogFormGroup.setControl(
          'repo', new FormControl(_[1], [Validators.required])
        )
      }



      this.dialogRef?.close()

      this.dialogRef = this.dialogService.open(dialog, {
        context: tool
      });


      this.subscription_3 = this.dialogRef.onClose.subscribe((_) => {

        console.log('Closing dialog', _, tool)

        if (!!!_) {
          this.dialogFormGroup.reset();
          return;
        }

        // let tool = _;
        let data = this.dialogFormGroup.value;
        let appUrl = data?.url;
        let gitUrl = data?.repo;
        console.log(
          '_runExternalTool', appUrl, gitUrl
        )

        this.dialogFormGroup.reset();

        if (_?.length == 1) {
          this.runExternalTool(tool, appUrl, gitUrl)
        } else if (_?.length == 2) {
          this.runExternalToolNew(tool, appUrl, gitUrl)
        }
      });

    })

  }

  dialogRef;

  appUrl = this.selectedApp.pipe(
    switchMap(_ => {
      return this.apiService.getDevsecopsDynamicScanData(_).pipe(
        map(_ => {
          console.log('map 1', _)

          return _?.APP_URL || '';

        })
      )

    }
    )
  )

  gitRepo = this.selectedApp.pipe(
    switchMap(_ => {
      return this.apiService.getDevsecopsStaticScanData(_).pipe(
        map(_ => {
          console.log('map 1', _)

          return _?.GIT_URL || '';

        })
      )

    }
    )
  )



}
