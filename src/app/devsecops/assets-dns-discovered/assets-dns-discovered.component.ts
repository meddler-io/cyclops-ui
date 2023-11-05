import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { tap, filter, map, take, mergeMap } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-assets-dns-discovered',
  templateUrl: './assets-dns-discovered.component.html',
  styleUrls: ['./assets-dns-discovered.component.scss']
})
export class AssetsDnsDiscoveredComponent implements OnInit {




  assetUrls;


  constructor(
    private dialogService: NbDialogService,
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,


  ) { }


  selectedApp = this.apiService.selectedApp.pipe(
    tap(_ => {

      console.log(
        _
      )
    })
    ,
    filter(_ => !!_?.identifier),
    map(app => {
      return {
        businessId: app?.businessId,
        projectId: app?.projectId,
        platformId: app?.platformId,
        applicationId: app?.application?.applicationId
      }
    })
  )

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(_ => {
      let appId = _.get('asset_id')
      console.debug('activatedRoute', appId);
      this.assetUrls = this.apiService.getDiscoveredAssets(
        appId
      ).pipe(
        // map(_=>{
        //   return _.concat(_).concat(_)
        // })
      )

    })
  }



  openDialog(dialog: TemplateRef<any>) {


    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {

      }
    }).onClose.subscribe(_ => {



    });
  }

  runQuickDynamicScan(url) {
    this.selectedApp.pipe(

      take(1),
      mergeMap(_ => {
        _['target'] = url;
        return this.apiService.runQuickDynamicScan(_)
      })

    ).subscribe(_ => {
      return;
      this.router.navigate(['../', 'quick_dynamic_scan'], {
        relativeTo: this.activatedRoute
      })

    })



  }

  runAll(urls: []) {

    urls.forEach( (url: any) => {
      this.runQuickDynamicScan(url?.domain)
    })

  }

}
