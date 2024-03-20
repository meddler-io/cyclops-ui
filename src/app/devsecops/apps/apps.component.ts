import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { BehaviorSubject, map, mergeMap, shareReplay, switchMap } from 'rxjs';
import { DrawerService } from '../drawer/drawer.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit, AfterViewInit {




  @ViewChild('appDetails', { static: false }) appDetails: TemplateRef<any>;

  filters$: BehaviorSubject<{ business_id?: string, project_id?: string }> = new BehaviorSubject({});


  applications;
  constructor(
    private apiService: ApiService,
    private router: Router

    ,
    private stateManagerService: StateManagerService
    ,
    private drawerMngr: DrawerService,
    private activatedRoute: ActivatedRoute

  ) {

  }
  ngAfterViewInit(): void {
    // this.onClickApp('5fcdc2c1373872354f234419');


  }
  ngOnInit(): void {


    this.applications = this.activatedRoute.data.pipe(map(data => {

      let platform = '';
      if ('filter' in data) {
        platform = data['filter']
      } else {

      }

      return this.stateManagerService.activeStateIds$.pipe(

        map(
          _ => {

            return this.apiService.getApplications(_?.businessId, _?.projectId, platform);
          }
        )
        ,
        switchMap(_ => _)
      );

    }

    )
      ,
      switchMap(_ => _)
    )
    //.subscribe();





    return;
    return


    this.stateManagerService.activeProjectId.subscribe((_: any) => {
      if (_?.id) {
        console.log('poop_activ_ProjectId', _);
        this.filters$.next({ project_id: _?.id })
      }
    })


    this.stateManagerService.activeBusinessId.subscribe((_: any) => {
      if (_?.id) {
        console.log('poop_activ_ProjectId business', _);
        this.filters$.next({ business_id: _?.id })
      }
    })

  }

  onClickApp(appId) {
    this.openDrawer(appId)
  }
  openDrawer(context, direction = 'left', size?, closeOnOutsideClick = true, template = this.appDetails, isRoot = true, parentContainer?: any) {



    this.drawerMngr.create({
      direction: DrawerDirection.Left,
      template,
      size,
      context: { application_id: context },
      closeOnOutsideClick,
      parentContainer,
      isRoot
    })
  }

  goToApp(app,  $event){
    $event.stopPropagation(); 
    console.log('goToApp', app , $event);


    this.router.navigate(
      [

        '/',
        'devsec',
        'application',
      ]
      ,
      {
        queryParams: {
          'appid': app._id?.$oid
        },
        queryParamsHandling: 'merge',
      }

    );


  }

}
