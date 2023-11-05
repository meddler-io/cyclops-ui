import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-frezzed-input-field',
  templateUrl: './frezzed-input-field.component.html',
  styleUrls: ['./frezzed-input-field.component.scss']
})
export class FrezzedInputFieldComponent implements OnInit {


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
}
