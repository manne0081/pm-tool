import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from '../../dropdown.service';

import { DropdownBaseComponent } from '../../dropdown-base/dropdown-base.component';

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
    @Input() dropdownId: string = '';
    @Input() dropdownContent: string = '';

    showDropContent: boolean = false;
    fieldNamesForFilter?: string;
    filterConditions: { index: number, label: string, name: string, condition: string, value: string } [] = [];
    private newFilterConditionIndex: number = 0;

    // searchTerm: string = '';
    // sortingTerm: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        // console.log('ngOnInit > inputValues:',this.dropdownId, this.dropdownContent);

        this.dropdownService.clickedButton$.subscribe(item => {
            this.setShowDropdown(item);
        });

        this.dropdownService.fieldNamesForFilter$.subscribe(data => {
            this.fieldNamesForFilter = this.dropdownService.transformFieldNamesWithLineBreaks(data);
        });
    }

    setShowDropdown(dropdownId: any): void {
        // console.log('showDropdownFilter?', dropdownId, this.dropdownId);

        if (dropdownId === this.dropdownId) {
            this.showDropContent = true;
        } else {
            this.showDropContent = false;
        }
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
