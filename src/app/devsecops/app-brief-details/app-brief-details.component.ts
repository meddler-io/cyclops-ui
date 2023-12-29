import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { StateManagerService } from '../state-manager.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-brief-details',
  templateUrl: './app-brief-details.component.html',
  styleUrls: ['./app-brief-details.component.scss']
})
export class AppBriefDetailsComponent implements OnInit {


  @Input('application_id') application_id = undefined;

  application;


  teamMembers = this.stateManagerService.activeBusinessId.pipe(

    filter(_ => !!_),
    map((business: any) => {
      return this.apiService.getTeamMembers(business.id)
    })
    ,

    switchMap(_ => _)

  )


  constructor(private apiService: ApiService, private stateManagerService: StateManagerService

  ) { }
  ngOnInit(): void {
    this.application = this.apiService.getApplicationById(this.application_id)


  }


}
