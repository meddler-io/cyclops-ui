import { Component, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

import { NbDialogRef, NbDialogService, NbSortDirection, NbSortRequest, NbToggleComponent, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { EMPTY, map, startWith, switchMap, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
  selected?: boolean;
}

interface FSEntry {
  full_name: string;
  description: string;
  type: string;
  size?: number;
  selected?: boolean;

}

@Component({
  selector: 'app-bitbucket-integration',
  templateUrl: './bitbucket-integration.component.html',
  styleUrls: ['./bitbucket-integration.component.scss']
})
export class BitbucketIntegrationComponent implements OnInit {



  query = '';
  projects = this.apiService.getAllScmProjects();

  hawkiBusinesses = this.apiService.getBusinesses();
  hawkiProjects = this.apiService.getProjects();
  // 


  customColumn = 'repository';
  defaultColumns = ['project name', 'language', 'description', 'created on', 'updated on', 'total scans', 'size'];
  allColumns = ['select', '#', this.customColumn, ...this.defaultColumns, 'action'];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  repositories = new FormArray([]);

  formControlSelectAll: FormControl = new FormControl(true);
  @ViewChildren("selectCheckboxView") private selectCheckboxView: QueryList<NbToggleComponent>;


  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    public apiService: ApiService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService
  ) {

    // this.dataSource = this.dataSourceBuilder.create(this.data); 
  }

  bytesToSize(bytes: number) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    let i = parseInt("" + Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  ngOnInit(): void {

    this.formControlSelectAll.valueChanges.pipe(
      startWith(false),
      switchMap(checked => {
        return this.dataSource.connect(undefined).pipe(
          tap(_ => {
            _.forEach(_ => {
              _.data.selected = checked;
            })
          })
        )
      })

    ).subscribe();

    this.apiService.getAllScmProjects().pipe(
      map((_: []) => {

        return _.map((_: any, index: number) => {
          _['project name'] = _?.project?.name;
          _['uuid'] = _?.uuid;
          _['repository'] = _?.full_name;
          _['#'] = index + 1;
          _['created on'] = this.datePipe.transform(_?.created_on, 'dd-MM-yyyy');
          _['updated on'] = this.datePipe.transform(_?.updated_on, 'dd-MM-yyyy');
          _['size'] = this.bytesToSize(_['size']);
          _['selected'] = false;
          // _['updated on'] = _?.updated_on;
          return { data: _, children: [] }
        })

      })
    ).subscribe(_ => {
      this.dataSource = this.dataSourceBuilder.create(_);

      console.debug('getAllScmRepos', _)
    })
  }


  onChangeActiveState(event) {

  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }



  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  runScan(id) {
    console.debug(
      'runScan', id
    );

    this.apiService.runScan(id).subscribe(_ => {

      this.router.navigate(['scans'], { relativeTo: this.activatedRoute.parent })
    })
  }

  open(dialog: TemplateRef<any>, value) {
    console.log('value', value)
    this.dialogService.open(dialog, { context: { data: value } }).onClose.subscribe(_=>{
      this.query = '';
    });
  }

  saveBusiness(dialogRef: NbDialogRef<any>, uuid, businessId) {

    this.apiService.updateBitbucketMapping({
      'uuid': uuid,
      'businessId': businessId,
    })
      .pipe(

        tap(_ => {
          this.projects = EMPTY;
          this.projects = this.apiService.getAllScmProjects();
          return _;
        }),

        tap(_ => {

          dialogRef.close()
        })
      )
      .subscribe()
    // dialogRef.close()
    console.log('value', dialogRef, uuid)


  }
}

