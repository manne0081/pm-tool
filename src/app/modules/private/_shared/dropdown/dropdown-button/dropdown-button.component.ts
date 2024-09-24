import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownService } from '../dropdown.service';

@Component({
    selector: 'app-dropdown-button',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './dropdown-button.component.html',
    styleUrl: './dropdown-button.component.scss'
})

export class DropdownButtonComponent {
    @Input() buttonValue: string = '';
    @Input() buttonIcon: string = '';

    haveFilterConditions: boolean = false;
    haveSortConditions: boolean = false;
    haveGroupConditions: boolean = false;

    constructor(
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        this.dropdownService.numberFilterConditions$.subscribe(item => {
            if(item > 0) {
                this.haveFilterConditions = true;
            } else {
                this.haveFilterConditions = false;
            }
        });
    }

    onClickButton(event: Event): void {
        // console.log('clicked', event);
        event.stopPropagation();
        this.dropdownService.setOpenedDropdownId(this.buttonValue);
    }
}
