import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FindingState } from 'src/environments/constants';
import { PopoverScrollBlockerAbstractComponent } from '../popover-scroll-blocker-abstract/popover-scroll-blocker-abstract.component';

@Component({
  selector: 'app-change-finding-state',

  templateUrl: './change-finding-state.component.html',
  styleUrl: './change-finding-state.component.scss'
})
export class ChangeFindingStateComponent extends PopoverScrollBlockerAbstractComponent {

  states = [
    {
      'title': FindingState.OPEN
    },
    {
      'title': FindingState.CLOSED
    },

  ]

 
  

    



}
