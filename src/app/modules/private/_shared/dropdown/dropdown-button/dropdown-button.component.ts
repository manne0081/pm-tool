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
    @Input() elementId: string = '';
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
        // console.log('elementId:',this.elementId);

    }

    onClickButton(event: Event): void {
        // console.log('dropdownId:',this.dropdownId);
        event.stopPropagation();
        this.dropdownService.setActiveDropdownId(this.elementId);
    }


}
