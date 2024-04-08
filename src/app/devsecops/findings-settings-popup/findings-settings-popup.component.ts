import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FindingState } from 'src/environments/constants';
import { PopoverScrollBlockerAbstractComponent } from '../popover-scroll-blocker-abstract/popover-scroll-blocker-abstract.component';
import { NbPopoverComponent, NbPopoverDirective, NbThemeModule } from '@nebular/theme';
import { BehaviorSubject, Subject, delay, map, of, shareReplay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-findings-settings-popup',
  templateUrl: './findings-settings-popup.component.html',
  styleUrl: './findings-settings-popup.component.scss'
})
export class FindingsSettingsPopupComponent extends PopoverScrollBlockerAbstractComponent implements OnInit  , OnDestroy {


  // onclose id
  @Output('onclose') onclose = new EventEmitter();

  findingDetails$;
  loading = false;

  loadFindingDetails = new BehaviorSubject(true);

  ngOnInit(): void {
    super.ngOnInit();

    if(this.options?.length == 0){
      this.ref.hide();
    }


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



  @Input('options')
  options = []
  // new states for this version.
  // TODO: below states fpr further updates
 
  

  loading_state = undefined;

  changeState(option) {

 
    this.onclose.emit(option)
    this.ref.hide();
    
  }






}
