import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from '../../dropdown.service';

import { DropdownBaseComponent } from '../../dropdown-base/dropdown-base.component';
import { PrivateService } from '../../../../private.service';

@Component({
    selector: 'app-dropdown-data-filter',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DropdownBaseComponent,
    ],
    templateUrl: './dropdown-data-filter.component.html',
    styleUrl: './dropdown-data-filter.component.scss'
})

export class DropdownDataFilterComponent {
    @Input() elementId: string = '';
    @Input() dropdownId: string = '';
    @Input() dropdownContent: string = '';

    fieldNames?: string[];
    showDropContent: boolean = false;
    filterConditions: { index: number, label: string, name: string, condition: string, value: string } [] = [];
    private newFilterConditionIndex: number = 0;

    // searchTerm: string = '';
    // sortingTerm: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private privateService: PrivateService,
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        // console.log('ngOnInit > inputValues:',this.dropdownId, this.dropdownContent);

        this.dropdownService.getActiveDropdownId().subscribe(activeDropdownId => {
            // console.log('activeDdId und baseDdId',activeDropdownId, this.elementId);
            if (activeDropdownId === this.elementId) {
                this.showDropContent = true;  // Schließe, wenn ein anderer Dropdown aktiv ist
            } else {
                this.showDropContent = false;
            }
        });

        if (this.dropdownId === 'filter-fieldname') {
            this.privateService.getFieldNamesOfObject().subscribe(data => {
                this.fieldNames = data;
            });
        } else if (this.dropdownId === 'filter-condition') {
            this.fieldNames = ['and', 'or'];
        } else if (this.dropdownId === 'filter-operator') {
            this.fieldNames = ['contains', 'does not contain', 'is exactly', 'is not'];
        }
    }

    setShowDropdown(dropdownId: any): void {
        // console.log('showDropdownFilter?', dropdownId, this.dropdownId);

        // if (dropdownId === this.dropdownId) {
        //     this.showDropContent = true;
        // } else {
        //     this.showDropContent = false;
        // }
    }

    @HostListener('document:click', ['$event'])
    closeDropdown(event: Event): void {
        const target = event.target as HTMLElement;

        if (!target.closest('.drop-content-container')) {
            this.showDropContent = false;
        }
    }

    /**
     * Calculates the new filter-array-index and push the new condition into the filter-array
     * @param event
     */
    addCondition(event: Event): void {
        event.stopPropagation();
        this.newFilterConditionIndex++;
        this.filterConditions.push({ index: this.newFilterConditionIndex, label: 'and', name: '', condition: '', value: '' });
        // this.contentTileViewService.setNumberFilterConditions(this.filterConditions.length);
    }

    /**
     * Gets the filter-array-index and remove the from the filter-array
     * @param event
     * @param index
     */
    removeFilter(event: Event, index: number): void {
        event.stopPropagation();
        const arrayIndex = this.filterConditions.findIndex(filter => filter.index === index);
        if (arrayIndex !== -1) {
            this.filterConditions.splice(arrayIndex, 1);
        }
        this.dropdownService.setNumberFilterConditions(this.filterConditions.length);
    }
}
