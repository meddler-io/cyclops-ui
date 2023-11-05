import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, EMPTY, filter, map, Observable, of, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-activate-toggle',
  templateUrl: './activate-toggle.component.html',
  styleUrls: ['./activate-toggle.component.scss']
})
export class ActivateToggleComponent implements OnInit, AfterViewInit {

  @Input('flagName') flagName : string= 'active_state';
  active_state$ : Observable<boolean> = of(false);

  initialsed = false;
  activeState = new Subject<boolean>();
  @Output('activeState') activeState$$ = this.activeState.pipe(
    shareReplay(),
    filter(_ => this.initialsed)
  )

  updatingActiveAttribute = true;

  selectedApp: Observable<any> = of(EMPTY);

  toggleActivateAppSwitch(event) {

    this.updatingActiveAttribute = true;

    // return;
    this.selectedApp.pipe(

      filter(_ => !!_?.identifier),
      map(app => {
        return {
          businessId: app?.businessId,
          projectId: app?.projectId,
          platformId: app?.platformId,
          applicationId: app?.application?.applicationId
        }
      }),


      switchMap(appDetails => {

        return this.apiService.setDevsecopsConfigActivationFlag(appDetails, this.flagName, event)
      })
    ).subscribe(_ => {
      this.updatingActiveAttribute = false;
      this.activeState.next(event);


    })


  }

  constructor(
    private apiService: ApiService,

  ) { }
  ngOnInit(): void {
    this.initialsed = true;

    this.selectedApp = this.apiService.selectedApp.pipe(
      shareReplay()
    );

    this.active_state$ = this.selectedApp.pipe(
      map(selectedApp => {
        return selectedApp?.application?.scan_data?.configure[this.flagName] || false;
      })
      ,

      shareReplay(),

      tap(state => {
        if (state == undefined)
          this.activeState.next(false);
        else
          this.activeState.next(state);

      })
    );

    this.updatingActiveAttribute = false;

  }

  ngAfterViewInit(): void {

 
  }

}
