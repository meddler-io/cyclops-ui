import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  applicationIntUnIntStats = this.apiService.applicationIntUnIntStats;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

}
