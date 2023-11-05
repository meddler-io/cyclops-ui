import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';



export enum TransitionState {

  FAILED = 0,
  ENQUEUED = 1,
  EXECUTION_ENQUEUED = 2,
  EXECUTION_STARTED = 3,
  EXECUTION_FINISHED = 4,
  EXECUTION_REPORT_DOWNLOADED = 5,
  PARSING_ENQUEUED = 6,
  PARSING_STARTED = 7,
  PARSING_FINISHED = 8



}




@Component({
  selector: 'app-build-item',
  templateUrl: './build-item.component.html',
  styleUrls: ['./build-item.component.scss']
})
export class BuildItemComponent implements OnInit  {

  
  @Input('active') active;


  build;

  @Input('build') set  _build(build){

    this.build = this.apiService.buildDetailedPipe(build);
  };


  constructor(
    private apiService: ApiService
  ) { }
 

  ngOnInit(): void {


  }

  onClick(build, index) {

  }

}
