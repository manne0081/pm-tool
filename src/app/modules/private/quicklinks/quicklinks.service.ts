import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { RouterService } from '../../../core/services/router.service';
import { Quicklinks, QUICKLINKS_MOCK } from '../../../mocks/quicklinks-mock';
import { PrivateService } from '../private.service';
import { DataService } from '../../../core/services/data.service';

@Injectable({
    providedIn: 'root'
})

export class QuicklinksService {
    private selectedQuicklinkSource = new Subject<Quicklinks>();
    selectedQuicklink$ = this.selectedQuicklinkSource.asObservable();

    private newQuicklink = new Subject<Quicklinks>();
    newQuicklink$ = this.newQuicklink.asObservable();

    constructor(
        private routerService: RouterService,
        private dataService: DataService,
        private privateService: PrivateService,
    ) { }

    getQuicklinks(): Observable<Quicklinks[]> {
        return of(QUICKLINKS_MOCK);
    }

    onSelectQuicklink(item: Quicklinks) {
        this.privateService.onSelectQuicklink(item);
    }

    addNewQuicklink(): void {
        const index = QUICKLINKS_MOCK.length;
        const title = 'New Quicklink';
        const url = this.routerService.getLastSegmentOfCurrentUrl();
        const menuItemName = this.routerService.getObjectFromUrl();                         // To set the right content-title
        const parentItemName = this.dataService.findParentForMenuItemState(menuItemName);       // To set the right menu-item as active

        const newQuicklink = {
            id: index,
            title: title,
            url: url,
            menuItemName: menuItemName,
            parentName: parentItemName,
        }

        QUICKLINKS_MOCK.push(newQuicklink);
        this.newQuicklink.next(newQuicklink);
    }

    setQuicklinks(quicklink: Quicklinks): void {
        const index = quicklink.id;  // Finde den Index des Quicklinks
        QUICKLINKS_MOCK[index] = { ...quicklink };
    }

}
