import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PrivateService } from '../../private.service';

@Injectable({
    providedIn: 'root'
})

export class ContentHeaderService {
    private activeDropdown = new BehaviorSubject<string | null>(null);

    constructor(
        private privateService: PrivateService,
    ) {
        this.privateService.getFieldNamesOfObject().subscribe(data => {
            console.log('fieldnames:', data);
        });
    }

    setActiveDropdown(dropdownId: string | null): void {
        // console.log('test:',dropdownId);
        this.activeDropdown.next(dropdownId);
    }

    getActiveDropdown() {
        return this.activeDropdown.asObservable();
    }
}
