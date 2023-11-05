import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { EMPTY, filter, map, pairwise, shareReplay, startWith, Subscription, switchMap, take, tap } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tools-config',
  templateUrl: './tools-config.component.html',
  styleUrls: ['./tools-config.component.scss']
})
export class ToolsConfigComponent implements OnInit, OnDestroy {

  loadingGeneric = false;
  selectedApp = this.apiService.selectedApp.pipe(
    filter(_ => !!_?.identifier),
    map(app => {
      return {
        businessId: app?.businessId,
        projectId: app?.projectId,
        platformId: app?.platformId,
        applicationId: app?.application?.applicationId
      }
    }),
    shareReplay()
  )

  static_tools = {};

  dynamic_tools = {};

  configuration = {};

  external_tools = {};

  configurationModel;

  email_notifications = new FormControl(undefined);
  active_state = new FormControl(undefined);

  external_tools_list= this.apiService.getExternalTools();



  listenChangesSubscription = Subscription.EMPTY;

  constructor(
    private apiService: ApiService,




  ) { }
  ngOnDestroy(): void {
    this.listenChangesSubscription.unsubscribe();

  }

  initFormData(data) {

    console.log('initFormData', data)
    Object.keys(data?.static_tools).forEach(key => {

      (this.configurationModel.get('static_tools') as FormGroup).setControl(
        key, new FormControl(data?.static_tools[key])
      );
    });

    if(data?.configuration?.email){
      (this.configurationModel.get('configuration') as FormGroup).setControl(
        'email', new FormControl(data?.configuration?.email)
      );
    }

    if(data?.configuration?.jira){
      (this.configurationModel.get('configuration') as FormGroup).setControl(
        'jira', new FormControl(data?.configuration?.jira)
      );
    }

    Object.keys(data?.static_tools).forEach(key => {

      (this.configurationModel.get('static_tools') as FormGroup).setControl(
        key, new FormControl(data?.static_tools[key])
      );
    });

    Object.keys(data?.dynamic_tools).forEach(key => {

      (this.configurationModel.get('dynamic_tools') as FormGroup).setControl(
        key, new FormControl(data?.dynamic_tools[key])
      );
    });

  }

  updateFormData(data) {

    console.debug('__', data)
    Object.keys(data?.tools_config?.static_tools)?.forEach(key => {

      (this.configurationModel.get('static_tools') as FormGroup).get(key).patchValue(data?.tools_config?.static_tools[key], { emitEvent: false, onlySelf: true });
    });

    Object.keys(data?.tools_config?.dynamic_tools)?.forEach(key => {

      (this.configurationModel.get('dynamic_tools') as FormGroup).get(key).patchValue(data?.tools_config?.dynamic_tools[key], { emitEvent: false, onlySelf: true });

    });

    Object.keys(data?.configuration)?.forEach(key => {

      (this.configurationModel.get('configuration') as FormGroup).get(key).patchValue(data?.configuration[key], { emitEvent: false, onlySelf: true });

    });
  }


  ngOnInit(): void {


    this.configurationModel = new FormGroup({
      static_tools: new FormGroup({}),
      dynamic_tools: new FormGroup({}),
      configuration: new FormGroup({
        email: new FormControl(false),
        jira: new FormControl(false),

      })
    })

    this.listenChangesSubscription.unsubscribe();

    this.loadingGeneric = true;
    this.selectedApp.pipe(
      take(1),

      switchMap(appDetails => {

        return this.apiService.getConfigureTools(appDetails).pipe(tap(data => {

          console.log('disturbing')


          this.initFormData(data);

          this.static_tools = data?.static_tools;
          this.dynamic_tools = data?.dynamic_tools;
          this.configuration = data?.configuration;
        }))

      })
    ).subscribe(data => {
      this.loadingGeneric = false;
      console.log(
        'pairwise', this.configurationModel.value
      )
      this.listenChangesSubscription = this.configurationModel.valueChanges.pipe(

        tap(_ => {

          console.log(
            'startWith', this.configurationModel.value
          )
        }),
        startWith(data),
        pairwise(),

        map(([oldState, newState]) => {
          console.log(
            'pairwise', oldState, '_', newState
          )
          let changes = {
            static_tools: {},
            dynamic_tools: {},
            configuration: {}
          };

          let configuration_oldState = oldState?.configuration;
          let configuration_newState = newState?.configuration;
          let configuration_changes = {};
          for (const key in configuration_newState) {
            // if (configuration_oldState[key] !== configuration_newState[key]) 
            {
              configuration_changes[key] = configuration_newState[key];
              (this.configurationModel.get('configuration') as FormControl).get(key).patchValue(false, { emitEvent: false, onlySelf: true });

            }
          }



          let static_oldState = oldState?.static_tools;
          let static_newState = newState?.static_tools;
          let static_changes = {};
          for (const key in static_newState) {
            if (static_oldState[key] !== static_newState[key]) {
              static_changes[key] = static_newState[key];
              (this.configurationModel.get('static_tools') as FormControl).get(key).patchValue(undefined, { emitEvent: false, onlySelf: true });

            }
          }

          let dynamic_oldState = oldState?.dynamic_tools;
          let dynamic_newState = newState?.dynamic_tools;
          let dynamic_changes = {};
          for (const key in dynamic_newState) {
            if (dynamic_oldState[key] !== dynamic_newState[key]) {
              dynamic_changes[key] = dynamic_newState[key];
              (this.configurationModel.get('dynamic_tools') as FormControl).get(key).patchValue(undefined, { emitEvent: false, onlySelf: true });

            }
          }

          changes.static_tools = static_changes;
          changes.dynamic_tools = dynamic_changes;
          changes.configuration = configuration_changes;

          
          return changes;
        }),
        filter(changes => Object.keys(changes).length !== 0 && !this.configurationModel.invalid)
        ,

        switchMap((value: any) => {
          console.log('changesInForm', value)
          // return EMPTY;

          return this.selectedApp.pipe(
            take(1),
            switchMap(appDetails => {

              return this.apiService.setConfigureTools(appDetails, value).pipe(tap(data => {
                // this.static_tools = data?.static_tools;
                // this.dynamic_tools = data?.dynamic_tools;
                this.updateFormData(data);


              }))

            })
          )
        }),
      ).subscribe()

    })




  }

  save() {
    this.loadingGeneric = true;

    this.canSave = false;
    this.selectedApp.pipe(
      take(1),
      switchMap(appDetails => {

        return this.apiService.setConfigureTools(appDetails, this.configurationModel.value).pipe(tap(data => {
          this.static_tools = data?.static_tools;
          this.dynamic_tools = data?.dynamic_tools;
        }))

      })
    ).subscribe(_ => {
      this.loadingGeneric = false;

    })
  }

  canSave = false;

  formInvalidated() {

    return;
    this.canSave = true;

  }

  formEnabled = false;

  onChangeActiveState(event){
    if(event == false){
      this.formEnabled = false;
      // this.configurationModel.disable();
      // this.configurationModel.markAsDirty()
    } else{
      // this.configurationModel.enable()
      this.formEnabled = true;


    }
    console.debug(
      'onChangeActiveState',
      event
    )
  }

  runExternalTool(tool){

    this.selectedApp.pipe(
      map(_=>{

        _['toolId'] = tool["_id"]["$oid"]
        _["scan_data"] = {"URL": "https://hackware.ru"};
        console.log('runExternalTool', _, tool);

        return _;

      }),
      switchMap(_=>{
      return  this.apiService.runExtetnalTool(_)
      })
    ).subscribe()
  }
}
