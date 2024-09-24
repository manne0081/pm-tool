import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DropdownService {
    private clickedButton = new BehaviorSubject<any>(null);
    clickedButton$ = this.clickedButton.asObservable();

    private numberFilterConditions = new BehaviorSubject<any>(null);
    numberFilterConditions$ = this.numberFilterConditions.asObservable();

    private numberSortConditions = new BehaviorSubject<any>(null);
    numberSortConditions$ = this.numberSortConditions.asObservable();

    private numberGroupConditions = new BehaviorSubject<any>(null);
    numberGroupConditions$ = this.numberGroupConditions.asObservable();

    constructor() {
        // console.log('test', this.clickedButton.getValue());
    }

    setOpenedDropdownId(clickedButtonValue: string): void {
        this.clickedButton.next(clickedButtonValue);
    }

    setNumberFilterConditions(number: Number) {
        this.numberFilterConditions.next(number);
    }
}
