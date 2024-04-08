import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbLayoutModule, NbIconModule, NbButtonModule, NbDatepickerModule, NbMenuModule, NbTimepickerModule, NbCardModule, NbInputModule, NbListModule, NbSelectModule, NbFormFieldModule, NbSearchModule, NbTabsetModule, NbSpinnerModule, NbToastrModule, NbToastrService, NbRouteTabsetModule, NbContextMenuModule, NbPopoverModule, NbAutocompleteModule, NbDialogModule, NbAccordionModule, NbStepperModule, NbButtonGroupModule, NbSidebarModule, NbTagModule, NbToggleModule, NbUserModule, NbTreeGridModule, NbCheckboxModule, NbSidebarService, NbActionsModule, NbBadgeModule, NbWindowModule, NbOverlayModule, NbTooltipModule } from '@nebular/theme';
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
import { LayoutBootstrapComponent } from './layout-bootstrap/layout-bootstrap.component';
import { ManageAppSidebarComponent } from './manage-app-sidebar/manage-app-sidebar.component';
import { BPSelectorComponent } from './b-p-selector/b-p-selector.component';
import { APSelectorComponent } from './a-p-selector/a-p-selector.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { DebugWindowComponent } from './debug-window/debug-window.component';

import { AppBriefDetailsComponent } from './app-brief-details/app-brief-details.component';
import { AppsComponent } from './apps/apps.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { CreateEngagementComponent } from './create-engagement/create-engagement.component';
import { CreateDastComponent } from './create-dast/create-dast.component';
import { CreateSastComponent } from './create-sast/create-sast.component';
import { CreatePentestComponent } from './create-pentest/create-pentest.component';
import { LayoutAppComponent } from './layout-app/layout-app.component';
import { ManageAppDetailSidebarComponent } from './manage-app-detail-sidebar/manage-app-detail-sidebar.component';
import { AppGeneralsettingsComponent } from './app-generalsettings/app-generalsettings.component';
import { EngagementLayoutComponent } from './engagement-layout/engagement-layout.component';
import { EngagementCreateFindingComponent } from './engagement-create-finding/engagement-create-finding.component';
import { EngagementDetailsComponent } from './engagement-details/engagement-details.component';
import { EngagementFindingsToRevalidateComponent } from './engagement-findings-to-revalidate/engagement-findings-to-revalidate.component';
import { EngagementAssignToComponent } from './engagement-assign-to/engagement-assign-to.component';
import { EngagementFindingsComponent } from './engagement-findings/engagement-findings.component';
import { EngagementSelectFindingComponent } from './engagement-select-finding/engagement-select-finding.component';
import { HighlightPipe } from './highlight.pipe';
import { EngagementStepToReproduceComponent } from './engagement-step-to-reproduce/engagement-step-to-reproduce.component';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { EngagementStepsToReproduceComponent } from './engagement-steps-to-reproduce/engagement-steps-to-reproduce.component';
import { EngagementImpactComponent } from './engagement-impact/engagement-impact.component';
import { EngagementImpactStepComponent } from './engagement-impact-step/engagement-impact-step.component';
import { EngagementFindingBasicDetailsComponent } from './engagement-finding-basic-details/engagement-finding-basic-details.component';
import { EngagementFindingCweSelectorComponent } from './engagement-finding-cwe-selector/engagement-finding-cwe-selector.component';
import { VerticalComponentLabelComponent } from './vertical-component-label/vertical-component-label.component';
import { PerformanceDebugComponent } from '../performance-debug/performance-debug.component';
import { QuillModule } from 'ngx-quill';
import { SlideInAnimationDirective } from '../slide-in-animation.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FindingsSummaryBarChartComponent } from './findings-summary-bar-chart/findings-summary-bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BlockLoadingAnimationComponent } from './block-loading-animation/block-loading-animation.component';
import { SeverityButtonComponent } from './severity-button/severity-button.component';
import { DebugModuleModule } from './debug-module/debug-module.module';
import { EngagementFindingSeverityComponent } from './engagement-finding-severity/engagement-finding-severity.component';
import { NextActionScreenComponent } from './next-action-screen/next-action-screen.component';
import { ChangeFindingStateComponent } from './change-finding-state/change-finding-state.component';
import { PopoverScrollBlockerAbstractComponent } from './popover-scroll-blocker-abstract/popover-scroll-blocker-abstract.component';
import { FindingsSettingsPopupComponent } from './findings-settings-popup/findings-settings-popup.component';
import { EngagementSummaryStatsComponent } from './engagement-summary-stats/engagement-summary-stats.component';





