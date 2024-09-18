import { Component, Output, EventEmitter, HostListener, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { HeaderMenu, HEADERMENU_MOCK, HeaderSubMenu } from '../../../mocks/headerMenu-mock';
import { HeaderMenuService } from './header-menu.service';
import { PrivateService } from '../private.service';

@Component({
    selector: 'app-header-menu',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
    ],
    templateUrl: './header-menu.component.html',
    styleUrl: './header-menu.component.scss'
})

export class HeaderMenuComponent implements AfterViewInit{
    @ViewChildren('dropdownButton') buttons!: QueryList<ElementRef>;
    @ViewChildren('dropdown') dropdowns!: QueryList<ElementRef>;

    headerMenuItems: HeaderMenu[] = [];
    headerMenuSubItems: HeaderSubMenu[] = [];

    favoriteHasItems?: boolean;

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private eRef: ElementRef,
        private headerMenuService: HeaderMenuService,
        // private quicklinkService: QuicklinksService,
        // private contentTileViewService: ContentTileViewService,
    ) {}

    ngOnInit(): void {
        // Get header-items
        this.getHeaderMenuItems();
        this.getFavoriteHasItems();
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getHeaderMenuItems(): void {
        this.headerMenuService.getHeaderMenu().subscribe((data: HeaderMenu[]) => {
            this.headerMenuItems = data;
            // console.log(data);
        });
        this.headerMenuService.getHeaderSubMenu().subscribe((data: HeaderSubMenu[]) => {
            this.headerMenuSubItems = data;
            // console.log(data);
        });
    }

    /**
     *
     */
    getFavoriteHasItems(): void {
        const hasFavorite = this.headerMenuSubItems.some(item => item.parentName === 'favorite');
        this.favoriteHasItems = hasFavorite;
    }

    /**
     * Puts the ElementRef to the Button and Dropdown, needs for the HostListner for check the outside clicks
     */
    ngAfterViewInit() {
        if (this.dropdowns && this.dropdowns.toArray().length > 0) {
            this.dropdowns.forEach((dropdown, index) => {
                this.headerMenuItems[index].dropdownRef = dropdown;
            });
        } else {
            console.error('Dropdowns QueryList is not initialized or empty');
        }

        if (this.buttons && this.buttons.toArray().length > 0) {
            this.buttons.forEach((button, index) => {
                this.headerMenuItems[index].buttonRef = button;
            });
        } else {
            console.error('Buttons QueryList is not initialized or empty');
        }
    }

    /**
     * Sends the name of the current selected menu-item to the parant (private) component to show the menu-name at the content title
     * @param selectedValue
     */
    onSelectMenuItem(item: any): void {
        this.headerMenuService.onSelectMenuItem(item);
    }

    /**
     * Open the dropdown by clicking the header-menu-buttons
     * @param name
     */
    openDropdown(name: string): void {
        this.closeAllDropdowns();

        this.headerMenuItems.forEach((item) => {
            if (item.name === name) {
                if (item.name === 'favorite') {
                    if (this.favoriteHasItems) {
                        if (item.hasDropdown) {
                            item.showDropdown = true;
                        }
                    } else {
                        item.showDropdown = false;
                    }
                } else {
                    if (item.hasDropdown) {
                        item.showDropdown = true;
                    }
                }
            }
        });
    }

    /**
     * Closing all dropdowns from the header-menu
     */
    closeAllDropdowns() {
        this.headerMenuItems.forEach(item => {
            item.showDropdown = false;
        });
    }

    /**
     * Close the opened dropdowns when klicking outside of the dropdown
     * @param event
     */
    @HostListener('document:click', ['$event'])
    onClickOutsid(event: Event) {
        const target = event.target as HTMLElement;

        this.headerMenuItems.forEach(item => {
            if (item.showDropdown &&
                item.dropdownRef &&
                item.buttonRef &&
                !item.dropdownRef.nativeElement.contains(target) &&
                !item.buttonRef.nativeElement.contains(target)) {
                item.showDropdown = false;
            }
        });
    }

    /**
    * Toggle the favorites icon at the menu-sub-items and add or remove the item as favorite to the mocks
    * @param name
    */
    toggleFavorite(clickedItem: any) {
        if (clickedItem.parentName !== 'favorite') {
            if (!clickedItem.markAsFavorite) {
                // Mark the subMenuItem as favorite and add a new favorite-item to the array
                this.headerMenuService.setHeaderSubItemToFavorite(clickedItem);
                this.headerMenuService.addHeaderSubItemToFavorite(clickedItem);
                this.getFavoriteHasItems();
            } else {
                // Mark the subMenuItem as NO-favorite and remove the favorite-item from the array
                this.headerMenuService.setHeaderSubItemToFavorite(clickedItem);
                this.headerMenuService.removeSubItemFromFavorite(clickedItem);
                this.getFavoriteHasItems();
            }
        } else {
            if (clickedItem.markAsFavorite) {
                // Remove the favorite-item from the array and mark the subMenuItem as NO-favorite
                this.headerMenuService.setHeaderSubItemToFavorite(clickedItem);
                this.headerMenuService.removeSubItemFromFavorite(clickedItem);
                this.getFavoriteHasItems();
                if (!this.favoriteHasItems) {
                    this.closeAllDropdowns();
                }
            }
        }
    }

    async testFunction() {
        try {
            let response = await fetch('https://catfact.ninja/fact');
            let result = await response.json();

            console.log(result.fact);

        } catch (e) {
            console.log('Es ist ein Fehler aufgetreten! ' + e);
        }
    }
}
