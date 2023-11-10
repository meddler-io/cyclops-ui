import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-apps',
  templateUrl: './manage-apps.component.html',
  styleUrls: ['./manage-apps.component.scss']
})
export class ManageAppsComponent {

  tabs = [


    {
      title: 'WebApp',
      route: ['webapp']

    },
    {
      title: 'Android',
      route: ['android']

    },

    {
      title: 'iOS',
      route: ['ios']

    },

    {
      title: 'Web Service',
      route: ['webservice']

    },



  ]

}
