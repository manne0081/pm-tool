import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { RouterService } from '../../core/services/router.service';
import { HeaderMenu, HEADERMENU_MOCK, HEADERSUBMENU_MOCK } from '../../mocks/headerMenu-mock';

import { clientFieldNames } from '../../mocks/client-mock';
import { projectFieldNames } from '../../mocks/project-mock';
import { teamMemberFieldNames } from '../../mocks/teamMember-mock';

@Injectable({
    providedIn: 'root'
})

export class PrivateService {

    // Use to design the menuItems as active, pre-active and post-active
    private selectedMenuItem = new BehaviorSubject<string>('');
    selectedMenuItem$ = this.selectedMenuItem.asObservable();

    private selectedMenuItemTitle = new BehaviorSubject<string>('');
    selectedMenuItemTitle$ = this.selectedMenuItemTitle.asObservable();

    // Show or hide (AddInfoArea, ContentHeader, ContentActions, AddInfoArea)
    private isViewDashboard = new BehaviorSubject<boolean>(true);
    isViewDashboard$ = this.isViewDashboard.asObservable();

    // Show or hide (QuicklinksArea)
    private isQuicklinksAreaVisible = new BehaviorSubject<boolean>(true);
    isQuicklinksAreaVisible$ = this.isQuicklinksAreaVisible.asObservable();

    // Show or hide (AddInfoButton)
    private isAddInfoButtonVisible = new BehaviorSubject<boolean>(false);
    isAddInfoButtonVisible$ = this.isAddInfoButtonVisible.asObservable();

    // Show or hide (AddInfoArea)
    private isAddInfoAreaVisible = new BehaviorSubject<boolean>(false);
    isAddInfoAreaVisible$ = this.isAddInfoAreaVisible.asObservable();

    // Show the different content-headers (contentHeaderForList, contentHeaderForDetail)
    private viewType = new BehaviorSubject<string>('list');
    viewType$ = this.viewType.asObservable();

    // Fieldnames of choosen MenuObject for the filter-function at the content-header
    private fieldNamesForFilter = new BehaviorSubject<any>(undefined);
    fieldNamesForFilter$ = this.fieldNamesForFilter.asObservable();

    // Selected Object for Additional Informations
    private selectedObject = new BehaviorSubject<any>(undefined);
    selectedObject$ = this.selectedObject.asObservable();

    constructor(
        private cookieService: CookieService,
        private routerService: RouterService,
    ) {
        // this.test();

        // Manage route
        const route: string = this.routerService.getLastSegmentOfCurrentUrl();      // For example: dashboard, client, project incl. parameter
        const trimmedRoute = route.split('?');                                      // splits the route in {object} and {parameter}

        // Manage visibility
        const cookieIsAddInfoVisible: string = this.cookieService.get('isAddInfoAreaVisible');
        const cookieIsQuicklinksVisible: string = this.cookieService.get('isQuicklinkAreaVisible');

        // console.log('url-object:',trimmedRoute[0]);
        // console.log('url-parameter:',trimmedRoute[1]);

        // Mark menuItem as active when click refresh / F5
        const isMenuItemActive = HEADERMENU_MOCK.some(item => item.name === trimmedRoute[0]);
        const isSubMenuItemActive = HEADERSUBMENU_MOCK.some(item => item.name === trimmedRoute[0]);
        if (isMenuItemActive) {
            // console.log('route is MenuItem');
            this.setActiveMenuByName(HEADERMENU_MOCK, trimmedRoute[0]);
        } else if (isSubMenuItemActive) {
            // console.log('route is SubMenuItem');
            const menuSubItem = HEADERSUBMENU_MOCK.find(item => item.name === trimmedRoute[0]);
            // console.log('menuSubItem passend zu route', menuSubItem);
            const menuItem = menuSubItem!.parentForMenuItemState;
            // console.log('menuItem passend zu menuSubItem', menuItem);
            this.setActiveMenuByName(HEADERMENU_MOCK, menuItem);
        } else {
            console.log('route doesnt exist...');
        }

        // Show or hide addInfoButton when click refresh / F5
        if (trimmedRoute[0] != 'dashboard') {
            this.setIsAddInfoButtonVisible(true);
        } else {
            this.setIsAddInfoButtonVisible(false);
        }

        // Show or hide QuicklinkArea when click refresh / F5
        if (cookieIsQuicklinksVisible === 'true') {
            this.isQuicklinksAreaVisible.next(true);
        } else {
            this.isQuicklinksAreaVisible.next(false);
        }

        // Show or hide addInfoArea when click refresh / F5
        if (cookieIsAddInfoVisible === 'true' && trimmedRoute[0] !== 'dashboard') {
            this.isAddInfoAreaVisible.next(true);
        } else {
            this.isAddInfoAreaVisible.next(false);
        }

        // Show or hide content-header and content-action when
        if (trimmedRoute[0] === 'dashboard') {
            this.setIsViewDashboard(true);
        } else {
            this.setIsViewDashboard(false);
        }

        // Fieldnames for filter-function
        this.fieldNamesForFilter.next(this.getFieldNamesOfObject(trimmedRoute[0]));
    }

