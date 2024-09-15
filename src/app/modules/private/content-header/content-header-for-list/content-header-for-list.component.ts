import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PrivateService } from '../../private.service';

interface FilterItem {
    id: number | string;
    name: string;
}
@Component({
    selector: 'app-content-header-for-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './content-header-for-list.component.html',
    styleUrl: './content-header-for-list.component.scss'
})

export class ContentHeaderForListComponent implements OnInit {
    fieldNamesForFilter?: string[];

    searchTerm: string = '';
    sortingTerm: string = '';

    activeFilterItems: FilterItem[] = [
        // { id: 0, name: 'wip-1' },
        // { id: 1, name: 'wip-2' },
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private privateService: PrivateService,
    ) {}

    ngOnInit(): void {
        this.privateService.fieldNamesForFilter$.subscribe(data => {
            this.fieldNamesForFilter = data;
        });
    }


    // todo
    // onSearchTermChanged and handleSearchTermChange should be in the private.component
    // output from content-header to private.component...

    /**
     * Sets the searching-term for searching and showing the companies
     * @param event
     */
    onSearchTermChanged(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.searchTerm = inputElement.value;
        this.handleSearchTermChange(event);
        this.updateRoute();
    }

    /**
     *
     * @param event
     */
    handleSearchTermChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const searchTerm = inputElement.value.trim();
        const searchTermItem = this.activeFilterItems.find(item => item.id === 'searchTerm');

        if (searchTerm) {
            if (searchTermItem) {
                // Update the existing searchTerm item
                searchTermItem.name = searchTerm;
            } else {
                // Add a new searchTerm item
                this.activeFilterItems.push({ id: 'searchTerm', name: searchTerm });
            }
        } else if (searchTermItem) {
            // Remove the searchTerm item if the input is empty
            this.activeFilterItems = this.activeFilterItems.filter(item => item.id !== 'searchTerm');
        }
    }

    /**
     *
     */
    updateRoute(): void {
        console.log('Navigating with:', {
            searchTerm: this.searchTerm,
            sortingTerm: this.sortingTerm
        });
        this.router.navigate([], {
            queryParams: { searchTerm: this.searchTerm, sortingTerm: this.sortingTerm },
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
     * removes the searching-term and the additional-informations
     */
    removeSearchTerm(): void {
        this.searchTerm = '';
        this.activeFilterItems = this.activeFilterItems.filter(filterItem => filterItem.id !== 'searchTerm');
        this.updateRoute();
    }

}
