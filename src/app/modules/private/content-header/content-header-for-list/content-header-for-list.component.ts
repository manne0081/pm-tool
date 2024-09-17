import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PrivateService } from '../../private.service';
import { ContentHeaderService } from '../content-header.service';

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

    // Little Chips to show all filter-values
    activeFilterItems: FilterItem[] = [
        // { id: 0, name: 'wip-1' },
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private contentHeaderService: ContentHeaderService,
        private privateService: PrivateService,
    ) {}

    ngOnInit(): void {
        // Read search- and sort- parameter from url and save in variables by refresh / F5
        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search' || ''];
            this.sortingTerm = (params['sort'] || '');      // for example: 'name-asc', 'name-desc', 'id-asc', 'id-desc'
        });

        // Read fieldNames for filter-dropdown
        this.privateService.fieldNamesForFilter$.subscribe(data => {
            this.fieldNamesForFilter = data;
        });
    }

    /**
     * Will be triggert by keyup -> Make two things
     * 1. Add little filter-chips for UI
     * 2. Add parameter to url -> the object-list subscibes the url and reads the parameter
     * @param event
     */
    onSearchTermChanged(event: Event) {
        // const inputElement = event.target as HTMLInputElement;
        // this.searchTerm = inputElement.value;
        this.addSearchTerm(event);
        this.updateRoute();
    }

    /**
     *
     * @param event
     */
    onSortingTermChanged(event: Event): void {
        this.updateRoute();
    }

    /**
     * Add new searchTerms to show these as little chips
     * @param event
     */
    addSearchTerm(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const searchTerm = inputElement.value.trim();
        const searchTermItem = this.activeFilterItems.find(item => item.id === 'searchTerm');


    }

    /**
     * Change the route, so you can set this as quicklink
     */
    updateRoute(): void {
        // console.log('Navigating with:', {
        //     searchTerm: this.searchTerm,
        //     sortingTerm: this.sortingTerm
        // });

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

    /**
     * removes the searching-term and the additional-informations
     */
    removeSearchTerm(): void {
        this.searchTerm = '';
        this.activeFilterItems = this.activeFilterItems.filter(filterItem => filterItem.id !== 'searchTerm');
        this.updateRoute();
    }

}
