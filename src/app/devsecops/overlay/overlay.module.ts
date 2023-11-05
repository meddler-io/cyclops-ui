import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';

import { ResizeOverlayComponent } from './resize-overlay.component';

import { InjectionService } from '../injection/injection.service';


@NgModule({
  declarations: [OverlayComponent, ResizeOverlayComponent],
  providers: [OverlayService, InjectionService, OverlayService],
  exports: [OverlayComponent, ResizeOverlayComponent],
  imports: [CommonModule, LayoutModule],
})
export class OverlayModule {}
