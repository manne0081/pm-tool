import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { RouterService } from '../../core/services/router.service';
import { HeaderMenu, HEADERMENU_MOCK, HEADERSUBMENU_MOCK } from '../../mocks/headerMenu-mock';

import { clientFieldNames } from '../../mocks/client-mock';
import { projectFieldNames } from '../../mocks/project-mock';
import { teamMemberFieldNames } from '../../mocks/teamMember-mock';
import { DataService } from '../../core/services/data.service';

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
    // fieldNamesForFilter$ = this.fieldNamesForFilter.asObservable();

    // Selected Object for Additional Informations
    private selectedObject = new BehaviorSubject<any>(undefined);
    selectedObject$ = this.selectedObject.asObservable();

    constructor(
        private cookieService: CookieService,
        private routerService: RouterService,
        private dataService: DataService,
    ) {
        // this.test();

        // Manage route
        const route: string = this.routerService.getLastSegmentOfCurrentUrl();      // For example: dashboard, client, project incl. parameter
        const trimmedRoute = route.split('?');                                      // splits the route in {object} and {parameter}
        // console.log(trimmedRoute[0]);

        // Manage visibility
        const cookieIsAddInfoVisible: string = this.cookieService.get('isAddInfoAreaVisible');
        const cookieIsQuicklinksVisible: string = this.cookieService.get('isQuicklinkAreaVisible');

        // Mark menuItem as active when click refresh / F5
        const isMenuItemActive = HEADERMENU_MOCK.some(item => item.name === trimmedRoute[0]);
        const isSubMenuItemActive = HEADERSUBMENU_MOCK.some(item => item.name === trimmedRoute[0]);
        if (isMenuItemActive) {
            // console.log('route is MenuItem');
            this.setActiveMenuItemByName(trimmedRoute[0]);
        } else if (isSubMenuItemActive) {
            // console.log('route is SubMenuItem');
            const menuSubItem = HEADERSUBMENU_MOCK.find(item => item.name === trimmedRoute[0]);
            // console.log('menuSubItem passend zu route', menuSubItem);
            const menuItem = menuSubItem!.parentForMenuItemState;
            // console.log('menuItem passend zu menuSubItem', menuItem);
            this.setActiveMenuItemByName(menuItem);
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

        // Fieldnames by clicking refresh
        this.setFieldNamesOfObject(trimmedRoute[0]);

        this.setContentTitle(trimmedRoute[0]);
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

    /**
     * Possible cookies: 'isAddInfoAreaVisible', 'isQuicklinkAreaVisible'
     * @param cookieName
     * @returns
     */
    // Read Cookie
    getCookie(cookieName: string) {
        return this.cookieService.get(cookieName);
    }

    getCookieAddInfoArea(cookie: string): boolean {
        if (this.getCookie(cookie) === 'true') {
            return true;
        } else {
            return false;
        }
    }

    // Delete Cookie
    deleteCookie(cookieName: string) {
        this.cookieService.delete(cookieName);
    }

    /**
     *
     * @param isViewDashboard
     */
    setIsViewDashboard(isViewDashboard: boolean): void {
        this.isViewDashboard.next(isViewDashboard);
    }

    /**
     * Set viewType to 'detail' by double-click on a object-tile
     * @param data
     */
    setViewType (data: string): void {
        this.viewType.next(data);
    }

    /**
     *
     * @param value
     */
    setIsQuicklinksAreaVisible(value: boolean): void {
        this.isQuicklinksAreaVisible.next(value);
        this.setCookie('isQuicklinkAreaVisible', value.toString());
    }

    /**
     *
     * @param value
     */
    setIsAddInfoButtonVisible(value: boolean): void {
        this.isAddInfoButtonVisible.next(value);
    }

    /**
     *
     * @param value
     */
    setIsAddInfoAreaVisible(value: boolean): void {
        this.setCookie('isAddInfoAreaVisible', value.toString());
        this.isAddInfoAreaVisible.next(value);
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
        this.setFieldNamesOfObject(item.name);
        //
        this.setContentTitle(item);
        //
        this.setSelectedObject(null);
    }

    /**
     * To mark the Menu-Item as active
     */
    onSelectQuicklink(item: any): void {
        this.setActiveMenuItemByName(item.parentName);
        this.setContentTitle(item.menuItemName);
        this.setFieldNamesOfObject(item.menuItemName);

        if (item.parentName === 'dashboard') {
            this.isViewDashboard.next(true);
            this.setIsAddInfoButtonVisible(false);
            this.isAddInfoAreaVisible.next(false);
        } else {
            this.isViewDashboard.next(false);
            this.setIsAddInfoButtonVisible(true);
            this.isAddInfoAreaVisible.next(this.getCookieAddInfoArea('isAddInfoAreaVisible'));
        }
    }

    /**
     * Preparing the fieldnames for the filter-function for the list-views
     * @param objectType (client, project)
     * @returns fieldnames as array
     */
    setFieldNamesOfObject(objectType: any): void {
        if (objectType === 'client') {
            this.fieldNamesForFilter.next(clientFieldNames as string[]);
            // return clientFieldNames as string[];
        } else if (objectType === 'project') {
            this.fieldNamesForFilter.next(projectFieldNames as string[]);
            // return projectFieldNames as string[];
        } else if (objectType === 'teamMember') {
            this.fieldNamesForFilter.next(teamMemberFieldNames as string[]);
            // return teamMemberFieldNames as string[];
        } else {
            // return [];
        }
    }

    getFieldNamesOfObject() {
        return this.fieldNamesForFilter.asObservable();
    }

    /**
     *
     * @param name
     * @returns
     */
    setActiveMenuItemByName = (name: string) => {
        const menuItems = HEADERMENU_MOCK;
        const menuSubItems = HEADERSUBMENU_MOCK;
        let index: number;

        // Clear all marked header-item to status = '' (pre-active, active, post-active)
        menuItems.forEach(item => {
            item.status = '';
        });

        // Find the index of the menuItems based on the name paramater
        index = menuItems.findIndex(item => item.name === name);

        if (index === -1) {
            // If no item exists in menuItems -> searching about the name at the menuSubItems and set the name to parentName
            const parentName = menuSubItems.find(item => item.name === name)?.parentName;
            index = menuItems.findIndex(item => item.name === parentName);

            if (index === -1) {
                // If no item exists in menuSubItems -> Normally this cannot happen
                console.log('No menuSubItem exists');
                return;
            }
        }

        // Set the status of the clicked item to 'active'
        menuItems[index].status = 'active';

        // Set the status of the previous item to 'pre-active'
        if (index > 0) {
            menuItems[index - 1].status = 'pre-active';
        }

        // Set the status of the following item to 'post-active'
        if (index < menuItems.length - 1) {
            menuItems[index + 1].status = 'post-active';
        }

        // Return the array
        return menuItems;
    };

    /**
     * Set selected object für add-info-area
     * @param selectedObject
     */
    setSelectedObject (selectedObject: any): void {
        this.selectedObject.next(selectedObject);
    }

    /**
     * Set content-title about the url-object and return the content-title
     * @param data
     */
    setContentTitle(titleItem: any): void {
        // console.log('test:',titleItem);
        if (typeof(titleItem) === 'string') {
            this.selectedMenuItemTitle.next(this.dataService.findContentTitleByMenuItemName(titleItem));
        } else {
            this.selectedMenuItemTitle.next(titleItem.title);
        }
    }
}
