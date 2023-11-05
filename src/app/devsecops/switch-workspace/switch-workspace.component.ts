import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-switch-workspace',
  templateUrl: './switch-workspace.component.html',
  styleUrls: ['./switch-workspace.component.scss']
})
export class SwitchWorkspaceComponent implements OnInit {

  constructor(
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
  }


  openAppListDialog(template){
    // this.openDialog(template)
    this.dialogService.open(template, {
      dialogClass: 'sidebarNextlDilog',
      backdropClass: 'blurBackdrop',
    })
      .onClose
      .subscribe()

  }
}
