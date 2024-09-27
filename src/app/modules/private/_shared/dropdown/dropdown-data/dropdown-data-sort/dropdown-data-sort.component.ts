import { Component, OnInit, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
        // console.log('ngOnInit > inputValues:',this.dropdownId, this.dropdownContent);

        this.dropdownService.clickedButton$.subscribe(item => {
            this.setShowDropdown(item);
        });
        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search'] || '';
            this.sortingTerm = (params['sort'] || 'id-asc');      // for example: 'name-asc', 'name-desc', 'id-asc', 'id-desc'
        });
    }

    setShowDropdown(dropdownId: any): void {
        // console.log('showDropdownSort?', dropdownId, this.dropdownId);

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
}
