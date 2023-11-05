import { Component, OnInit } from '@angular/core';
import { distinct, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { NbRouteTabsetComponent, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
  tabs = [
 

   
    {
      title: 'Config',
      route: ['config'],
      badgeText: '23'

    },

    {
      title: 'Integration',
      route: ['integration']
    },


    {
      title: 'Builds',
      // disabled: true,
      route: ['builds']
    },

    {
      title: 'Findings',
      // disabled: true,
      route: ['findings']
    },

  ]


  selectedApp = this.apiService.selectedApp.pipe(
    filter(_ => !!_),
    // switchMap(selectedApp => {

    //   console.log(
    //     'selectedApp', selectedApp?.application?.applicationId?.$oid
    //   )
    //   return this.getToken(selectedApp).pipe(
    //     map(token => {
    //       selectedApp.code_snippet = token;
    //       return selectedApp
    //     })
    //   )


    // })
  )

  constructor(
    private apiService: ApiService,
    private clipboard: Clipboard,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.apiService.init()


    // this.apiService.selectedApp.subscribe(app=>{
    //   this.getToken(app)
    // })

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
        return `curl --request POST http://hawki-api.indiatimes.com/stargate/api/api/v1/devsecops/getCodeSnipppet?token=${token} | sh`
      })
    )

  }

  copyToCB(text) {
    this.clipboard.copy(text)

    this.toastrService.success(
      'Success',
      'Copied to clipboard'
    )
  }

}
