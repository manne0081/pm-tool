import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Quicklinks, QUICKLINKS_MOCK } from '../../../mocks/quicklinks-mock';

@Injectable({
    providedIn: 'root'
})

export class QuicklinksService {
    private selectedQuicklinkSource = new Subject<Quicklinks>();
    selectedQuicklink$ = this.selectedQuicklinkSource.asObservable();

    constructor() { }

    getQuicklinks(): Observable<Quicklinks[]> {
        return of(QUICKLINKS_MOCK);
    }

    onSelectQuicklink(item: Quicklinks) {
        // this.selectedQuicklinkSource.next(item);
    }
}
