import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { ApiService } from '../api.service';
import { EMPTY, Observable, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-manage-app-sidebar',
  templateUrl: './manage-app-sidebar.component.html',
  styleUrls: ['./manage-app-sidebar.component.scss']
})
export class ManageAppSidebarComponent implements OnInit {

  selectedApp;

  menu_items = [

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

  goTo(route) {
    console.log('lolol', this.router.url)
    this.router.navigate(
      [{ outlets: { 'content': route } }]
      ,
      {
        relativeTo: this.activatedRoute.parent,
        queryParamsHandling: 'preserve'
      }
    )
  }

  getRouterLink() {
    const route = 'manage-apps'; // Replace with your actual route

    return [
      '/',
      {
        outlets: { 'content': [route] },
      },
      {
        relativeTo: this.activatedRoute.parent,
        queryParamsHandling: 'preserve',
      },
    ];
  }

  constructor(
    private apiService: ApiService,
    public activatedRoute: ActivatedRoute,
    public accessChecker: NbAccessChecker,
    private router: Router

  ) { }


  ngOnInit(): void {



    this.selectedApp = this.activatedRoute.queryParamMap.pipe(
      map(_ => _?.get('appid')),
      map(_ => this.apiService.getApplicationById(_)),
      switchMap(_ => _),

    )

  }




}
