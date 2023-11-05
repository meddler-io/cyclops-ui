import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../overlay/overlay.module';
import { OverlayService } from '../overlay/overlay.service';

import { DrawerComponent } from './drawer.component';
import { DrawerService } from './drawer.service';
import { DrawerContainerDirective } from './drawer-container.directive';
import { InjectionService } from '../injection/injection.service';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [DrawerComponent, DrawerContainerDirective],
  exports: [DrawerComponent, DrawerContainerDirective],
  providers: [DrawerService, InjectionService, OverlayService],
  imports: [CommonModule, OverlayModule , A11yModule],
})
export class DrawerModule {}
