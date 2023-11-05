import { Component, Input, OnInit } from '@angular/core';
import { map, of } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-build-progress-view',
  templateUrl: './build-progress-view.component.html',
  styleUrls: ['./build-progress-view.component.scss']
})
export class BuildProgressViewComponent implements OnInit {


  build;

  @Input('active') active = false;

  @Input('build') set build$(build) {
    this.build = this.apiService.buildTransformerPipe(build)
  };
  constructor(
    private apiService: ApiService

  ) { }

 
  ngOnInit(): void {
  }

}