@NgModule({
  declarations:  [  
    FindingsSettingsPopupComponent,
    NextActionScreenComponent,

    ChangeFindingStateComponent,
    PopoverScrollBlockerAbstractComponent,
    EngagementFindingSeverityComponent,
    PerformanceDebugComponent,
    EngagementSummaryStatsComponent,

    FsIconComponent, BootstrapComponent, AppListComponent, AppListItemComponent, BusinessListComponent, ProjectListComponent, MainAppComponent, ConfigComponent, IntegrationComponent, BuildsComponent, ApplicationDetailsComponent, FindingsComponent, SeverityPipe, FocusDirective, FindingDetailViewComponent, FindingStatsComponent, BuildDetailViewComponent, BuildItemComponent, DashboardComponent, IntUnintAppsComponent, HamburgerIconComponent, ProgressBarComponent, EmptyViewComponent, NullBuildsComponent, SidebarMenuComponent, BuildProgressViewComponent, BuildListComponent, BuildLoadingAnimationComponent, SwitchWorkspaceComponent, SidebarComponent, SelectedAppComponent, AppListSelectorComponent, SwitchAppViewerComponent, FrezzedInputFieldComponent, WorkspaceChooserComponent, FrezzedToggleFieldComponent, AppScrollableItemDirective, WorkspaceChooserFilterComponent, AppSelectorComponent, StaticConfigComponent, DynamicConfigComponent, GitLsRemoteComponent, ToolsConfigComponent, TextShowcaseDirective, TextShowcasePipe, ActivateToggleComponent, ActiveProtectionComponent, BitbucketIntegrationComponent, SearchBusinesssPipe, ExternalToolsRunnerComponent , AddOnToolsRunnerComponent, LogStreamComponent, CreateAppComponent, WithLoadingPipe, AssetsDnsComponent, AssetsDnsDiscoveredComponent, QuickScanJobsComponent, QuickScanJobsAdminComponent, VaptFindingsComponent, ManageAppsComponent, ManageAppsSidebarComponent, AssessmentsComponent, StatePipe, IssuesComponent, AppPageComponent, LayoutBootstrapComponent, ManageAppSidebarComponent, BPSelectorComponent, APSelectorComponent, ManageTeamComponent, DebugWindowComponent, AppsComponent, AppBriefDetailsComponent, PaginatorComponent, CreateEngagementComponent, CreateDastComponent, CreateSastComponent, CreatePentestComponent, LayoutAppComponent, ManageAppDetailSidebarComponent, AppGeneralsettingsComponent, EngagementLayoutComponent, EngagementCreateFindingComponent, EngagementDetailsComponent, EngagementFindingsToRevalidateComponent, EngagementAssignToComponent, EngagementFindingsComponent, EngagementSelectFindingComponent, HighlightPipe, EngagementStepToReproduceComponent, EngagementStepsToReproduceComponent, EngagementImpactComponent, EngagementImpactStepComponent, EngagementFindingBasicDetailsComponent, EngagementFindingCweSelectorComponent, VerticalComponentLabelComponent, FindingsSummaryBarChartComponent, BlockLoadingAnimationComponent, SeverityButtonComponent],
  imports: [



    
    DebugModuleModule,

    NgxChartsModule,

    QuillModule.forRoot(),


    NbWindowModule.forChild(),
    NbOverlayModule,

    NbContextMenuModule,
    NbMenuModule.forRoot(),
    
    AngularMarkdownEditorModule,
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
    NbBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbSearchModule,

    NbSpinnerModule,
    NbToastrModule,
    NbPopoverModule,
    NbTooltipModule,
    NbEvaIconsModule,
    NbActionsModule,


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
