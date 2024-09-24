import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { PrivateService } from '../../private.service';

@Injectable({
    providedIn: 'root'
})

export class DropdownService {
    fieldNamesForFilter?: string[];

    private clickedButton = new BehaviorSubject<any>(null);
    clickedButton$ = this.clickedButton.asObservable();

    private numberFilterConditions = new BehaviorSubject<any>(null);
    numberFilterConditions$ = this.numberFilterConditions.asObservable();

    private numberSortConditions = new BehaviorSubject<any>(null);
    numberSortConditions$ = this.numberSortConditions.asObservable();

    private numberGroupConditions = new BehaviorSubject<any>(null);
    numberGroupConditions$ = this.numberGroupConditions.asObservable();

    constructor(
        private privateService: PrivateService,
    ) {
        // Read fieldNames for filter-dropdown
        this.privateService.fieldNamesForFilter$.subscribe(data => {
            this.fieldNamesForFilter = data;
        });
    }

    getFieldnameForFilter(): string[] | undefined {
        return this.fieldNamesForFilter;
    }

    setOpenedDropdownId(clickedButtonValue: string): void {
        this.clickedButton.next(clickedButtonValue);
    }

    setNumberFilterConditions(number: Number) {
        this.numberFilterConditions.next(number);
    }
}
