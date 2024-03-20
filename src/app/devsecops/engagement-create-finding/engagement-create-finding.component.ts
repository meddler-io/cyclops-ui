import { Component, Input, OnInit } from '@angular/core';
import { first, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';
import { NbWindowRef } from '@nebular/theme';
import { NewSidebarService } from 'src/app/new-sidebar.service';

@Component({
  selector: 'app-engagement-create-finding',
  templateUrl: './engagement-create-finding.component.html',
  styleUrls: ['./engagement-create-finding.component.scss']
})
export class EngagementCreateFindingComponent implements OnInit {

  @Input('ref') ref;



  @Input('finding_id') finding_id;

  @Input('readonly') readonly = true;;

  @Input('draft') draft = false;;


  @Input('window_id') window_id;

  close(){
    this.sidebarService.closeById(this.window_id);
  }
  

  constructor(
    private apiService: ApiService,
    private engagementService: EngagementService,
    private sidebarService: NewSidebarService,


  ) { }
  ngOnInit(): void {


  }
  numericSeverity = 1;

  setSeverity(severity) {
    this.numericSeverity = severity;

  }

  oninvalidate(event){
    console.log('oninvalidate', event)
  }


}
