import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { filter, first, map, mergeMap, switchMap } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';

import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {

  selectedApp = this.apiService.selectedApp.pipe(
    filter(_ => !!_),
    switchMap(selectedApp => {

      console.log(
        'selectedApp', selectedApp
      )
      return this.getToken(selectedApp).pipe(
        map(token => {
          selectedApp.code_snippet = token;
          return selectedApp
        })
      )


    })
  )
  
  constructor(
    private apiService: ApiService,
    private nbToastrService: NbToastrService,
    private clipboard: Clipboard,
    private nbDialogService: NbDialogService,



  ) { }

  ngOnInit(): void {



  }

  editConfig(
    configTemplate
  ){

    this.openDialog(configTemplate)
  }

  openDialog(dialog: TemplateRef<any>) {
    this.nbDialogService.open(dialog, {
      dialogClass: 'fullScreenDialog',

      context: {
        title: 'Are you sure you want to delete all the tasks ?',
        description: 'All the tasks will be lost, and you won\'t be able to recover them in future.    '

      }
    })
      .onClose
      .subscribe(data => {

      })
  }

  getToken(app) {



    let data = {
      businessId: app?.businessId,
      businessName: app?.businessName,
      projectId: app?.projectId,
      projectName: app?.projectName,
      platformId: app?.platformId,
      applicationId: app?.application?.applicationId,
      applicationName: app?.application?.applicationName,

    }


   

    return this.apiService.getAppToken(data).pipe(
      map(data => data?.data),
      map(token => {
        return `curl --request POST http://${this.DEVSECOPS_ENDPOINT}/api/v1/devsecops/getCodeSnipppet?token=${token} | sh || true`
      })
    )

  }

  DEVSECOPS_ENDPOINT = environment.hawki_api_hostname;

  copyToCB(text){
    this.clipboard.copy(text)
    this.nbToastrService.success(
      'Code snipped has been copied to your clipboard!',
      'Copied to clipboard',
       )
  }

}
