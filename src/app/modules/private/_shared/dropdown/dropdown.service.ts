import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PrivateService } from '../../private.service';

@Injectable({
    providedIn: 'root'
})

export class DropdownService {
    private fieldNamesForFilter = new BehaviorSubject<any>(null);
    fieldNamesForFilter$ = this.fieldNamesForFilter.asObservable();

    // ggf. clickedButton entfernen wenn die Umstellung auf openedDropdownIdSubject gelingt
    private clickedButton = new BehaviorSubject<any>(null);
    clickedButton$ = this.clickedButton.asObservable();

    private clickedButtonId = new BehaviorSubject<any>(null);

    // neu aber vielleicht kein unterschied...
    private activeDropdownId = new BehaviorSubject<string | null>(null);
    // activeDropdownId$ = this.activeDropdownId.asObservable();

    private chosenSortingOption = new BehaviorSubject<any>(null);

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
        this.privateService.getFieldNamesOfObject().subscribe(data => {
            this.fieldNamesForFilter.next(data);
        });
    }

    setClickedButtonId(clickedButtonId: string): void {
        this.clickedButtonId.next(clickedButtonId);
    }

    getClickedButtonId() {
        return this.clickedButtonId.asObservable();
    }

    setOpenedDropdownId(clickedButtonValue: string): void {
        // console.log('clickedButtonValue:', clickedButtonValue);
        this.clickedButton.next(clickedButtonValue);
    }

    /**
     *
     * @param number
     */
    setNumberFilterConditions(number: Number) {
        this.numberFilterConditions.next(number);
    }

    /**
     *
     * @returns
     */
    getNumberFilterConditions() {
        return this.numberFilterConditions.asObservable();
    }

    /**
     *
     * @param dropdownId
     */
    setActiveDropdownId(dropdownId: string | null): void {
        // console.log('setActiveDropdownId:',dropdownId);
        this.activeDropdownId.next(dropdownId);
    }

    /**
     *
     * @returns
     */
    getActiveDropdownId() {
        return this.activeDropdownId.asObservable();
    }

    setChosenSortingOption(chosenSortingOption: string, buttonId: string): void {
        if(buttonId === this.clickedButtonId.getValue()) {
            this.chosenSortingOption.next(chosenSortingOption);
        }
    }

    getChosenSortingOption() {
        return this.chosenSortingOption.asObservable();
    }

    transformFieldNamesWithLineBreaks(fieldNames: string[]): string {
        return fieldNames.join('<br/>') || '';
    }
}
