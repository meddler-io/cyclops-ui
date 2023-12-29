import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { StateManagerService } from '../state-manager.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent {

  teamMembers = this.stateManagerService.activeBusinessId.pipe(

    filter(_=>!!_),
    map( (business: any) => {
      return this.apiService.getTeamMembers(business.id)
    })
    ,

    switchMap(_=>_)

  )
  constructor(private apiService: ApiService, private stateManagerService: StateManagerService) {

  }

  isReadOnly = false;

  toggleManagement(){
    this.isReadOnly  = !this.isReadOnly;

  }


}
