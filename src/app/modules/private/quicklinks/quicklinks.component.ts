import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule, CdkDialogContainer } from '@angular/cdk/dialog';

import { Quicklinks } from '../../../mocks/quicklinks-mock';
import { QuicklinksService } from './quicklinks.service';

import { DialogQuicklinkChangeComponent } from '../_shared/dialog/dialog-quicklink-change/dialog-quicklink-change.component';

@Component({
    selector: 'app-quicklinks',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        DragDropModule,
    ],
    templateUrl: './quicklinks.component.html',
    styleUrl: './quicklinks.component.scss'
})

export class QuicklinksComponent {
    @Output() selectedQuicklink: EventEmitter<Quicklinks> = new EventEmitter<Quicklinks>();

    quicklinkItems: Quicklinks[] = [];
    quicklinksVisible:boolean = true;
    searchTerm: string = '';
    newQuicklink?: Quicklinks;

    constructor(
        private router: Router,
        public dialog: Dialog,
        private quicklinkService: QuicklinksService, ) {
    }

    ngOnInit(): void {
        this.getQuicklinks();
        this.quicklinkService.newQuicklink$.subscribe(data => {
            this.newQuicklink = data;
        });
    }

    getQuicklinks(): void {
        this.quicklinkService.getQuicklinks().subscribe((data: Quicklinks[]) => {
            this.quicklinkItems = data;
        });
    }

    get filteredQuicklinks() {
        return this.quicklinkItems.filter(link =>
            link.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    truncateText(text: string, maxLength: number): string {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength - 3) + '...';
    }

    removeSearchTerm(): void {
        this.searchTerm = '';
    }

    moveDropdown(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.quicklinkItems, event.previousIndex, event.currentIndex);
    }

    onSelectQuicklink(item: Quicklinks): void {
        const urlParts = item.url.split('?');
        const path = urlParts[0];
        const queryParamsString = urlParts[1];

        let queryParams: Record<string, string> = {};
        if (queryParamsString) {
            queryParams = queryParamsString.split('&').reduce((params, param) => {
                const [key, value] = param.split('=');
                params[key] = value;
                return params;
            }, {}  as Record<string, string> );
        }

        this.router.navigate([path], { queryParams });
        this.quicklinkService.onSelectQuicklink(item);
    }

    onAddQuicklink(): void {
        this.quicklinkService.addNewQuicklink();
        this.openDialog(this.newQuicklink);
    }

    openContext(item: any): void {
        this.openDialog(item);
    }

    openDialog(item: any): void {
        const dialogRef = this.dialog.open<Quicklinks>(DialogQuicklinkChangeComponent, {
            width: '280px',
            data: {quicklink: item},
        });

        dialogRef.closed.subscribe((result: Quicklinks | undefined) => {
            if (result) {
                this.quicklinkService.setQuicklinks(result);
            }
        });


    }
}
