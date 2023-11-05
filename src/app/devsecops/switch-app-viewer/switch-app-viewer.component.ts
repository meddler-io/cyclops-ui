import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-switch-app-viewer',
  templateUrl: './switch-app-viewer.component.html',
  styleUrls: ['./switch-app-viewer.component.scss']
})
export class SwitchAppViewerComponent implements OnInit {


  searchQuery = '';
  constructor(
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
  }

  
  dialogRef: NbDialogRef<any>;

  onClose(event){
    console.log(
      'onclose', event
    )
    this.dialogRef?.close()
  }


  openDialog(dialog: TemplateRef<any>) {



    this.dialogRef = this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      

    })

  }

}
