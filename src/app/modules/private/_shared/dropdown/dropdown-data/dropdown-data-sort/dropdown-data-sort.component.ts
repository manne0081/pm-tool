import { Component, OnInit, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { DropdownService } from '../../dropdown.service';
import { PrivateService } from '../../../../private.service';

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
    @Input() ddBaseId: string = '';
    @Input() dropdownId: string = '';
    @Input() dropdownContent: string = '';

    clickedButtonId?: string;
    fieldNames?: string[];
    showDropContent: boolean = false;
    searchTerm: string = '';
    sortingTerm: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private privateService: PrivateService,
        private dropdownService: DropdownService,
    ) {}

    ngOnInit(): void {
        //
        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search'] || '';
            this.sortingTerm = (params['sort'] || 'asc');    // for example: 'asc', 'desc'
        });

        //
        this.dropdownService.getActiveDropdownId().subscribe(activeDropdownId => {
            if (activeDropdownId === this.ddBaseId) {
                this.showDropContent = true;
            } else {
                this.showDropContent = false;
            }
        });

        //
        if (this.dropdownId === 'sort-fieldname') {
            this.privateService.getFieldNamesOfObject().subscribe(data => {
                this.fieldNames = data;
            });
        } else {
            this.fieldNames = ['A-Z', 'Z-A'];
        }

        //
        this.dropdownService.getClickedButtonId().subscribe(data => {
            this.clickedButtonId = data;
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
    onChooseOption(selectedOption: string): void {
        console.log("clickedButtonId " + this.clickedButtonId);

        this.dropdownService.setChosenSortingOption(selectedOption, this.clickedButtonId!);
        // this.sortingTerm = option;
        // this.updateRoute();
        // this.showDropContent = false;
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
