import { Component } from '@angular/core';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'app-debug-window',
  templateUrl: './debug-window.component.html',
  styleUrls: ['./debug-window.component.scss']
})
export class DebugWindowComponent {

  appId = this.stateManagerService.activeStateIds$;

  activeBusinessId = this.stateManagerService.activeBusinessId;
  activeProjectId = this.stateManagerService.activeProjectId;
  activeApplicationId = this.stateManagerService.activeApplicationId;

  constructor(private stateManagerService: StateManagerService){

  }
}
