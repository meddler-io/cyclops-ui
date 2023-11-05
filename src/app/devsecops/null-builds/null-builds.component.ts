import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-null-builds',
  templateUrl: './null-builds.component.html',
  styleUrls: ['./null-builds.component.scss']
})
export class NullBuildsComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  configure() {
    this.router.navigate(
      ['../../config'],
      {
        relativeTo: this.activatedRoute
      }
    )
  }

  reloadBuiilds() {
    this.router.navigate(
      ['../'],
      {
        relativeTo: this.activatedRoute
      }
    )
  }

}
