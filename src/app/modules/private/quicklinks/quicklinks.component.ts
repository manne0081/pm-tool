import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Quicklinks } from '../../../mocks/quicklinks-mock';
import { QuicklinksService } from './quicklinks.service';


@Component({
    selector: 'app-quicklinks',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
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
    // selectedQuicklink!: Quicklinks;

    constructor(
        private router: Router,
        private quicklinkService: QuicklinksService, ) {
    }

    ngOnInit(): void {
        this.getQuicklinks();
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

    // openQuicklink(item: any): void {
    //     window.alert(item.title + " clicked!");
    //     this.router.navigate([item.url]);
    // }

    onSelectQuicklink(item: Quicklinks): void {
        // console.log(item);

        const urlParts = item.url.split('?');
        const path = urlParts[0];
        const queryParamsString = urlParts[1];

        // console.log('urlParts',urlParts, '\npath',path, '\nqueryParamsString',queryParamsString);

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

        // For sharing the selected Quicklink-Item with the private.component, to show the add-info-container
        // and to show the Content-Header and the Actions Container
        // this.onSelectQuicklink.emit(item);
        // this.quicklinkService.onSelectQuicklink(item);
    }

    onAddQuicklink(): void {
        window.alert('WIP');
    }

    openContext(item: any): void {
        window.alert("3P-Menu " + item.title + " clicked!");
    }
}
