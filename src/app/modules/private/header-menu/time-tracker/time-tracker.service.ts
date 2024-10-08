import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TimeTrackerService {
    private activeDropdown = new BehaviorSubject<string | null>(null);

    constructor() { }

    setActiveDropdown(dropdownId: string | null): void {
        this.activeDropdown.next(dropdownId);
    }

    getActiveDropdown() {
        return this.activeDropdown.asObservable();
    }

}
