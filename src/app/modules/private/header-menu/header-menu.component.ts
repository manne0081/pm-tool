import { Component, Output, EventEmitter, HostListener, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

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
    // @Output() selectedMenuItem: EventEmitter<any> = new EventEmitter<any>();

    @ViewChildren('dropdownButton') buttons!: QueryList<ElementRef>;
    @ViewChildren('dropdown') dropdowns!: QueryList<ElementRef>;

    headerMenuItems: HeaderMenu[] = [];
    headerMenuSubItems: HeaderSubMenu[] = [];

    constructor (
        private router: Router,
        private eRef: ElementRef,
        private headerMenuService: HeaderMenuService,
        // private quicklinkService: QuicklinksService,
        // private contentTileViewService: ContentTileViewService,
    ) {}

    ngOnInit(): void {
        // Get all header-items
        this.getHeaderMenuItems();

        // Set Dashboard to default by app-start
        const dashboardItem = this.headerMenuItems.find(item => item.name === 'dashboard');
        // if (dashboardItem) {
        //     this.headerMenuService.onSelectMenuItem(dashboardItem);
        // } else {
        //     console.error('Dashboard item not found!');
        // }



        // this.quicklinkService.selectedQuicklink$.subscribe(item => {
        //     this.onSelectQuicklink(item);
        // });
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getHeaderMenuItems(): void {
        this.headerMenuService.getHeaderMenu().subscribe((data: HeaderMenu[]) => {
            this.headerMenuItems = data;
        });
        this.headerMenuService.getHeaderSubMenu().subscribe((data: HeaderSubMenu[]) => {
            this.headerMenuSubItems = data;
        });
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
        // this.selectedMenuItem.emit(item);

        this.headerMenuService.onSelectMenuItem(item);

        // this.contentTileViewService.setNumberFilterConditions(0);
        // todo
        // remove all filter items by changing the menu-point
    }

    /**
     *
     * @param item
     */
    onSelectQuicklink(item: any): void {
        // console.log(item);
        this.markMenuItemAsActive(item.parent);
    }

    /**
     * Open the dropdown by clicking the header-menu-buttons
     * @param name
     */
    openDropdown(name: string): void {
        this.closeAllDropdowns();

        this.headerMenuItems.forEach((item) => {
            if (item.name === name) {
                if (item.hasDropdown) {
                    item.showDropdown = true;
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
    * Toggle the favorites icon at the menu-sub-items and add or remove the item as favorite to the mocks
    * @param name
    */
    toggleFavorite(clickedItem: any) {
        if (clickedItem.parentName !== 'favorites') {
            if (!clickedItem.markAsFavorite) {
                // Mark the subMenuItem as favorite and add a new favorite-item to the array
                this.headerMenuService.setHeaderSubItemToFavorite(clickedItem);
                this.headerMenuService.addHeaderSubItemToFavorite(clickedItem);
            } else {
                // Mark the subMenuItem as NO-favorite and remove the favorite-item from the array
                this.headerMenuService.setHeaderSubItemToFavorite(clickedItem);
                this.headerMenuService.removeSubItemFromFavorite(clickedItem);
            }
        } else {
            if (clickedItem.markAsFavorite) {
                // Remove the favorite-item from the array and mark the subMenuItem as NO-favorite
                this.headerMenuService.removeSubItemFromFavorite(clickedItem);
                this.headerMenuService.setHeaderSubItemToFavorite(clickedItem);
            }
        }
    }

    /**
     * Changes the CSS-Classes from the active / pre-active / post-active menu-item
     * @param name
     */
    markMenuItemAsActive(name: string): void {
        if (name == 'searching') {
            console.log("Funktion wird unterbrochen.");
            return;
        }

        // At first, all menu-items will be resetet
        // ----------------------------------------
        this.headerMenuItems.forEach((item) => {
            item.status = '';
        });

        // Sets the status for the activated menu-item and the pre-active and the post-active elements
        // -------------------------------------------------------------------------------------------
        this.headerMenuItems.forEach((item, index) => {
            if (item.name === name) {
                // Set 'active' for the clicked item
                item.status = 'active';

                // Set 'pre-active' for the previous item if it exists
                if (index > 0) {
                    this.headerMenuItems[index - 1].status = 'pre-active';
                }

                // Set 'post-active' for the next item if it exists
                if (index < this.headerMenuItems.length - 1) {
                    this.headerMenuItems[index + 1].status = 'post-active';
                } else {
                    console.log(`Next item at index ${index + 1} does not exist.`);
                }
            }
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
