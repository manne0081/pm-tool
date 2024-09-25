import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PrivateService } from '../../private.service';

@Injectable({
    providedIn: 'root'
})

export class DropdownService {
    // fieldNamesForFilter?: string[];

    private openedDropdownIdSubject = new BehaviorSubject<string | null>(null);
    openedDropdownIdSubject$ = this.openedDropdownIdSubject.asObservable();

    private fieldNamesForFilter = new BehaviorSubject<any>(null);
    fieldNamesForFilter$ = this.fieldNamesForFilter.asObservable();

    // ggf. clickedButton entfernen wenn die Umstellung auf openedDropdownIdSubject gelingt
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
            this.fieldNamesForFilter.next(data);
        });
    }

    setOpenedDropdownId(clickedButtonValue: string): void {
        this.clickedButton.next(clickedButtonValue);
    }

    // Neu...
    setOpenedDropdownId2(dropdownId: string): void {
        this.openedDropdownIdSubject.next(dropdownId);
    }

    // Neu...
    getOpenedDropdownId(): Observable<string | null> {
        return this.openedDropdownIdSubject.asObservable();
    }

    setNumberFilterConditions(number: Number) {
        this.numberFilterConditions.next(number);
    }

    transformFieldNamesWithLineBreaks(fieldNames: string[]): string {
        return fieldNames.join('<br/>') || '';
    }
}
