import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, filter, finalize, map, Subject, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'app-engagement-assign-to',
  templateUrl: './engagement-assign-to.component.html',
  styleUrls: ['./engagement-assign-to.component.scss']
})
export class EngagementAssignToComponent implements OnInit {


  loadData$ = new BehaviorSubject(undefined);


  teamMembers = this.loadData$.asObservable().pipe(
    switchMap(markedId => {
      return this.engagementService.activeEngagement.pipe(
        delay(500),

        switchMap(_ => {


          return this.apiService.getResourcesForEngagement(_.id);
        })
        ,


      )

    }



    )

    ,
    tap(() => {

      this.assignedResourcesLoading.clear();

      // Additional actions or logging can be done here
    })

  )

  assignedResourcesLoading = new Set()

  constructor(private apiService: ApiService, private engagementService: EngagementService) {

  }
  ngOnInit(): void {


  }


  loadData(resource_id) {

    this.loadData$.next(resource_id);


  }

  isReadOnly = false;

  toggleManagement() {
    this.isReadOnly = !this.isReadOnly;

  }

  markSelect(resource_id, pull) {

    if (this.assignedResourcesLoading.has(resource_id)) {
      return;
    }

    this.assignedResourcesLoading.add(resource_id);

    this.engagementService.activeEngagement.pipe(

      delay(500),
      switchMap(_ => {

        return this.apiService.assignResourcesToEngagement(_.id, resource_id, pull);
      })
    ).subscribe(_ => {
      if (_?.status == true) {
        this.loadData(resource_id);

        this.assignedResourcesLoading.delete(resource_id);


      }
    })



    return;

  }

}


