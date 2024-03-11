import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block-loading-animation',
  templateUrl: './block-loading-animation.component.html',
  styleUrls: ['./block-loading-animation.component.scss']
})
export class BlockLoadingAnimationComponent {


  @Input('caption') caption = 'Loading';
}
