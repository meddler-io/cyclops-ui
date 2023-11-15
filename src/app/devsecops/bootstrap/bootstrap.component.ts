import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSearchService, NbSidebarService, NbThemeService, NbSidebarState, NbDialogService } from '@nebular/theme';

import { BehaviorSubject, interval, of, Subscription } from 'rxjs';
import { delay, filter, map, share, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent implements OnInit, OnDestroy {



  @ViewChild('businessListDialog') businessListDialog;
  @ViewChild('projectListDialog') projectListDialog;


  selectedBusiness = this.apiService.selectedBusiness;
  selectedProject = this.apiService.selectedProject;

  selectedApp = this.apiService.selectedApp.pipe(
    // shareReplay()
  )
  activeAppId = this.activatedRoute.paramMap.pipe(

    tap((_) =>
      console.log('logger', _)
    )
    ,
    map(
      _ => {
        console.log('logger', _.get('app_id'))
        return _.get('app_id')
      }
    ),
    filter(_ => {

      // this.loadSelectedAppDetailedView(_)
      // console.log('console_logger', _)

      if (!!!_)
        return false;

      return true;


    }),

    shareReplay(),

  ).subscribe()


  constructor(
    private apiService: ApiService
    ,
    private themeService: NbThemeService,
    private activatedRoute: ActivatedRoute,
    private sidebarService: NbSidebarService,
    private dialogService: NbDialogService,
    private router: Router



  ) {



  }

  SIDEBAR_DEFAULT_STATE: NbSidebarState = 'expanded';

  isSidebarOpen = this.sidebarService.onToggle().pipe(
    tap(
      state => {
        console.log(
          'state', state
        )
      }
    ),

    switchMap(_ => {
      return this.sidebarService.getSidebarState()
    }),

    map(state => {
      // 'expanded' | 'collapsed' | 'compacted';
      if (state == 'expanded') {
        return true;
      }

      return false;
    }),

    startWith(
      (this.SIDEBAR_DEFAULT_STATE == 'expanded' ? true : false)

    )
  )

  ngOnInit(): void {
  

    this.themeService.changeTheme('dark');
    // this.apiService.init()


    // 

    let activeAppId = this.activatedRoute.queryParamMap.pipe(


      map(
        _ => {
          return _.get('appid')
        }
      ),
      filter(_ => {
        if (!!!_)
          return false;
        return true;

      }),

      switchMap(appId => {
        console.debug(
          'activeAppId', appId
        );
        if (appId == '*') {
          return of(undefined)
        }
        return this.apiService.getUserApplicationById(appId)
        // this.apiService.selectApp(appId)

      })
      ,

      delay(5000)
      , tap(app => {

        console.log(
          'selectApp_test'
          ,
          app
        )
        this.apiService.selectApp(app)


      })


    )
      .subscribe(

      )
  }
  ngOnDestroy(): void {
    this.themeService.changeTheme('default');

    console.log(
      'ngOnDestroy'
    )

  }

  retry(data) {
    this.apiService.retry(data).subscribe(data => {
      if (data.status)
        this.apiService.toastrService.success("REQUEST SENT!!");
    });
  }

  toggleMenu() {
    this.sidebarService.toggle(false, 'applist');

  }

  openAppListDialog(template) {
    // this.openDialog(template)
    this.dialogService.open(template, {
      dialogClass: 'sidebarlDilog',
      backdropClass: 'blurBackdrop',
    })
      .onClose
      .subscribe()

  }

  openBusinessDialog(dialog: TemplateRef<any>) {
    this.openDialog(dialog, () => {
      this.openProjectDialog(this.projectListDialog)
    })
  }

  openProjectDialog(dialog: TemplateRef<any>) {
    this.openDialog(dialog)
  }

  openDialog(dialog: TemplateRef<any>, callback?: () => any) {
    this.dialogService.open(dialog, {
      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {
        title: 'Are you sure you want to delete all the tasks ?',
        description: 'All the tasks will be lost, and you won\'t be able to recover them in future.    '

      }
    })
      .onClose
      .subscribe(data => {

        if (data == true)
          if (callback)
            callback()


      })
  }

}
