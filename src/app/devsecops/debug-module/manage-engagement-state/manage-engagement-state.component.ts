import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { EngagementService } from '../../engagement.service';
import { Subscription, map, mergeMap, of, switchMap, take } from 'rxjs';
import { EngagementState } from 'src/environments/constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-engagement-state',

  templateUrl: './manage-engagement-state.component.html',
  styleUrl: './manage-engagement-state.component.scss'
})
export class ManageEngagementStateComponent implements OnInit {







  currentState = new FormControl();


  // [  [ STATE , Next Button Text  ]  ]
  states = [
    EngagementState.DRAFT,
    EngagementState.OPEN,
    EngagementState.IN_PROGRESS,
    // EngagementState.PENDING_REVIEW,
    EngagementState.UNDER_REVIEW,
    EngagementState.ACCEPTED,
    EngagementState.REJECTED,
    EngagementState.CLOSED,
    EngagementState.ARCHIVED,
  ]

  constructor(
    private apiService: ApiService,
    private engagementService: EngagementService,
  ) {


  }



  subscription = Subscription.EMPTY;
  setupSubscriptions() {

    this.subscription.unsubscribe();
    this.subscription = this.currentState.valueChanges
      .pipe(
        switchMap(state => {
          return this.engagementService.activeEngagement.pipe(

            take(1),
            switchMap(

              _ => {

                return this.apiService.debugModifyEngagementState(_.id, state).pipe(

                  map(__ => _.id)
                )
              }


            ))
        })
        ,

      )


      .subscribe(_ => {


        console.log('boomer', _);

        this.engagementService.setActiveEngagementId(_, this.apiService)

      });
  }

  ngOnInit(): void {






    this.engagementService.activeEngagement.pipe(
      switchMap(_ => {
        return this.apiService.getEngagementDetailsById(_.id).pipe(
          map(_ => _.state)
        );
      })
    )
      .subscribe(state => {
        this.currentState.setValue(state);

        this.setupSubscriptions()
      })
  }
}

