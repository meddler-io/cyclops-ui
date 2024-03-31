import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-popover-scroll-blocker-abstract',
  templateUrl: './popover-scroll-blocker-abstract.component.html',
  styleUrl: './popover-scroll-blocker-abstract.component.scss'
})
export class PopoverScrollBlockerAbstractComponent {

  constructor(private elementRef: ElementRef,


    
    private renderer: Renderer2
    ) {}

  cdkOverlayElementRef;
  scrollBlockerClass = 'scroll-blocker-custom'
  addScrollBlock(){
    if (this.cdkOverlayElementRef) {
      this.renderer.addClass(this.cdkOverlayElementRef,this.scrollBlockerClass); // Add class
    }
  }

  removeScrollBlock(){
    if (this.cdkOverlayElementRef) {
      this.renderer.removeClass(this.cdkOverlayElementRef, this.scrollBlockerClass); // Remove class
    }
  }

  ngOnInit(): void {
    this.cdkOverlayElementRef = this.elementRef.nativeElement.closest('.cdk-overlay-container');
    console.log('cdkOverlayElementRef:', this.cdkOverlayElementRef);

    this.addScrollBlock()
  }
  ngOnDestroy(): void {
    let parentElement = this.elementRef.nativeElement.closest('.cdk-overlay-container');
    console.log('Parent_element:', parentElement);

    this.removeScrollBlock();
  }

}
