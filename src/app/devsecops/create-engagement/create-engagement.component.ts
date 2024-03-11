import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { ApiService } from '../api.service';
import { DrawerService } from '../drawer/drawer.service';
import { StateManagerService } from '../state-manager.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { NewSidebarService } from 'src/app/new-sidebar.service';

@Component({
  selector: 'app-create-engagement',
  templateUrl: './create-engagement.component.html',
  styleUrls: ['./create-engagement.component.scss']
})
export class CreateEngagementComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('application_id') application_id = undefined;

  @ViewChild('createDast', { static: false }) createDastTemplate: TemplateRef<any>;
  @ViewChild('createSast', { static: false }) createSastTemplate: TemplateRef<any>;
  @ViewChild('createPentest', { static: false }) createPentestTemplate: TemplateRef<any>;


  constructor(
    private apiService: ApiService,
    private drawerMngr: DrawerService,

    private sidebarService: NewSidebarService,

    private nbSidebarService: NbSidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stateManagerService: StateManagerService


  ) { }
  ngOnDestroy(): void {


  }
  ngOnInit(): void {
    // this.stateManagerService.resetAllState();

  }
  ngAfterViewInit(): void {
    // this.open(this.createPentestTemplate);

  }
  open(template) {
    this.sidebarService.open(template);
    // this.openDrawer(template, {})
  }

  openDrawer(template, context, direction = 'left', size?, closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {
    this.drawerMngr.create({
      direction: DrawerDirection.Left,
      template,
      size,
      context: { finding_id: context?._id },
      closeOnOutsideClick,
      parentContainer,
      isRoot
    });
  }

  goto() {


    this.router.navigate(
      [

        '/',
        'devsec',
        'application',
      ]
      ,
      {
        queryParams: {
          'appid': this.application_id
        },
        queryParamsHandling: 'merge',
        // replaceUrl: true
        // relativeTo: this.activatedRoute.root
      }

    );


  }

}
