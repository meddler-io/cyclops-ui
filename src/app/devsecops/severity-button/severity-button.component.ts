import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-severity-button',
  template: `
    <div [ngClass]="['severity-button', severity]">
      <span class="severity-tag">{{ severity }}</span>
      <button (click)="onClick()">{{ label }}</button>
    </div>
  `,
  styles: [`
    .severity-button {
      display: inline-block;
      padding: 8px;
      border-radius: 4px;
      margin: 4px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .info { background-color: #3498db; color: #fff; }
    .low { background-color: #2ecc71; color: #fff; }
    .medium { background-color: #f39c12; color: #fff; }
    .high { background-color: #e74c3c; color: #fff; }
    .critical { background-color: #c0392b; color: #fff; }

    .severity-tag {
      font-size: 12px;
      font-weight: bold;
      margin-right: 8px;
    }

    .severity-button:hover {
      transform: scale(1.05);
    }
  `],
})
export class SeverityButtonComponent {
  @Input() severity: 'info' | 'low' | 'medium' | 'high' | 'critical' = 'info';
  @Input() label: string = 'Button Label';

  onClick() {
    // Handle button click logic here
    console.log(`Button clicked with severity: ${this.severity}`);
  }
}
