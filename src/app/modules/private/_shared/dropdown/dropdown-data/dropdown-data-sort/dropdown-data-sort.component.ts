import { Component, OnInit, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

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
    @Input() elementId: string = '';
    @Input() dropdownId: string = '';
    @Input() dropdownContent: string = '';

    showDropContent: boolean = false;

    searchTerm: string = '';
    sortingTerm: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        console.log('dropcontent:',this.dropdownContent);

        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search'] || '';
            this.sortingTerm = (params['sort'] || 'id-asc');      // for example: 'name-asc', 'name-desc', 'id-asc', 'id-desc'
        });

        // Beobachten des Dropdown-Zustands
        this.dropdownService.getActiveDropdownId().subscribe(activeDropdownId => {
            // console.log('activeDdId und baseDdId',activeDropdownId, this.elementId);
            if (activeDropdownId === this.elementId) {
                this.showDropContent = true;  // Schließe, wenn ein anderer Dropdown aktiv ist
            } else {
                this.showDropContent = false;
            }
        });
    }

    /**
     *
     * @param dropdownId
     */
    // setShowDropdown(dropdownId: any): void {
    //     // console.log('showDropdownSort?', dropdownId, this.dropdownId);

    //     if (dropdownId === this.dropdownId) {
    //         this.showDropContent = true;
    //     } else {
    //         this.showDropContent = false;
    //     }
    // }

    /**
     *
     * @param option
     */
    onChooseOption(option: string): void {
        this.sortingTerm = option;
        this.updateRoute();
        this.showDropContent = false;
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
                // console.log('Navigation failed');
            }
        });
    }

    /**
     *
     * @param event
     */
    @HostListener('document:click', ['$event'])
    closeDropdown(event: Event): void {
        const target = event.target as HTMLElement;

        if (!target.closest('.drop-content-container')) {
            this.showDropContent = false;
        }
    }
}
