import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

import { DropdownButtonComponent } from '../dropdown-button/dropdown-button.component';
import { DropdownDataFilterComponent } from '../dropdown-data/dropdown-data-filter/dropdown-data-filter.component';
import { DropdownDataSortComponent } from '../dropdown-data/dropdown-data-sort/dropdown-data-sort.component';

@Component({
    selector: 'app-dropdown-base',
    standalone: true,
    imports: [
        CommonModule,
        DropdownButtonComponent,
        DropdownDataFilterComponent,
        DropdownDataSortComponent,
    ],
    templateUrl: './dropdown-base.component.html',
    styleUrl: './dropdown-base.component.scss'
})

export class DropdownBaseComponent implements OnInit {
    @Input() dropdownId: string = '';           // for example: content-filter, content-sort,
    @Input() buttonType: string = '';           // for example: content-header-button, filter-dropdown,
    @Input() buttonValue: string = '';          // for example: sort, filter, group,
    @Input() buttonIcon: string = '';           // for example: icon-sort, icon-filter, icon-drawer,
    @Input() dropdownContent: string = '';      // for example: sort, filter, group,

    elementId: string = uuidv4();

    constructor() {}

    ngOnInit(): void {
        // console.log('elementId:',this.elementId);
        // console.log('dropdownId:', this.dropdownId);
        // console.log('buttonType:', this.buttonType);
        // console.log('buttonValue:', this.buttonValue);
        // console.log('buttonIcon:', this.buttonIcon);
        // console.log('dropdownContent:', this.dropdownContent);
    }
}
