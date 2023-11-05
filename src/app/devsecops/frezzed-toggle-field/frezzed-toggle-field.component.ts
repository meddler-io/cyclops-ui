import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbToggleComponent } from '@nebular/theme';

@Component({
  selector: 'app-frezzed-toggle-field',
  templateUrl: './frezzed-toggle-field.component.html',
  styleUrls: ['./frezzed-toggle-field.component.scss']
})
export class FrezzedToggleFieldComponent implements OnInit {

  @ViewChild('toggleView') toggleView: NbToggleComponent;
  // dsad   : NbToggleComponent
  @Input('label') label;
  @Input('text') text;
  focus$ = false;
  // toggleIcon = "toggle-left-outline"

  constructor() { }

  ngOnInit(): void {
  }

  mouseenter() {
    this.focus$ = true;

  }

  mouseleave() {
    this.focus$ = false;
  }

  toggleState = false;

  onClick(event){

    this.toggleState = !this.toggleState;

    console.log(
      'onClick',
      event
    )
  }
}
