import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ApiService } from '../api.service';
import { delay, distinct, distinctUntilChanged, distinctUntilKeyChanged, filter, first, map, mergeMap, share, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { EMPTY, of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


const URL_PATTERN = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/


@Component({
  selector: 'app-assets-dns',
  templateUrl: './assets-dns.component.html',
  styleUrls: ['./assets-dns.component.scss']
})
export class AssetsDnsComponent implements OnInit {


  urlFormField: FormControl = new FormControl('', [Validators.required, Validators.pattern(URL_PATTERN)]);

  // of([]);

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
    }),
    // shareReplay()
  )

  assetUrls = this.selectedApp.pipe(

    take(1),

    mergeMap(_ => {

      return this.apiService.getAssetUrls(
        _?.applicationId?.$oid

      ).pipe(
        // map(_=>{
        //   return _.concat(_).concat(_)
        // })
      )

    })
    ,

  )


  constructor(
    private dialogService: NbDialogService,
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {
  }

  openDialog(dialog: TemplateRef<any>) {


    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {

      }
    }).onClose.subscribe(_ => {

      this.urlFormField.setValue('');

    });
  }

  addUrl(ref) {


    let _domain = this.urlFormField.value;

    if (_domain.indexOf('http://') == 0
      ||
      _domain.indexOf('https://') == 0
    ) {

    } else{
      _domain = 'http://' + _domain;
    }
    let domain = (new URL(_domain)?.hostname);


    this.selectedApp.pipe(

      tap(_ => {

        console.log(
          domain
        )
      })
      ,

      mergeMap(_ => {

 



        return this.apiService.addAssetUrl(
          domain,
          _?.applicationId?.$oid
        ).pipe(
          map(__=>{
            return _;
          })
        )

      })
      ,
      tap(_ => {
        ref?.close();
      })
      ,
      take(1),


    )
      .subscribe(_=>{
        this.assetUrls = this.apiService.getAssetUrls(
          _?.applicationId?.$oid

        )
      })


  }

  removeUrl(id) {



    this.selectedApp.pipe(

      mergeMap(_ => {

  

        return this.apiService.removeAssetUrl(
          _?.applicationId?.$oid,
          id,
        ).pipe(
          map(__=>{
            return _;
          })
        )

      })
      ,
      tap(_ => {

      })
      ,
      take(1),


    )
      .subscribe(_=>{
        this.assetUrls = this.apiService.getAssetUrls(
          _?.applicationId?.$oid

        )
      })


  }
  runScan(url) {

    this.selectedApp.pipe(

      take(1),
      mergeMap(_ => {
        _['target'] = url;
        return this.apiService.runRecon(_)
      })
      
    ).subscribe(_=>{
      this.router.navigate([ '../',  'recon_jobs'], {
        relativeTo: this.activatedRoute
      })
    })



    
  }

  runQuickDynamicScan(url){
    this.selectedApp.pipe(

      take(1),
      mergeMap(_ => {
        _['target'] = url;
        return this.apiService.runQuickDynamicScan(_)
      })
      
    ).subscribe(_=>{
      
      this.router.navigate([ '../',  'quick_dynamic_scan'], {
        relativeTo: this.activatedRoute
      })

    })



  }


}
