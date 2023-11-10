import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbLayoutModule, NbIconModule, NbButtonModule, NbDatepickerModule, NbTimepickerModule, NbCardModule, NbInputModule, NbListModule, NbSelectModule, NbFormFieldModule, NbSearchModule, NbTabsetModule, NbSpinnerModule, NbToastrModule, NbToastrService, NbRouteTabsetModule, NbContextMenuModule, NbPopoverModule, NbAutocompleteModule, NbDialogModule, NbAccordionModule, NbStepperModule, NbButtonGroupModule, NbSidebarModule, NbTagModule, NbToggleModule, NbUserModule, NbTreeGridModule, NbCheckboxModule, NbSidebarService } from '@nebular/theme';
import { ApiService } from './api.service';
import { AppListComponent } from './app-list/app-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { AppListItemComponent } from './app-list-item/app-list-item.component';
import { BusinessListComponent } from './business-list/business-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { MainAppComponent } from './main-app/main-app.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ConfigComponent } from './config/config.component';
import { IntegrationComponent } from './integration/integration.component';
import { BuildsComponent } from './builds/builds.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FindingsComponent } from './findings/findings.component';
import { SeverityPipe } from './severity.pipe';
import { FocusDirective } from './focus.directive';
import { DrawerModule } from './drawer/drawer.module';
import { OverlayModule } from './overlay/overlay.module';
import { FindingDetailViewComponent } from './finding-detail-view/finding-detail-view.component';
import { FindingStatsComponent } from './finding-stats/finding-stats.component';
import { BuildDetailViewComponent } from './build-detail-view/build-detail-view.component';
import { BuildItemComponent } from './build-item/build-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntUnintAppsComponent } from './int-unint-apps/int-unint-apps.component';
import { BranchValidatorService } from './branch-validator.service';
import { HamburgerIconComponent } from './hamburger-icon/hamburger-icon.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { EmptyViewComponent } from './empty-view/empty-view.component';
import { NullBuildsComponent } from './null-builds/null-builds.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { BuildProgressViewComponent } from './build-progress-view/build-progress-view.component';
import { BuildListComponent } from './build-list/build-list.component';
import { BuildLoadingAnimationComponent } from './build-loading-animation/build-loading-animation.component';
import { SwitchWorkspaceComponent } from './switch-workspace/switch-workspace.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SelectedAppComponent } from './selected-app/selected-app.component';
import { AppListSelectorComponent } from './app-list-selector/app-list-selector.component';
import { SwitchAppViewerComponent } from './switch-app-viewer/switch-app-viewer.component';
import { FrezzedInputFieldComponent } from './frezzed-input-field/frezzed-input-field.component';
import { WorkspaceChooserComponent } from './workspace-chooser/workspace-chooser.component';
import { FrezzedToggleFieldComponent } from './frezzed-toggle-field/frezzed-toggle-field.component';
import { AppScrollableItemDirective } from './app-scrollable-item.directive';
import { WorkspaceChooserFilterComponent } from './workspace-chooser-filter/workspace-chooser-filter.component';
import { AppSelectorComponent } from './app-selector/app-selector.component';

