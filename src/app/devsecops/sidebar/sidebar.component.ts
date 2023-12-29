import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { EMPTY, filter, map, mergeMap, Observable, startWith, Subscription, switchMap, take, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  inputProjectFormControl: FormControl;

  selectedApp: Observable<any> = EMPTY;

  routePrefix = [
    '/',
    'devsec',
    // 'new_test',
  ]
  // <img src="https://img.icons8.com/material-rounded/24/000000/home.png"/>
  // <img src="https://img.icons8.com/nolan/64/data-configuration.png"/>
  menu_items = [


    // 

    // {
    //   title: 'Dashboard',
    //   icon: 'https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-home-user-interface-icongeek26-outline-gradient-icongeek26.png',
    //   tag: undefined,
    //   link:
    //     [
    //       'dashboard'
    //     ]
    // },

    // {
    //   title: 'Builds',
    //   icon: 'https://img.icons8.com/nolan/64/package.png',
    //   tag: undefined,
    //   link: [
    //     'builds'
    //   ]

    // },

    // {
    //   title: 'Scans',
    //   icon: 'https://img.icons8.com/nolan/64/package.png',
    //   tag: undefined,
    //   link: [
    //     'scans'
    //   ]

    // },
    // {
    //   title: 'Issues',
    //   icon: 'https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-scoreboard-football-icongeek26-outline-gradient-icongeek26.png',
    //   tag: undefined,
    //   link: [
    //     'issues'
    //   ]


    // },

    // {
    //   title: 'Findings',
    //   icon: 'https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-scoreboard-football-icongeek26-outline-gradient-icongeek26.png',
    //   tag: undefined,
    //   link: [
    //     'findings'
    //   ]


    // },
    {
      title: 'Reports',
      icon: 'https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-process-graphic-design-icongeek26-outline-gradient-icongeek26.png',
      tag: 'Upcoming',
      disabled: true,
      link: [
        'reports'
      ]







    },

    {
      title: 'Integration Guide',
      icon: 'https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-process-graphic-design-icongeek26-outline-gradient-icongeek26.png',
      tag: undefined,
      link: [

        'integration'
      ]


    },

    {
      title: 'Settings',
      icon: 'https://img.icons8.com/nolan/64/critical-thinking.png',
      tag: undefined,
      link: [
        // 'configure'
        'tools_configure'
      ]

    },

    {
      title: 'Switch',
      icon: 'https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-home-user-interface-icongeek26-outline-gradient-icongeek26.png',
      tag: undefined,
      link:
        [
          '/',
          'devsec',
          'switch'
        ]
    }

  ]


  selectedAppSubscription = Subscription.EMPTY;


  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public accessChecker: NbAccessChecker

  ) { }
  ngOnDestroy(): void {

    this.selectedAppSubscription.unsubscribe()

  }

  build_count;;

  businessMaping = this.apiService.businessMaping()

  filteredControlOptions: Observable<any> = this.businessMaping;

  private filter(value: any) {
    const filterValue = value.toLowerCase();
    return this.businessMaping
      .pipe(

        map((_: any) => {
          // If business name matches
          // return _.filter((optionValue: any) => optionValue?.name?.toLowerCase().includes(filterValue))

          let searchedResults = []
          _.forEach(element => {

            if (element?.name?.toLowerCase().includes(filterValue)) {
              searchedResults.push(element)
            }
            else {
              let projects = [];
              element?.projects?.forEach(element => {

                if (element?.name?.toLowerCase().includes(filterValue)) {
                  projects.push(element);
                }

              });

              if (projects.length > 0) {
                element.projects = projects;
                searchedResults.push(element)

              }


            }
          });
          // If project name matches

          return searchedResults
        })

      )

  }


  ngOnInit(): void {

    


    this.inputProjectFormControl = new FormControl();
    this.filteredControlOptions = this.inputProjectFormControl.valueChanges
      .pipe(
        startWith(''),
        mergeMap(filterString => this.filter(filterString)),
      );




    this.selectedApp = this.apiService.selectedApp.pipe(
      tap((application: any) => {
        let noOfBuilds = application?.application?.noOfBuilds;

        if (noOfBuilds != undefined) {
          // this.menu_items[1].tag = noOfBuilds;
          this.build_count = noOfBuilds;
        }


      }),

    )

    console.debug('routeDebug', 'ngOnInit')
    this.selectedAppSubscription.unsubscribe()

    this.selectedAppSubscription = this.selectedApp.subscribe()

    this.activatedRoute.params.subscribe(_ => {

      let x = this.activatedRoute.snapshot
      console.debug('routeDebug', _, x)
    })
  }

  updatingActiveAttribute = false;

  toggleActivateAppSwitch(event) {

    this.updatingActiveAttribute = true;

    // return;
    this.selectedApp.pipe(

      filter(_ => !!_?.identifier),
      map(app => {
        return {
          businessId: app?.businessId,
          projectId: app?.projectId,
          platformId: app?.platformId,
          applicationId: app?.application?.applicationId
        }
      }),


      switchMap(appDetails => {

        return this.apiService.setDevsecopsActivationState(appDetails, event)
      })
    ).subscribe(_ => {
      this.updatingActiveAttribute = false;


    })


  }

  onChange(event){

  }

}
