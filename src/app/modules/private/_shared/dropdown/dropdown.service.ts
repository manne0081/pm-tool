import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PrivateService } from '../../private.service';

@Injectable({
    providedIn: 'root'
})

export class DropdownService {
    // fieldNamesForFilter?: string[];

    private fieldNamesForFilter = new BehaviorSubject<any>(null);
    fieldNamesForFilter$ = this.fieldNamesForFilter.asObservable();

    // ggf. clickedButton entfernen wenn die Umstellung auf openedDropdownIdSubject gelingt
    private clickedButton = new BehaviorSubject<any>(null);
    clickedButton$ = this.clickedButton.asObservable();

    // neu aber vielleicht kein unterschied...
    private openedDropdownId = new BehaviorSubject<string | null>(null);
    openedDropdownId$ = this.openedDropdownId.asObservable();


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
        // console.log('id:', clickedButtonValue);
        this.clickedButton.next(clickedButtonValue);
    }

    // Neu...
    setOpenedDropdownId2(dropdownId: string): void {
        // console.log('id2:', dropdownId);
        this.openedDropdownId.next(dropdownId);
    }

    // Neu...
    getOpenedDropdownId2(): Observable<string | null> {
        return this.openedDropdownId.asObservable();
    }

    setNumberFilterConditions(number: Number) {
        this.numberFilterConditions.next(number);
    }

    transformFieldNamesWithLineBreaks(fieldNames: string[]): string {
        return fieldNames.join('<br/>') || '';
    }
}
