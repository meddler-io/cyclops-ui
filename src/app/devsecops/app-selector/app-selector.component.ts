import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-app-selector',
  templateUrl: './app-selector.component.html',
  styleUrls: ['./app-selector.component.scss']
})
export class AppSelectorComponent implements OnInit {

  constructor(
    private themeService: NbThemeService,

  ) { }

  ngOnInit(): void {
    this.themeService.changeTheme('dark');

  }

}