import { DynamicConfigComponent } from './dynamic-config/dynamic-config.component';
import { StaticConfigComponent } from './static-config/static-config.component';
import { GitLsRemoteComponent } from './git-ls-remote/git-ls-remote.component';
import { ToolsConfigComponent } from './tools-config/tools-config.component';
import { TextShowcaseDirective } from './text-showcase.directive';
import { TextShowcasePipe } from './text-showcase.pipe';
import { ActivateToggleComponent } from './activate-toggle/activate-toggle.component';
import { ActiveProtectionComponent, FsIconComponent } from './active-protection/active-protection.component';
import { NbRoleProvider } from '@nebular/security';
import { RoleProvider } from '../role.provider';
import { BitbucketIntegrationComponent } from './bitbucket-integration/bitbucket-integration.component';
import { SearchBusinesssPipe } from './search-businesss.pipe';
import { ExternalToolsRunnerComponent } from './external-tools-runner/external-tools-runner.component';
import { LogStreamComponent } from './log-stream/log-stream.component';
import { AuthGuard } from '../AuthGuard';
import { CreateAppComponent } from './create-app/create-app.component';
import { AddOnToolsRunnerComponent } from './add-on-tools-runner/add-on-tools-runner.component';
import { WithLoadingPipe } from './with-loading.pipe';
import { AssetsDnsComponent } from './assets-dns/assets-dns.component';
import { AssetsDnsDiscoveredComponent } from './assets-dns-discovered/assets-dns-discovered.component';
import { QuickScanJobsComponent } from './quick-scan-jobs/quick-scan-jobs.component';
import { QuickScanJobsAdminComponent } from './quick-scan-jobs-admin/quick-scan-jobs-admin.component';
import { VaptFindingsComponent } from './vapt-findings/vapt-findings.component';
import { RouterModule } from '@angular/router';
import { ManageAppsComponent } from './manage-apps/manage-apps.component';
import { ManageAppsSidebarComponent } from './manage-apps-sidebar/manage-apps-sidebar.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { StatePipe } from './state.pipe';
import { IssuesComponent } from './issues/issues.component';
import { AppPageComponent } from './app-page/app-page.component';





@NgModule({
  declarations: [FsIconComponent, BootstrapComponent, AppListComponent, AppListItemComponent, BusinessListComponent, ProjectListComponent, MainAppComponent, ConfigComponent, IntegrationComponent, BuildsComponent, ApplicationDetailsComponent, FindingsComponent, SeverityPipe, FocusDirective, FindingDetailViewComponent, FindingStatsComponent, BuildDetailViewComponent, BuildItemComponent, DashboardComponent, IntUnintAppsComponent, HamburgerIconComponent, ProgressBarComponent, EmptyViewComponent, NullBuildsComponent, SidebarMenuComponent, BuildProgressViewComponent, BuildListComponent, BuildLoadingAnimationComponent, SwitchWorkspaceComponent, SidebarComponent, SelectedAppComponent, AppListSelectorComponent, SwitchAppViewerComponent, FrezzedInputFieldComponent, WorkspaceChooserComponent, FrezzedToggleFieldComponent, AppScrollableItemDirective, WorkspaceChooserFilterComponent, AppSelectorComponent, StaticConfigComponent, DynamicConfigComponent, GitLsRemoteComponent, ToolsConfigComponent, TextShowcaseDirective, TextShowcasePipe, ActivateToggleComponent, ActiveProtectionComponent, BitbucketIntegrationComponent, SearchBusinesssPipe, ExternalToolsRunnerComponent , AddOnToolsRunnerComponent, LogStreamComponent, CreateAppComponent, WithLoadingPipe, AssetsDnsComponent, AssetsDnsDiscoveredComponent, QuickScanJobsComponent, QuickScanJobsAdminComponent, VaptFindingsComponent, ManageAppsComponent, ManageAppsSidebarComponent, AssessmentsComponent, StatePipe, IssuesComponent, AppPageComponent],
  imports: [


    
    NbLayoutModule,
    CommonModule,
    ClipboardModule,
    FlexLayoutModule,
    NbIconModule,
    NbButtonModule,
    NbDatepickerModule,
    AppRoutingModule,
    NbTimepickerModule.forRoot(),

    NbCardModule,
    NbInputModule,
    NbListModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbSearchModule,

    NbSpinnerModule,
    NbToastrModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbEvaIconsModule,


    NbRouteTabsetModule,
    NbTabsetModule,
    NbAutocompleteModule,

    DrawerModule,
    OverlayModule,
    NbDialogModule,
    NbAccordionModule,

    NbStepperModule,
    
    NbButtonGroupModule,

    NbSidebarModule
    ,

    NbTagModule,
    NbToggleModule,
    NbUserModule,

    NbTreeGridModule,

    NbCheckboxModule
    


    


  ],
  providers: [
    NbSidebarService,
    
    NbToastrService, ApiService , BranchValidatorService,
  
  
    {
      provide: NbRoleProvider, 
      useClass: RoleProvider
    },
  ]
})
export class DevsecopsModule { }
