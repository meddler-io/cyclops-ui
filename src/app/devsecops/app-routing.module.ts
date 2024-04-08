import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BootstrapComponent } from "./bootstrap/bootstrap.component";
import { AppListComponent } from "./app-list/app-list.component";
import { MainAppComponent } from "./main-app/main-app.component";
import { ConfigComponent } from "./config/config.component";
import { IntegrationComponent } from "./integration/integration.component";
import { BuildsComponent } from "./builds/builds.component";
import { ApplicationDetailsComponent } from "./application-details/application-details.component";
import { FindingsComponent } from "./findings/findings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BuildDetailViewComponent } from "./build-detail-view/build-detail-view.component";
import { EmptyViewComponent } from "./empty-view/empty-view.component";
import { NullBuildsComponent } from "./null-builds/null-builds.component";
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BusinessListComponent } from "./business-list/business-list.component";
import { SwitchAppViewerComponent } from "./switch-app-viewer/switch-app-viewer.component";
import { AppSelectorComponent } from "./app-selector/app-selector.component";
import { StaticConfigComponent } from "./static-config/static-config.component";
import { DynamicConfigComponent } from "./dynamic-config/dynamic-config.component";
import { ToolsConfigComponent } from "./tools-config/tools-config.component";
import { ActiveProtectionComponent } from "./active-protection/active-protection.component";
import { BitbucketIntegrationComponent } from "./bitbucket-integration/bitbucket-integration.component";
import { ExternalToolsRunnerComponent } from "./external-tools-runner/external-tools-runner.component";
import { LogStreamComponent } from "./log-stream/log-stream.component";
import { CreateAppComponent } from "./create-app/create-app.component";
import { AddOnToolsRunnerComponent } from "./add-on-tools-runner/add-on-tools-runner.component";
import { AssetsDnsComponent } from "./assets-dns/assets-dns.component";
import { AssetsDnsDiscoveredComponent } from "./assets-dns-discovered/assets-dns-discovered.component";
import { QuickScanJobsComponent } from "./quick-scan-jobs/quick-scan-jobs.component";
import { VaptFindingsComponent } from "./vapt-findings/vapt-findings.component";
import { ManageAppsComponent } from "./manage-apps/manage-apps.component";
import { ManageAppsSidebarComponent } from "./manage-apps-sidebar/manage-apps-sidebar.component";

import { IssuesComponent } from "./issues/issues.component";
import { AppPageComponent } from "./app-page/app-page.component";
import { LayoutBootstrapComponent } from "./layout-bootstrap/layout-bootstrap.component";
import { ManageAppSidebarComponent } from "./manage-app-sidebar/manage-app-sidebar.component";
import { ManageTeamComponent } from "./manage-team/manage-team.component";
import { AssessmentsComponent } from "./assessments/assessments.component";
import { AppsComponent } from "./apps/apps.component";
import { LayoutAppComponent } from "./layout-app/layout-app.component";
import { ManageAppDetailSidebarComponent } from "./manage-app-detail-sidebar/manage-app-detail-sidebar.component";
import { AppGeneralsettingsComponent } from "./app-generalsettings/app-generalsettings.component";
import { EngagementLayoutComponent } from "./engagement-layout/engagement-layout.component";
import { EngagementCreateFindingComponent } from "./engagement-create-finding/engagement-create-finding.component";
import { EngagementDetailsComponent } from "./engagement-details/engagement-details.component";
import { EngagementFindingsToRevalidateComponent } from "./engagement-findings-to-revalidate/engagement-findings-to-revalidate.component";
import { EngagementAssignToComponent } from "./engagement-assign-to/engagement-assign-to.component";
import { EngagementFindingsComponent } from "./engagement-findings/engagement-findings.component";
import { EngagementSelectFindingComponent } from "./engagement-select-finding/engagement-select-finding.component";
import { NextActionScreenComponent } from "./next-action-screen/next-action-screen.component";
import { FindingsSummaryBarChartComponent } from "./findings-summary-bar-chart/findings-summary-bar-chart.component";
import { EngagementSummaryStatsComponent } from "./engagement-summary-stats/engagement-summary-stats.component";




