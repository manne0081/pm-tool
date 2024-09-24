import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from '../../dropdown.service';

@Component({
    selector: 'app-dropdown-data-filter',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './dropdown-data-filter.component.html',
    styleUrl: './dropdown-data-filter.component.scss'
})

export class DropdownDataFilterComponent {
    showDropContent: boolean = false;
    fieldNamesForFilter?: string[];

    searchTerm: string = '';
    sortingTerm: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        this.dropdownService.clickedButton$.subscribe(item => {
            this.setShowDropdown(item);
        });
        this.fieldNamesForFilter = this.dropdownService.getFieldnameForFilter();
    }

    setShowDropdown(dropdownId: any): void {
        if (dropdownId === 'filter') {
            this.showDropContent = true;
        } else {
            this.showDropContent = false;
        }
    }

    getFieldNamesWithLineBreaks(): string {
        return this.fieldNamesForFilter?.join('<br/>') || '';
    }

    @HostListener('document:click', ['$event'])
    closeDropdown(event: Event): void {
        const target = event.target as HTMLElement;

        if (!target.closest('.drop-content-container')) {
            this.showDropContent = false;
        }
    }
}
