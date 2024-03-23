import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEngagementStateComponent } from './manage-engagement-state/manage-engagement-state.component';
import { NbFormFieldModule, NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';


const components = [
  ManageEngagementStateComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    NbSelectModule,
    ReactiveFormsModule,
  ],
  exports: components
})
export class DebugModuleModule { }