const appRoutes: Routes = [

  // Engagement specific route
  {
    path: 'engagement/:id'
    ,
    component: EngagementLayoutComponent,
    children: [

      {
        path: 'test', component: EngagementSummaryStatsComponent,
        // outlet: 'content',
       
      },

      {
        path: 'select_finding/:finding_id', component: EngagementSelectFindingComponent,
        // outlet: 'content',
       
      },


      {
        path: 'create', component: EngagementCreateFindingComponent,
        // outlet: 'content',
       
      },

      {
        path: 'draft_review', component: EngagementFindingsComponent,
        data: {
          'mode': 'active_revalidation' 
        }
        // path: 'draft_review', component: EngagementFindingsToRevalidateComponent,
        // outlet: 'content',
       
      },

      {
        path: 'findings_under_review', component: EngagementFindingsComponent,
        // path: 'draft_review', component: EngagementFindingsToRevalidateComponent,
        // outlet: 'content',
       
      },

      {
        path: 'assign_task', component: EngagementAssignToComponent,
        // outlet: 'content',
       
      },
      {
        path: 'in_progress', component: EngagementFindingsComponent,
        data: {
          'mode': 'in_progress' 
        }
        // outlet: 'content',
       
      },

      {
        path: 'details', component: EngagementDetailsComponent,
        // outlet: 'content',
       

      },

      {
        path: 'manage', component: IssuesComponent,
        // outlet: 'content'

      },

      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: '**', redirectTo: 'details', pathMatch: 'full' },

    ]
  },

  // App-specific route
  {
    path: 'application'
    ,
    component: LayoutAppComponent,
    children: [


      {
        path: 'issues', component: IssuesComponent,
        outlet: 'content'

      },


      {
        path: 'assessment', component: AssessmentsComponent,
        outlet: 'content',
        data: {
          'engagement': ''
        }

      },
      {
        path: 'assessment/sast', component: AssessmentsComponent,
        outlet: 'content',
        data: {
          'engagement': 'sast'
        }

      },

      {
        path: 'assessment/dast', component: AssessmentsComponent,
        outlet: 'content',
        data: {
          'engagement': 'dast'
        }

      },
      {
        path: 'assessment/pentest', component: AssessmentsComponent,
        outlet: 'content',
        data: {
          'engagement': 'pentest'
        }

      },

      {
        path: 'settings/general', component: AppGeneralsettingsComponent,
        outlet: 'content',

      },

      {
        path: 'manage-apps/webservice', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': 'webservice'
        }
      },
      {
        path: 'manage-apps/android', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': 'android'
        }
      },
      {
        path: 'manage-apps/ios', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': 'ios'
        }

      },
      {
        path: 'manage-apps/webapp', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': 'webapp'
        }
      },



      {
        path: 'manage-apps', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': ''
        }
      },


      {
        path: 'settings/:env', component: AppPageComponent,
        outlet: 'content'

      },

      {
        path: 'settings', redirectTo: 'settings/staging'
        , pathMatch: 'full',
        outlet: 'content'


      },


      {
        path: 'manage-apps', component: ManageAppDetailSidebarComponent,

      },





      {
        path: '', redirectTo: 'assessment', pathMatch: 'full'
        , outlet: 'content'

      }

      ,
      {
        path: '**', redirectTo: 'assessment', pathMatch: 'full'
        , outlet: 'content'

      },

      { path: '', redirectTo: 'manage-apps', pathMatch: 'full' },
      { path: '**', redirectTo: 'manage-apps', pathMatch: 'full' },





    ]




  },

  // Landing route
  {
    path: 'home'
    ,
    component: LayoutBootstrapComponent,
    children: [


      {
        path: 'issues', component: IssuesComponent,
        outlet: 'content'

      },


      {
        path: 'assessment', component: AssessmentsComponent,
        outlet: 'content'

      },

      {
        path: 'manage-team', component: ManageTeamComponent,
        outlet: 'content',

      },

      {
        path: 'manage-apps/webservice', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': 'webservice'
        }
      },
      {
        path: 'manage-apps/android', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': 'android'
        }
      },
      {
        path: 'manage-apps/ios', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': 'ios'
        }

      },
      {
        path: 'manage-apps/webapp', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': 'webapp'
        }
      },



      {
        path: 'manage-apps', component: AppsComponent,
        outlet: 'content',
        data: {
          'filter': ''
        }
      },


      {
        path: 'settings/:env', component: AppPageComponent,
        outlet: 'content'

      },

      {
        path: 'settings', redirectTo: 'settings/staging'
        , pathMatch: 'full',
        outlet: 'content'


      },


      {
        path: 'manage-apps', component: ManageAppSidebarComponent,

      },
      {
        path: 'manage-apps/app', component: ManageAppSidebarComponent,
      }

      ,


      {
        path: '', redirectTo: 'issues', pathMatch: 'full'
        , outlet: 'content'

      }

      ,
      {
        path: '**', redirectTo: 'issues', pathMatch: 'full'
        , outlet: 'content'

      },

      { path: '', redirectTo: 'manage-apps', pathMatch: 'full' },
      { path: '**', redirectTo: 'manage-apps', pathMatch: 'full' },





    ]


  },





  {
    path: 'dashboard',
    component: BootstrapComponent,
  },


  {
    path: 'configure/:app_id',
    component: BootstrapComponent,
  },

  {
    path: 'app_id',
    component: BootstrapComponent,
    children: [

      {
        path: 'dashboard',
        component: BootstrapComponent,
      },

    ]
  }
  ,

  {
    path: 'switch',
    component: AppSelectorComponent,
    pathMatch: 'full'
    , data: { no_app_selected: true }
  },

  {

    path: 'switch', component: ManageAppsSidebarComponent
  },





  {
    path: 'create',
    component: CreateAppComponent,
    pathMatch: 'full'
  },



  {
    // Deprecating app id
    path: 'test-flight',
    // path: 'configure',
    component: BootstrapComponent,
    outlet: 'primary',

    children: [

      {
        path: '', redirectTo: 'dashboard',
        pathMatch: 'full'
      },




      {
        path: 'active_protection', component: ActiveProtectionComponent
        , pathMatch: 'full'
      },


      {
        path: 'scans', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          'active_protection': true
        },
      },

      {
        path: 'external_tool_scans', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'external_tools'
            }
          }
        },
      },

      {
        path: 'external_tool_scans_new', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'external_tools_new'
            }
          }
        },
      },

      {
        path: 'external_tool_new', component: AddOnToolsRunnerComponent
        , pathMatch: 'full',
        data: {
          view_only: ['external_tools']
        },
      },

      {
        path: 'external_tool', component: ExternalToolsRunnerComponent
        , pathMatch: 'full',
        data: {
          view_only: ['external_tools']
        },
      },

      {
        path: 'external_tool_scans/:buildId', component: BuildsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'external_tools'
            }
          }
        },
      },


      {
        path: 'external_tool_scans_new/:buildId', component: BuildsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'external_tools_new'
            }
          }
        },
      },

      {
        path: 'external_tool_new', component: AddOnToolsRunnerComponent
        , pathMatch: 'full',
        data: {
          view_only: ['external_tools']
        },
      },






      {
        path: 'tools_configure', component: ToolsConfigComponent
        , pathMatch: 'full'
      },
      {
        path: 'switch', component: SwitchAppViewerComponent
        , pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateAppComponent,
        pathMatch: 'full'
      },
      {
        path: 'dashboard', component: ApplicationDetailsComponent
        , pathMatch: 'full'
      },
      {
        path: 'configure', component: ConfigComponent
        , pathMatch: 'full'
      },
      {
        path: 'builds', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            '$and': [
              {
                type_of_request: {
                  '$ne': 'external_tools'
                }
              },
              {
                type_of_request: {
                  '$ne': 'external_tools_new'
                }
              },
              {
                type_of_request: {
                  '$ne': 'recon'
                }
              }
            ]
          }
        },
      },
      {
        path: 'findings', component: FindingsComponent
        , pathMatch: 'full'
      },
      {
        path: 'reports', component: ConfigComponent
        , pathMatch: 'full'
      },
      {
        path: 'integration', component: IntegrationComponent
        , pathMatch: 'full'
      },

      {
        path: 'static_scans', component: StaticConfigComponent
        , pathMatch: 'full'
      },


      {
        path: 'dns', component: AssetsDnsComponent
        , pathMatch: 'full'
      },


      {
        path: 'assesments', component: AssessmentsComponent
        // path: 'assesments', component: VaptFindingsComponent
        , pathMatch: 'full'
      },
      {
        path: 'issues', component: IssuesComponent
        // path: 'assesments', component: VaptFindingsComponent
        , pathMatch: 'full'
      },
      {
        path: 'recon_jobs', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'recon'
            }
          }
        },
      },

      {
        path: 'recon_jobs/:buildId', component: BuildsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'recon'
            }
          }
        },
      },

      // 

      {
        path: 'quick_scan', component: QuickScanJobsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'quick_dynamic_scan'
            }
          }
        },
      },

      {
        path: 'quick_scan/:buildId', component: QuickScanJobsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'quick_dynamic_scan'
            }
          }
        },
      },

      {
        path: 'quick_scan_admin', component: QuickScanJobsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'quick_dynamic_scan'
            }
          }
        },
      },

      {
        path: 'quick_scan_admin/:buildId', component: QuickScanJobsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'quick_dynamic_scan'
            }
          }
        },
      },
      // 

      {
        path: 'dns/:asset_id', component: AssetsDnsDiscoveredComponent
        , pathMatch: 'full'
      },


      {
        path: 'dns_discovered', component: AssetsDnsDiscoveredComponent
        , pathMatch: 'full'
      },
      {
        path: 'dynamic_scans', component: DynamicConfigComponent
        , pathMatch: 'full'
      },



      {
        path: 'configure',
        component: ApplicationDetailsComponent
        , pathMatch: 'full'

      },

      {
        path: 'config',
        component: ConfigComponent
        , pathMatch: 'full'

      }

      ,

      {
        path: 'integration',
        component: IntegrationComponent
        , pathMatch: 'full'

      }
      ,


      {
        path: 'findings/:buildId',
        component: FindingsComponent
        , pathMatch: 'full'

      },

      {
        path: 'findings',
        component: FindingsComponent
        , pathMatch: 'full'

      }


      ,

      {
        path: 'manage-apps/:appid/assessment',
        component: AssessmentsComponent
        , pathMatch: 'full',

      },

      {
        path: 'manage-apps/:appid/issues',
        component: IssuesComponent
        , pathMatch: 'full',

      },
      {
        path: 'manage-apps/:appid/settings/:env',
        component: AppPageComponent
        , pathMatch: 'full',

      },

      {
        path: 'manage-apps/:appid/settings',
        redirectTo: 'manage-apps/:appid/settings/staging'
        , pathMatch: 'full',

      },

      {
        path: 'manage-apps',
        component: ManageAppsComponent
        , pathMatch: 'full',

      },



      {
        path: 'builds/nobuilds',
        component: NullBuildsComponent
        , pathMatch: 'full',

      },

      {
        path: 'bitbucket/manage',
        component: BitbucketIntegrationComponent,

      },

      {
        path: 'active_protection/:uuid',
        component: BuildsComponent,
        data: {
          'active_protection': true
        },

        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',
            data: {
              'active_protection': true
            },

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
              , data: {
                'active_protection': true
              },
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues', data: {
                'active_protection': true
              },
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full', data: {
              'active_protection': true
            },

          }
        ]

      },
      {
        path: 'scans/:buildId',
        component: BuildsComponent,
        data: {
          'active_protection': true
        },

        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',
            data: {
              'active_protection': true
            },

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
              , data: {
                'active_protection': true
              },
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues', data: {
                'active_protection': true
              },
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full', data: {
              'active_protection': true
            },

          }
        ]

      },



      {
        path: 'builds/:buildId',
        component: BuildsComponent,
        data: {
          extra_filters: {
            '$and': [
              {
                type_of_request: {
                  '$ne': 'external_tools'
                }
              },
              {
                type_of_request: {
                  '$ne': 'external_tools_new'
                }
              },
              {
                type_of_request: {
                  '$ne': 'recon'
                }
              }
            ]
          }
        },

        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ]

      },




      {
        path: 'issues',
        component: BuildsComponent,

        children: [

          {
            path: '',
            component: EmptyViewComponent
            , pathMatch: 'full',

          },


          {
            path: ':buildId',
            component: FindingsComponent
            , pathMatch: 'full'

          }
          ,
          {
            path: '**',
            redirectTo: ''
            , pathMatch: 'full'

          }
        ]

      },







      {
        path: '', redirectTo: 'configure',
        pathMatch: 'full'
        , outlet: 'sidebar'

      },

      { path: '', component: SidebarComponent, outlet: 'sidebar' },
      { path: 'manage-apps', component: ManageAppsSidebarComponent, outlet: 'sidebar' },
      { path: '**', component: SidebarComponent, redirectTo: '', outlet: 'sidebar' },

      {
        path: '**', redirectTo: 'configure',
        pathMatch: 'full'
        , outlet: 'sidebar'

      },

      {
        path: '**', redirectTo: '',
        pathMatch: 'full'


      },

      //   ]
      // },


      {
        path: '**', redirectTo: '',
        pathMatch: 'full'

      },

    ]
  },

  {
    // Deprecating app id
    path: 'app_id',
    // path: 'configure',
    component: BootstrapComponent,
    outlet: 'primary',

    children: [

      {
        path: '', redirectTo: 'dashboard',
        pathMatch: 'full'
      },




      {
        path: 'active_protection', component: ActiveProtectionComponent
        , pathMatch: 'full'
      },


      {
        path: 'scans', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          'active_protection': true
        },
      },

      {
        path: 'external_tool_scans', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'external_tools'
            }
          }
        },
      },

      {
        path: 'external_tool_scans_new', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'external_tools_new'
            }
          }
        },
      },

      {
        path: 'external_tool_new', component: AddOnToolsRunnerComponent
        , pathMatch: 'full',
        data: {
          view_only: ['external_tools']
        },
      },

      {
        path: 'external_tool', component: ExternalToolsRunnerComponent
        , pathMatch: 'full',
        data: {
          view_only: ['external_tools']
        },
      },

      {
        path: 'external_tool_scans/:buildId', component: BuildsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'external_tools'
            }
          }
        },
      },


      {
        path: 'external_tool_scans_new/:buildId', component: BuildsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'external_tools_new'
            }
          }
        },
      },

      {
        path: 'external_tool_new', component: AddOnToolsRunnerComponent
        , pathMatch: 'full',
        data: {
          view_only: ['external_tools']
        },
      },






      {
        path: 'tools_configure', component: ToolsConfigComponent
        , pathMatch: 'full'
      },
      {
        path: 'switch', component: SwitchAppViewerComponent
        , pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateAppComponent,
        pathMatch: 'full'
      },
      {
        path: 'dashboard', component: ApplicationDetailsComponent
        , pathMatch: 'full'
      },
      {
        path: 'configure', component: ConfigComponent
        , pathMatch: 'full'
      },
      {
        path: 'builds', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            '$and': [
              {
                type_of_request: {
                  '$ne': 'external_tools'
                }
              },
              {
                type_of_request: {
                  '$ne': 'external_tools_new'
                }
              },
              {
                type_of_request: {
                  '$ne': 'recon'
                }
              }
            ]
          }
        },
      },
      {
        path: 'findings', component: FindingsComponent
        , pathMatch: 'full'
      },
      {
        path: 'reports', component: ConfigComponent
        , pathMatch: 'full'
      },
      {
        path: 'integration', component: IntegrationComponent
        , pathMatch: 'full'
      },

      {
        path: 'static_scans', component: StaticConfigComponent
        , pathMatch: 'full'
      },


      {
        path: 'dns', component: AssetsDnsComponent
        , pathMatch: 'full'
      },


      {
        path: 'assesments', component: AssessmentsComponent
        // path: 'assesments', component: VaptFindingsComponent
        , pathMatch: 'full'
      },
      {
        path: 'issues', component: IssuesComponent
        // path: 'assesments', component: VaptFindingsComponent
        , pathMatch: 'full'
      },
      {
        path: 'recon_jobs', component: BuildsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'recon'
            }
          }
        },
      },

      {
        path: 'recon_jobs/:buildId', component: BuildsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'recon'
            }
          }
        },
      },

      // 

      {
        path: 'quick_scan', component: QuickScanJobsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'quick_dynamic_scan'
            }
          }
        },
      },

      {
        path: 'quick_scan/:buildId', component: QuickScanJobsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'quick_dynamic_scan'
            }
          }
        },
      },

      {
        path: 'quick_scan_admin', component: QuickScanJobsComponent
        , pathMatch: 'full',
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'quick_dynamic_scan'
            }
          }
        },
      },

      {
        path: 'quick_scan_admin/:buildId', component: QuickScanJobsComponent,
        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ],
        data: {
          extra_filters: {
            type_of_request: {
              '$eq': 'quick_dynamic_scan'
            }
          }
        },
      },
      // 

      {
        path: 'dns/:asset_id', component: AssetsDnsDiscoveredComponent
        , pathMatch: 'full'
      },


      {
        path: 'dns_discovered', component: AssetsDnsDiscoveredComponent
        , pathMatch: 'full'
      },
      {
        path: 'dynamic_scans', component: DynamicConfigComponent
        , pathMatch: 'full'
      },



      {
        path: 'configure',
        component: ApplicationDetailsComponent
        , pathMatch: 'full'

      },

      {
        path: 'config',
        component: ConfigComponent
        , pathMatch: 'full'

      }

      ,

      {
        path: 'integration',
        component: IntegrationComponent
        , pathMatch: 'full'

      }
      ,


      {
        path: 'findings/:buildId',
        component: FindingsComponent
        , pathMatch: 'full'

      },

      {
        path: 'findings',
        component: FindingsComponent
        , pathMatch: 'full'

      }


      ,

      {
        path: 'manage-apps/:appid/assessment',
        component: AssessmentsComponent
        , pathMatch: 'full',

      },

      {
        path: 'manage-apps/:appid/issues',
        component: IssuesComponent
        , pathMatch: 'full',

      },
      {
        path: 'manage-apps/:appid/settings/:env',
        component: AppPageComponent
        , pathMatch: 'full',

      },

      {
        path: 'manage-apps/:appid/settings',
        redirectTo: 'manage-apps/:appid/settings/staging'
        , pathMatch: 'full',

      },

      {
        path: 'manage-apps',
        component: ManageAppsComponent
        , pathMatch: 'full',

      },



      {
        path: 'builds/nobuilds',
        component: NullBuildsComponent
        , pathMatch: 'full',

      },

      {
        path: 'bitbucket/manage',
        component: BitbucketIntegrationComponent,

      },

      {
        path: 'active_protection/:uuid',
        component: BuildsComponent,
        data: {
          'active_protection': true
        },

        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',
            data: {
              'active_protection': true
            },

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
              , data: {
                'active_protection': true
              },
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues', data: {
                'active_protection': true
              },
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full', data: {
              'active_protection': true
            },

          }
        ]

      },
      {
        path: 'scans/:buildId',
        component: BuildsComponent,
        data: {
          'active_protection': true
        },

        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',
            data: {
              'active_protection': true
            },

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
              , data: {
                'active_protection': true
              },
            }

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues', data: {
                'active_protection': true
              },
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full', data: {
              'active_protection': true
            },

          }
        ]

      },



      {
        path: 'builds/:buildId',
        component: BuildsComponent,
        data: {
          extra_filters: {
            '$and': [
              {
                type_of_request: {
                  '$ne': 'external_tools'
                }
              },
              {
                type_of_request: {
                  '$ne': 'external_tools_new'
                }
              },
              {
                type_of_request: {
                  '$ne': 'recon'
                }
              }
            ]
          }
        },

        children: [

          {
            path: '',
            redirectTo: 'details'
            , pathMatch: 'full',

          },

          {
            path: 'logs',
            component: LogStreamComponent
            , pathMatch: 'full',
            data: {
              'section': 'logs'
            }

          },

          {
            path: 'details',
            component: BuildDetailViewComponent
            , pathMatch: 'full',
            data: {
              'section': 'details'
            }

          },
          {
            path: 'issues',
            component: FindingsComponent
            , pathMatch: 'full',
            data: {
              'section': 'issues'
            }

          },

          {
            path: '**',
            redirectTo: 'details'
            , pathMatch: 'full'

          }
        ]

      },




      {
        path: 'issues',
        component: BuildsComponent,

        children: [

          {
            path: '',
            component: EmptyViewComponent
            , pathMatch: 'full',

          },


          {
            path: ':buildId',
            component: FindingsComponent
            , pathMatch: 'full'

          }
          ,
          {
            path: '**',
            redirectTo: ''
            , pathMatch: 'full'

          }
        ]

      },







      {
        path: '', redirectTo: 'configure',
        pathMatch: 'full'
        , outlet: 'sidebar'

      },

      { path: '', component: SidebarComponent, outlet: 'sidebar' },
      { path: 'manage-apps', component: ManageAppsSidebarComponent, outlet: 'sidebar' },
      { path: '**', component: SidebarComponent, redirectTo: '', outlet: 'sidebar' },

      {
        path: '**', redirectTo: 'configure',
        pathMatch: 'full'
        , outlet: 'sidebar'

      },

      {
        path: '**', redirectTo: '',
        pathMatch: 'full'


      },

      //   ]
      // },


      {
        path: '**', redirectTo: '',
        pathMatch: 'full'

      },

    ]
  },


  {
    path: "", redirectTo: "application", pathMatch: 'full'

  },
  {
    path: "**", redirectTo: "application", pathMatch: 'full'

  },




];

@NgModule({
  imports: [RouterModule.forChild(appRoutes,),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