    test(): void {
        console.log('selectedMenuItem: ', this.selectedMenuItem.getValue());
        console.log('isViewDashboard: ', this.isViewDashboard.getValue());
        console.log('isQuicklinksAreaVisible: ', this.isQuicklinksAreaVisible.getValue());
        console.log('isAddInfoButtonVisible: ', this.isAddInfoButtonVisible.getValue());
        console.log('isAddInfoAreaVisible: ', this.isAddInfoAreaVisible.getValue());
        console.log('viewType: ', this.viewType.getValue());
    }

    // Set Cookie => With or Without duration
    setCookie(cookieName: string, cookieValue: string, duration?: number) {
        if (duration) {
            this.cookieService.set(cookieName, cookieValue, duration);
        } else {
            this.cookieService.set(cookieName, cookieValue);
        }
    }

    // Read Cookie
    getCookie(cookieName: string) {
        return this.cookieService.get(cookieName);
    }

    // Delete Cookie
    deleteCookie(cookieName: string) {
        this.cookieService.delete(cookieName);
    }

    setIsViewDashboard(isViewDashboard: boolean): void {
        this.isViewDashboard.next(isViewDashboard);
    }

    /**
     * Set isDashboard to 'true' or 'false'
     * Set visibility of AddInfoArea to 'true' or 'false'
     * Set viewType to 'list' or 'detail'
     * @param object
     */
    onSelectMenuItem (item: any): void {
        this.selectedMenuItem.next(item.name);

        if (item.name === 'dashboard') {

            this.setIsViewDashboard(true);
            this.setIsAddInfoButtonVisible(false);
            this.isAddInfoAreaVisible.next(false);
        } else {

            this.setViewType('list');
            this.setIsViewDashboard(false);
            this.setIsAddInfoButtonVisible(true);

            const isAddInfoVisible: string = this.cookieService.get('isAddInfoAreaVisible');
            if (isAddInfoVisible === 'true') {
                this.setIsAddInfoAreaVisible(true);
            } else {
                this.setIsAddInfoAreaVisible(false);
            }
        }

        // Fieldnames for filter-function
        this.fieldNamesForFilter.next(this.getFieldNamesOfObject(item.name));
        this.selectedMenuItemTitle.next(item.title);
        this.setSelectedObject(null);
        // this.setSearchTermFromContentHeader('');
    }

    /**
     * Preparing the fieldnames for the filter-function for the list-views
     * @param objectType (client, project)
     * @returns fieldnames as array
     */
    getFieldNamesOfObject(objectType: any): string[] {
        if (objectType === 'client') {
            return clientFieldNames as string[];
        } else if (objectType === 'project') {
            return projectFieldNames as string[];
        } else if (objectType === 'teamMember') {
            return teamMemberFieldNames as string[];
        } else {
            return [];
        }
    }

    setIsQuicklinksAreaVisible(value: boolean): void {
        this.isQuicklinksAreaVisible.next(value);
        this.setCookie('isQuicklinkAreaVisible', value.toString());
    }

    setIsAddInfoButtonVisible(value: boolean): void {
        this.isAddInfoButtonVisible.next(value);
    }

    setIsAddInfoAreaVisible(value: boolean): void {
        this.setCookie('isAddInfoAreaVisible', value.toString());
        this.isAddInfoAreaVisible.next(value);
    }

    /**
     * Set viewType to 'detail' by double-click on a object-tile
     * @param data
     */
    setViewType (data: string): void {
        this.viewType.next(data);
    }

    setActiveMenuByName = (menuItems: HeaderMenu[], name: string) => {
        // Finde den Index des gesuchten Objekts anhand des Namens
        const index = menuItems.findIndex(item => item.name === name);

        if (index === -1) {
            console.log('Item nicht gefunden');
            return;
        }

        // Setze den Status des gefundenen Objekts auf 'active'
        menuItems[index].status = 'active';

        // Wenn es ein Objekt davor gibt, setze den Status auf 'pre-active'
        if (index > 0) {
            menuItems[index - 1].status = 'pre-active';
        }

        // Wenn es ein Objekt danach gibt, setze den Status auf 'post-active'
        if (index < menuItems.length - 1) {
            menuItems[index + 1].status = 'post-active';
        }

        // Rückgabe des aktualisierten Arrays
        return menuItems;
    };

    setSelectedObject (selectedObject: any): void {
        this.selectedObject.next(selectedObject);
    }

}
