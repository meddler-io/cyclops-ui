import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { StateManagerService } from '../state-manager.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-layout-app',
  templateUrl: './layout-app.component.html',
  styleUrls: ['./layout-app.component.scss']
})
export class LayoutAppComponent implements OnInit {

  constructor(
    private activateddRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private stateManagerService: StateManagerService,

  ) {

  }

  ngOnInit() {





    this.activateddRoute.queryParamMap.pipe(
      first(),
      // map(_ => _?.get('appid')),
      // map(_ => this.apiService.getApplicationById(_)),
      // switchMap(_ => _),

    ).subscribe(params => {

      console.log('filterid_prioirity.', params)

      if (params.has('appid')) {
        this.stateManagerService.setAppId(params.get('appid'), this.apiService, this.router, null);
        console.log('filterid_prioirity', 'appid');

      } else {

        this.router.navigate(   [ 'home',   { outlets: { primary: ['manage-apps'] , content: ['manage-apps'] } }]  , {
          relativeTo: this.activateddRoute.parent
        } )
      }

      return

      if (params.has('projectid')) {
        this.stateManagerService.setProjectId(params.get('projectid'), this.apiService, this.router, null);
        console.log('filterid_prioirity', 'projectid');


      } else if (params.has('businessid')) {
        this.stateManagerService.setBusinessId(params.get('businessid'), this.apiService, this.router, null);
        console.log('filterid_prioirity', 'businessid');

      }


    });

  }

}
