import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { HeaderMenu, HEADERMENU_MOCK, HeaderSubMenu, HEADERSUBMENU_MOCK } from '../../../mocks/header-menu-mock';

@Injectable({
    providedIn: 'root'
})

export class HeaderMenuService {

    constructor() { }

    getHeaderMenu(): Observable<HeaderMenu[]> {
        return of(HEADERMENU_MOCK);
    }
}
