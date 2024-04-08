import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FindingState } from 'src/environments/constants';
import { PopoverScrollBlockerAbstractComponent } from '../popover-scroll-blocker-abstract/popover-scroll-blocker-abstract.component';
import { NbPopoverComponent, NbPopoverDirective, NbThemeModule } from '@nebular/theme';
import { BehaviorSubject, Subject, delay, map, of, shareReplay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-change-finding-state',

  templateUrl: './change-finding-state.component.html',
  styleUrl: './change-finding-state.component.scss'
})
export class ChangeFindingStateComponent extends PopoverScrollBlockerAbstractComponent implements OnInit  , OnDestroy {


  // onclose id
  @Output('onclose') onclose = new EventEmitter();

  findingDetails$;
  loading = false;

  loadFindingDetails = new BehaviorSubject(true);

  ngOnInit(): void {
    super.ngOnInit();
    this.findingDetails$ = this.loadFindingDetails.asObservable().pipe(
      tap(_ => {
        this.loading = true
      }),
      switchMap(_ => {
        return this.apiService.getAssessmentsFindingsById(this.id).pipe(map(_ => _.data));
      })
      ,
      tap(_ => {
        this.loading = false;
      }),

      shareReplay()
    ) // 
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.onclose.next(this.id);
      
  }


  test() {
    console.log('dasdsa', this.ref);
  }
  @Input('ref') ref;
  @Input('id') id;
  @Input('engagement_id') engagement_id;
  // 
  @Input('mode') mode = 'claim'; // claim , review ;



  states = [

    {
      title: 'Not Fixed',
      value: FindingState.OPEN,
    },
    {
      title: 'Fixed',
      value: FindingState.CLOSED,

    },

  ]
  // new states for this version.
  // TODO: below states fpr further updates
  $states$ = [

    {
      title: 'Open',
      value: FindingState.OPEN,
    },

    // 
    {
      title: 'Mitigated',
      value: FindingState.MITiGATED,
    },
    {
      title: 'Resolved',
      value: FindingState.RESOLVED,
    },
    {
      title: 'False Positive',
      value: FindingState.FALSE_POSITIVE,

    },
    {
      title: 'Deferred',
      value: FindingState.DEFERRED,

    },
    {
      title: 'Closed',
      value: FindingState.CLOSED,

    },

  ]

  loading_state = undefined;

  changeState(state: FindingState) {

    if (this.loading_state) {
      return;
    }

    of(true).pipe(
      tap(_ => {
        console.log('changeState', this.loading_state)

        this.loading_state = state;
      })
      ,
      // delay(1000)
      // ,
      switchMap(_ => {


        if (this.mode == 'claim') {
          return this.apiService.updateFindingClaimState(this.engagement_id, this.id, state).pipe(map(_ => _.data));

        }
        if (this.mode == 'review') {
          return this.apiService.updateFindingState(this.engagement_id, this.id, state).pipe(map(_ => _.data));

        }


        return this.apiService.updateFindingState(this.engagement_id, this.id, state).pipe(map(_ => _.data));
        // this.apiService.updateFindingClaimState(this.engagement_id, this.id, state).subscribe();


      }),
      tap(_ => {

        this.loading_state = undefined;
        this.loadFindingDetails.next(true);

      })
      ,
      delay(300)

    ).subscribe(() => {

      console.log('closingref')
      this.ref.hide()
    })
  }







}
