import { Component, Output, EventEmitter, HostListener, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { HeaderMenu, HeaderSubMenu } from '../../../mocks/header-menu-mock';
import { HeaderMenuService } from './header-menu.service';

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
    @Output() selectedMenuItem: EventEmitter<string> = new EventEmitter<string>();

    @ViewChildren('dropdownButton') buttons!: QueryList<ElementRef>;
    @ViewChildren('dropdown') dropdowns!: QueryList<ElementRef>;

    headerMenuItems: HeaderMenu[] = [];
    headerSubMenuItems: HeaderSubMenu[] = [];



    menuItems: { name: string, iconClass: string, hasDropdown: boolean, hasTitle: boolean, title?: string, status?: string, showDropdown?: boolean, isFavorite?: boolean, buttonRef?: ElementRef, dropdownRef?: ElementRef, hasLink: boolean, route?: string } [] = [
        { name: 'searching', iconClass: 'icon-search', hasDropdown: true, showDropdown: false, hasTitle: false, hasLink: false },
        { name: 'favorites', iconClass: 'icon-star', hasDropdown: true, showDropdown: false, hasTitle: false, status: 'pre-active', isFavorite: true, hasLink: false },
        { name: 'dashboard', iconClass: 'icon-grid', hasDropdown: false, hasTitle: true, title: 'Dashboard', status: 'active', hasLink: true, route: '/private/dashboard' },
        { name: 'workspace', iconClass: 'icon-pencilwrench', hasDropdown: true, hasTitle: true, title: 'Workspace', showDropdown: false, status: 'post-active', hasLink: false },
        { name: 'contacts', iconClass: 'icon-group', hasDropdown: true, hasTitle: true, title: 'Kontakte', showDropdown: false, hasLink: false },
        { name: 'placeholder', iconClass: '', hasDropdown: true, showDropdown: false, hasTitle: false, hasLink: false },
    ]

    menuSubItems: { parentName: string, name: string, title: string, isFavorite: boolean, route: string, parentForMenuItemState: string } [] = [
        { parentName: 'searching', name: 'searching', title: 'Test', isFavorite: false, route: '/private/searching', parentForMenuItemState: 'searching' },

        { parentName: 'workspace', name: 'task', title: 'Aufgaben', isFavorite: false, route: '/private/task', parentForMenuItemState: 'workspace' },
        { parentName: 'workspace', name: 'planner', title: 'Planner', isFavorite: false, route: '/private/planner', parentForMenuItemState: 'workspace' },
        { parentName: 'workspace', name: 'campagne', title: 'Kampagnen', isFavorite: false, route: '/private/campagne', parentForMenuItemState: 'workspace' },
        { parentName: 'workspace', name: 'email', title: 'E-Mail', isFavorite: false, route: '/private/email', parentForMenuItemState: 'workspace' },

        { parentName: 'contacts', name: 'company', title: 'Unternehmen', isFavorite: false, route: '/private/company', parentForMenuItemState: 'contacts' },
        { parentName: 'contacts', name: 'supplier', title: 'Lieferanten', isFavorite: false, route: '/private/supplier', parentForMenuItemState: 'contacts' },
        { parentName: 'contacts', name: 'contact', title: 'Ansprechpartner', isFavorite: false, route: '/private/contact', parentForMenuItemState: 'contacts' },
        { parentName: 'contacts', name: 'user', title: 'Benutzer', isFavorite: false, route: '/private/user', parentForMenuItemState: 'contacts' },
        { parentName: 'contacts', name: 'module-auth', title: 'Modulberechtigungen', isFavorite: false, route: '/private/module-auth', parentForMenuItemState: 'contacts' },
        { parentName: 'contacts', name: 'company-wiki', title: 'Unternehmens-Wiki', isFavorite: false, route: '/private/company-wiki', parentForMenuItemState: 'contacts' },
        { parentName: 'contacts', name: 'debitor-data', title: 'Debitor Daten', isFavorite: false, route: '/private/debitor-data', parentForMenuItemState: 'contacts' },
        { parentName: 'contacts', name: 'address', title: 'Adressen', isFavorite: false, route: '/private/address', parentForMenuItemState: 'contacts' },
    ]

    constructor (
        private headerMenuService: HeaderMenuService,
        private router: Router,
        private eRef: ElementRef,
        // private quicklinkService: QuicklinksService,
        // private contentTileViewService: ContentTileViewService,
    ) {}

    ngOnInit(): void {
        // Add some items to favorite for testing
        this.toggleFavorite('customer');
        this.toggleFavorite('project');

        this.getHeaderMenuItems();

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
            console.log(data);
        });
    }

    ngAfterViewInit() {
        if (this.buttons && this.buttons.toArray().length > 0) {
            this.buttons.forEach((button, index) => {
                this.menuItems[index].buttonRef = button;
            });
        } else {
            console.error('Buttons QueryList is not initialized or empty');
        }

        if (this.dropdowns && this.dropdowns.toArray().length > 0) {
            this.dropdowns.forEach((dropdown, index) => {
                this.menuItems[index].dropdownRef = dropdown;
            });
        } else {
            console.error('Dropdowns QueryList is not initialized or empty');
        }
    }

    /**
     * Open the dropdown by clicking the header-menu-buttons
     * @param name
     */
    openDropdown(name: string): void {
        console.log('headerMenu - openDropdown: ', name);
        this.closeAllDropdowns();

        this.headerMenuItems.forEach((item, index) => {
            if (item.name == name) {
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
        this.menuItems.forEach(item => {
            item.showDropdown = false;
        });
    }

    /**
    * Toggles the favorites icon at the menu-sub-items
    * @param name
    */
    toggleFavorite(name: string) {
        this.menuSubItems.forEach(item => {
            if (item.name === name) {
                // Mark the subMenuItem
                item.isFavorite = !item.isFavorite;

                // Add the subMenuItem to the favorites-array
                if (item.isFavorite) {
                    const favoriteItem = {
                        parentName: 'favorites',
                        parentForMenuItemState: item.parentName,
                        name: item.name,
                        title: item.title,
                        isFavorite: true,
                        route: item.route,
                    };
                    this.menuSubItems.push(favoriteItem);
                } else {
                    // Remove the subMenuItem from the favorites-array
                    this.menuSubItems = this.menuSubItems.filter(subItem =>
                        !(subItem.parentName === 'favorites' && subItem.name === item.name)
                    );
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

        this.menuItems.forEach(item => {
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
        this.menuItems.forEach((item) => {
            item.status = '';
        });

        // Sets the status for the activated menu-item and the pre-active and the post-active elements
        // -------------------------------------------------------------------------------------------
        this.menuItems.forEach((item, index) => {

            if (item.name === name) {
                // Set 'active' for the clicked item
                item.status = 'active';

                // Set 'pre-active' for the previous item if it exists
                if (index > 0) {
                    this.menuItems[index - 1].status = 'pre-active';
                }

                // Set 'post-active' for the next item if it exists
                if (index < this.menuItems.length - 1) {
                    this.menuItems[index + 1].status = 'post-active';
                } else {
                    console.log(`Next item at index ${index + 1} does not exist.`);
                }
            }
        });
    }

    /**
     * Sends the name of the current selected menu-item to the parant (private) component to show the menu-name at the content title
     * @param selectedValue
     */
    onSelectItem(selectedValue: string): void {
        this.selectedMenuItem.emit(selectedValue);

        // this.contentTileViewService.setNumberFilterConditions(0);
        // todo
        // remove all filter items by changing the menu-point
    }

    onSelectQuicklink(item: any): void {
        // console.log(item);
        this.markMenuItemAsActive(item.parent);
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
