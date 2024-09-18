import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { DropdownService } from '../../dropdown.service';

@Component({
    selector: 'app-dropdown-data-sort',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './dropdown-data-sort.component.html',
    styleUrl: './dropdown-data-sort.component.scss'
})

export class DropdownDataSortComponent implements OnInit {
    showDropContent: boolean = false;

    searchTerm: string = '';
    sortingTerm: string = '';

    constructor(
        private router: Router,
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        this.dropdownService.clickedButton$.subscribe(item => {
            this.setShowDropdown(item);
        });
    }

    setShowDropdown(dropdownId: any): void {
        if (dropdownId === 'sort') {
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

    onChooseOption(option: string): void {
        console.log(option);
        this.sortingTerm = option;
        this.updateRoute();
    }

    /**
     * Change the route, so you can set this as quicklink
     */
    updateRoute(): void {
        this.router.navigate([], {
            queryParams: { search: this.searchTerm, sort: this.sortingTerm },
            queryParamsHandling: 'merge',
        }).then(success => {
            if (success) {
                // console.log('Navigation successful');
            } else {
                console.log('Navigation failed');
            }
        });
    }
}
