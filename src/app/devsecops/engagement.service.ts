import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, share, shareReplay, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EngagementService {


  private activeEngagement$ = new Subject<{ id: string, engagement: any }>();
  activeEngagement = this.activeEngagement$.pipe(
    filter(_=>!!_),
    shareReplay({refCount: true, bufferSize: 1})
    // share()
    )

  constructor() { }

  setActiveEngagementId(id: string, apiService: ApiService) {

    console.log('boomer set', id);

    apiService.getEngagementDetailsById(id).subscribe(_ => {
      console.log('popopopopp', id)
      this.activeEngagement$.next({
        id: _['_id']['$oid'],
        engagement: _,
      })
    })

  }
}
