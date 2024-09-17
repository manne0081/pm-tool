import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Quicklinks, QUICKLINKS_MOCK } from '../../../mocks/quicklinks-mock';
import { PrivateService } from '../private.service';

@Injectable({
    providedIn: 'root'
})

export class QuicklinksService {
    private selectedQuicklinkSource = new Subject<Quicklinks>();
    selectedQuicklink$ = this.selectedQuicklinkSource.asObservable();

    constructor(
        private privateService: PrivateService,
    ) { }

    getQuicklinks(): Observable<Quicklinks[]> {
        return of(QUICKLINKS_MOCK);
    }

    onSelectQuicklink(item: Quicklinks) {
        this.privateService.onSelectQuicklink(item);
    }
}
