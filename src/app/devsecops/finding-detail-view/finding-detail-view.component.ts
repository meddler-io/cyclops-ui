import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { EMPTY, map, of, shareReplay, tap } from 'rxjs';

import { ApiService } from '../api.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { NbDialogService, NbToastrService } from '@nebular/theme';


@Component({
    selector: 'app-finding-detail-view',
    templateUrl: './finding-detail-view.component.html',
    styleUrls: ['./finding-detail-view.component.scss']
})
export class FindingDetailViewComponent implements OnInit {

    @Input('finding_id') finding_id;

    finding_details = of(EMPTY);

    build_details = of(EMPTY);

    constructor(
        private apiService: ApiService,
        private nbToastrService: NbToastrService,
        private clipboard: Clipboard,
        private dialogService: NbDialogService,


    ) { }


    refreshFinding() {
        this.finding_details = this.apiService.getFindingById(this.finding_id).pipe(
            map(data => data?.data),
            tap(data => {
                this.build_details = this.apiService.getBuildById(data?.buildId?.$oid).pipe(
                    shareReplay()
                )
            })
        )
    }

    ngOnInit(): void {
        this.refreshFinding();
    }


    copyToCB(text) {
        this.clipboard.copy(text)

        this.nbToastrService.control(
            text,
            'Copied to clipboard',
        )
    }

    suppressFinding(_id, comment) {
        this.apiService.suppressFindingById(_id, {
            supressed: true,
            comment: comment
        }).subscribe(_ => {
            this.refreshFinding();

        })

    }

    resetFindingState(_id, comment) {
        this.apiService.resetStateFindingById(_id, {
            reset: true,
            comment: comment
        }).subscribe(_ => {
            this.refreshFinding();

        })
    }

    acceptRisk(_id, comment) {
        this.apiService.acceptRiskFindingById(_id, {
            accepted: true,
            comment: comment
        }).subscribe(_ => {
            this.refreshFinding();

        })

    }

    open(dialog: TemplateRef<any>, message, callback, arg) {

        console.log('dialog', dialog, callback, arg)
        this.dialogService.open(dialog, { context: message }).onClose.subscribe(_ => {
            if (!!_) {
                console.log('dialogclose', _)
                if (callback == 'acceptRisk') {
                    this.acceptRisk(arg, _)

                } else if (callback == 'suppressFinding') {
                    this.suppressFinding(arg, _)
                } else if (callback == 'resetFindingState') {
                    this.resetFindingState(arg, _)
                }







            }
        });
    }

    parseGitUrl(url: string, filePath: string, fileline: string, commitHash: string,) {




        if (url.startsWith('git@')) {
            url = 'https://' + url.split('git@')[1].replace(':', '/')
            let filename = filePath.split('/');
            let _filename = filename[filename.length - 1];
            let prefix = '/src/' + commitHash + '/';
            if (!!!commitHash) {
                url += '/src/master/' + filePath;
            } else {
                url += prefix + '/' + filePath + `#-` + fileline;

            }
        }

        return url;

    }

    goToFile(filePath, lineNo, repo, commitHash) {


        console.log(
            filePath,
            lineNo,
            repo,
            commitHash,

        )

        if (
            filePath == undefined ||
            lineNo == undefined ||
            repo == undefined ||
            commitHash == undefined

        ) {
            repo = this.parseGitUrl(repo, filePath, lineNo, commitHash);


        } else {

            repo = this.parseGitUrl(repo, filePath, lineNo, commitHash);
        }

        console.log('goToFile', repo);
        window.open(repo, '_blank');
        return repo;




    }
}
