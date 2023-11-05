import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

  test = [2,2,32,32,321,312,3,123,21]
  constructor() { }

  ngOnInit(): void {
  }

}
