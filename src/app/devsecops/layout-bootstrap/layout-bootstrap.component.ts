import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { StateManagerService } from '../state-manager.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-layout-bootstrap',
  templateUrl: './layout-bootstrap.component.html',
  styleUrls: ['./layout-bootstrap.component.scss']
})
export class LayoutBootstrapComponent implements OnInit {



  constructor(
    private apiService: ApiService,
    private stateManagerService: StateManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,


  ) { }

  ngOnInit(): void {


    this.activatedRoute.queryParamMap.pipe(
      first(),
      // map(_ => _?.get('appid')),
      // map(_ => this.apiService.getApplicationById(_)),
      // switchMap(_ => _),

    ).subscribe(params => {

      console.log('filterid_prioirity.', params)

      if (params.has('appid')) {
        this.stateManagerService.setAppId(params.get('appid'),  this.apiService, this.router , null );
        console.log('filterid_prioirity', 'appid');

      } else if (params.has('projectid')) {
        this.stateManagerService.setProjectId(params.get('projectid'),  this.apiService, this.router , null);
        console.log('filterid_prioirity', 'projectid');


      } else if (params.has('businessid')) {
        this.stateManagerService.setBusinessId(params.get('businessid'),this.apiService, this.router , null);
        console.log('filterid_prioirity', 'businessid');
        
      }


    });

  }



}
