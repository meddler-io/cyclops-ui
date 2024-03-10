import { Directive, Input, ElementRef, Renderer2, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AnimationBuilder, animate, style } from '@angular/animations';


@Directive({
  selector: '[appSlideInAnimation]'
})
export class SlideInAnimationDirective {

  @Input() triggerCondition: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2, private animationBuilder: AnimationBuilder) {


  }

  ngOnInit() {


    if (this.triggerCondition) {
      this.applyAnimation();
    }
  }

  private applyAnimation() {
    console.log('animation');

    const animation = this.animationBuilder.build([
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 }))
    ]);

    const player = animation.create(this.el.nativeElement);
    player.play();
  }
}
