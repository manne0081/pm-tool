import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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

export class DropdownBaseComponent {
    @Input() buttonType: string = '';           // for example:
    @Input() buttonValue: string = '';          // for example: sort, filter, group
    @Input() buttonIcon: string = '';           // for example: icon-sort, icon-filter, icon-drawer,
    @Input() dropdownContent: string = '';      // for example: sort, filter, group

}
