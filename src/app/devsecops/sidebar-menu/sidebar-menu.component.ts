import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {


  menuItems = [
    {
      icon: 'https://img.icons8.com/nolan/64/dashboard.png',
      title: 'Dashboard'
    },
    {
      icon: 'https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-app-healthy-lifestyle-icongeek26-outline-gradient-icongeek26.png',
      title: 'Applications'
    }, {
      icon: 'https://img.icons8.com/nolan/64/bookmark.png',
      title: 'Builds'
    }, {
      icon: 'https://img.icons8.com/nolan/64/dashboard.png',
      title: 'CI/CD Integration'
    }, {
      icon: 'https://img.icons8.com/nolan/64/dashboard.png',
      title: 'Scan'
    }, {
      icon: 'https://img.icons8.com/external-bearicons-gradient-bearicons/64/000000/external-setting-essential-collection-bearicons-gradient-bearicons.png',
      title: 'Settings'
    },
  ]

  constructor() { }


  ngOnInit(): void {
  }

}
