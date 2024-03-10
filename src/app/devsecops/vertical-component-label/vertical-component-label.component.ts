import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-component-label',
  templateUrl: './vertical-component-label.component.html',
  styleUrls: ['./vertical-component-label.component.scss']
})
export class VerticalComponentLabelComponent {
  @Input() label: string = 'custom-label';

  splitStringIntoChars(str: string): string[] {
    return str.split('');
  }
}
