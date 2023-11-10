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
import { AssessmentsComponent } from "./assessments/assessments.component";
import { IssuesComponent } from "./issues/issues.component";
import { AppPageComponent } from "./app-page/app-page.component";




const appRoutes: Routes = [

  {
    path: 'test',
    component: CreateAppComponent,
  },

  {
    path: ''
    ,
    redirectTo: "switch"
    ,
    pathMatch: 'full',

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
    path: '',
    component: BusinessListComponent,
    pathMatch: 'full'
  }
  ,
  {
    path: 'switch',
    component: AppSelectorComponent,
    pathMatch: 'full'
    , data: { no_app_selected: true }
  },




  {
    path: 'create',
    component: CreateAppComponent,
    pathMatch: 'full'
  },




  {
    path: ':app_id',
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
        path: 'manage-apps/:appid/:env',
        component: AppPageComponent
        , pathMatch: 'full',

      },
 
      {
        path: 'manage-apps/:appid',
        redirectTo: 'manage-apps/:appid/development'
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
      { path: '**', component: SidebarComponent, redirectTo: '',   outlet: 'sidebar' },

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
    path: "**", redirectTo: "devsec/switch"

  },



];

@NgModule({
  imports: [RouterModule.forChild(appRoutes,),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
