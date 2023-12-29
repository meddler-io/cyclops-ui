import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-manage-app-detail-sidebar',
  templateUrl: './manage-app-detail-sidebar.component.html',
  styleUrls: ['./manage-app-detail-sidebar.component.scss']
})
export class ManageAppDetailSidebarComponent {
  constructor(
    private apiService: ApiService,
    public activatedRoute: ActivatedRoute,
    public accessChecker: NbAccessChecker,
    private router: Router

  ) { }
}
