import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ContentHeaderService {
    private activeDropdown = new BehaviorSubject<string | null>(null);

    constructor() { }

    setActiveDropdown(dropdownId: string | null): void {
        // console.log('test:',dropdownId);
        this.activeDropdown.next(dropdownId);
    }

    getActiveDropdown() {
        return this.activeDropdown.asObservable();
    }
}
