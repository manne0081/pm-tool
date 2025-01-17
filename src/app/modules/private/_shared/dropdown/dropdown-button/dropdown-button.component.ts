import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

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
    @Input() ddBaseId: string = '';
    @Input() dropdownId: string = '';
    @Input() buttonType: string = '';
    @Input() buttonValue: string = '';
    @Input() buttonIcon: string = '';

    ddButtonId: string = uuidv4();

    buttonValue2: string = "";
    hasFilterConditions: boolean = false;
    hasSortConditions: boolean = false;
    hasGroupConditions: boolean = false;
    test?: string;

    constructor(
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        this.dropdownService.getClickedButtonId().subscribe(data => {
            this.test = data;
        });

        if (1===1) {
            this.dropdownService.getChosenSortingOption().subscribe(data => {
                this.buttonValue2 = data;
            });
        }   
    }

    onClickButton(event: Event): void {
        event.stopPropagation();

        this.dropdownService.setActiveDropdownId(this.ddBaseId);

        console.log("ddButtonId: " + this.ddButtonId);
        this.dropdownService.setClickedButtonId(this.ddButtonId);

    }


}
