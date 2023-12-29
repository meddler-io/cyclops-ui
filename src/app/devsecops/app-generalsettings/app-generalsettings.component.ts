import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbTagInputDirective, NbTagComponent, NbDialogService, NbSidebarService } from '@nebular/theme';
import { ApiService } from '../api.service';
import { DrawerService } from '../drawer/drawer.service';
import { StateManagerService } from '../state-manager.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-app-generalsettings',
  templateUrl: './app-generalsettings.component.html',
  styleUrls: ['./app-generalsettings.component.scss']
})
export class AppGeneralsettingsComponent {


  tags: Set<string> = new Set<string>();
  options: string[] = [];
  application;


  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;

  constructor(
    private apiService: ApiService,
    private drawerMngr: DrawerService,
    private nbSidebarService: NbSidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stateManagerService: StateManagerService,
    private dialogService: NbDialogService,



  ) { }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
    this.options.push(tagToRemove.text);
  }

  onTagAdd(value: string): void {
    if (value) {
      this.tags.add(value);
      this.options = this.options.filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }


  ngOnInit(): void {

    this.application = this.stateManagerService.activeApplicationId
      .pipe(
        filter(_ => !!_)

        ,
        map((app: any) => {
          return app?.app;
        })

      );

  }
}
