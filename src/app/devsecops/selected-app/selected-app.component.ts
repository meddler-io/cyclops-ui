import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-selected-app',
  templateUrl: './selected-app.component.html',
  styleUrls: ['./selected-app.component.scss']
})
export class SelectedAppComponent implements OnInit {

  selectedApp = this.apiService.selectedApp.pipe(  )

  constructor(
    private apiService: ApiService

  ) { }

  ngOnInit(): void {
  }

}
