import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, shareReplay, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EngagementService {


  private activeEngagement$ = new Subject<{ id: string, engagement: any }>();
  activeEngagement = this.activeEngagement$.pipe(
    filter(_=>!!_),
    shareReplay())

  constructor() { }

  setActiveEngagementId(id: string, apiService: ApiService) {

    apiService.getEngagementDetailsById(id).subscribe(_ => {
      this.activeEngagement$.next({
        id: _['_id']['$oid'],
        engagement: _,
      })
    })

  }
}
