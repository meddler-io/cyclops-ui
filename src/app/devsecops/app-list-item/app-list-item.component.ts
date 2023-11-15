import { Component, HostBinding, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { filter, mergeMap, Subject } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './app-list-item.component.html',
  styleUrls: ['./app-list-item.component.scss']
})
export class AppListItemComponent implements OnInit {
  // @HostBinding('class.selected')
  // get selectedItem() {
  //   return this.selectedId == this.data._id
  // }



  test = '#000'

  @Input('index') index;
  @Input('active') active = false;


  data;
  @Input('data') set data$(app) {

    let plafromName = app?.platformName || '';
    plafromName = plafromName.toLowerCase()
    if (plafromName?.indexOf('web') >= 0) {
      app.platformTag = 'web'
    } else if (plafromName?.indexOf('android') >= 0) {
      app.platformTag = 'mobile'
    } else if (plafromName?.indexOf('ios') >= 0) {
      app.platformTag = 'mobile'
    } else {
      app.platformTag = 'unknown'
    }


    this.data = app;
  };
  @Input('selectedId') selectedId;

  @Input('integrated') integrated = false;




  @Output('click') onClickEvent = new Subject()
  constructor(
    private router: Router,
    private apiService: ApiService,
    private dialogService: NbDialogService,


  ) { }

  ngOnInit(): void {


  }

  onClick() {
    // this.onClickEvent.next()
    console.debug('onClick');
    this.selectApp(this.data)

  }

  deleteApp(ref) {
    // $event.stopPropagation(); $event.preventDefault(); 
    let appId = this.data?.application?.applicationId?.$oid;
    console.debug('deleteApp', appId, this.data)
    return this.apiService.deleteApplication(appId)
      .subscribe(_ => {

        ref?.close();
        this._reset.next(true)


      });
  }


  @Output('_reset') _reset = new Subject()



  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
      hasBackdrop: true,
      context: 'Are you sure you want to delete the application ?'
    }).onClose
      // .pipe(
      // filter(_=>_ == true)
      // ,
      // mergeMap(_=>this.deleteApp()))
      .subscribe(_ => {


      });
  }

  selectApp(app) {



    let secondary_route = {
      app_main: [
        'subcomp',
        'config'
      ]
    }


    if (!!app?.application?.scan_data) {


      secondary_route = {
        app_main: [
          'subcomp',
          'builds'
        ]
      }

    }



    if (
      !!!app?.application?.applicationId?.$oid

    )
      return

    console.log('routerselectapp', app)
    // return;


    // test-flight

    this.router.navigate(
      [
        '/devsec',
        'test-flight'

      ],
      {
        queryParams: {
          'appid': app?.application?.applicationId?.$oid
        }
      }
    )
    return;

    this.router.navigate([

      // 'app_menu',
      // '312312'

      '/',
      'devsec',
      // 'new_test',
      app?.application?.applicationId?.$oid,
      'builds'
      // '',devs
      // {
      //   outlets: {
      //     app_main: [
      //       app?.application?.applicationId?.$oid
      //     ]
      //   }
      // }

    ],
      // { relativeTo: this.activatedRoute.parent }
    )


  }
}
