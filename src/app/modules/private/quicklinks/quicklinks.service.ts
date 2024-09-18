import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

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
        const menuName = this.routerService.getObjectFromUrl();                             // To set the right content-title
        const parentName = this.dataService.findContentTitleByMenuItemName(menuName);       // To set the right menu-item as active
        // todo => parentName oder menuName stimmt noch nicht...

        const newQuicklink = {
            id: index,
            title: title,
            url: url,
            menuName: menuName,
            parentName: parentName,
        }

        console.log(newQuicklink);

        QUICKLINKS_MOCK.push(newQuicklink);
    }


}
