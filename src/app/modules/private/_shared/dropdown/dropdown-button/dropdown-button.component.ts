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
    @Input() dropdownId: string = '';
    @Input() buttonType: string = '';
    @Input() buttonValue: string = '';
    @Input() buttonIcon: string = '';

    hasFilterConditions: boolean = false;
    hasSortConditions: boolean = false;
    hasGroupConditions: boolean = false;

    constructor(
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        console.log(this.dropdownId);

        this.dropdownService.numberFilterConditions$.subscribe(item => {
            if(item > 0) {
                this.hasFilterConditions = true;
            } else {
                this.hasFilterConditions = false;
            }
        });
    }

    onClickButton(event: Event): void {
        // console.log('clicked:',this.dropdownId);
        event.stopPropagation();
        this.dropdownService.setOpenedDropdownId(this.dropdownId);
        this.dropdownService.setOpenedDropdownId2(this.dropdownId);
    }
}
