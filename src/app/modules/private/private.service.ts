import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { clientFieldNames } from '../../mocks/client-mock';
import { projectFieldNames } from '../../mocks/project-mock';
import { teamMemberFieldNames } from '../../mocks/teamMember-mock';
import { HeaderMenu, HEADERMENU_MOCK } from '../../mocks/headerMenu-mock';
import { RouterService } from '../../core/services/router.service';

@Injectable({
    providedIn: 'root'
})

export class PrivateService {
    /**
     * Infos i would need at the private.component
     * *******************************************
     * -
     * -
    */
    // Use to design the menuItems as active, pre-active and post-active
    private selectedMenuItem = new BehaviorSubject<string>('');
    selectedMenuItem$ = this.selectedMenuItem.asObservable();

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

    // Fieldnames of choosen MenuObject
    private fieldNamesForFilter = new BehaviorSubject<any>(undefined);
    fieldNamesForFilter$ = this.fieldNamesForFilter.asObservable();

    test(): void {
        console.log('selectedMenuItem: ', this.selectedMenuItem.getValue());
        console.log('isViewDashboard: ', this.isViewDashboard.getValue());
        console.log('isQuicklinksAreaVisible: ', this.isQuicklinksAreaVisible.getValue());
        console.log('isAddInfoButtonVisible: ', this.isAddInfoButtonVisible.getValue());
        console.log('isAddInfoAreaVisible: ', this.isAddInfoAreaVisible.getValue());
        console.log('viewType: ', this.viewType.getValue());
    }

    constructor(
        private cookieService: CookieService,
        private routerService: RouterService,
    ) {
        console.log('lastSegmentOfCurrentUrl:',this.routerService.getLastSegmentOfCurrentUrl());

        const test: string = this.routerService.getLastSegmentOfCurrentUrl();

        // this.setActiveMenuByName(HEADERMENU_MOCK, this.selectedMenuItem.getValue());
        this.setActiveMenuByName(HEADERMENU_MOCK, test);
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
        //
        if (item.name === 'dashboard') {
            this.setIsViewDashboard(true);
            this.setIsAddInfoAreaVisible(false);
        } else {
            this.setIsViewDashboard(false);
            this.setIsAddInfoAreaVisible(false);
        }

        // Set selectedMenuItem to the item.name
        this.setSelectedMenuItem(item);

        // Set the viewType to list or detail to change the content-header-type
        this.setViewType('list');

        // Fieldnames for filter-function
        this.fieldNamesForFilter.next(this.getFieldNamesOfObject(item.name));
    }

    /**
     * Set selectedMenuItem to the item.name
     * @param item
     */
    setSelectedMenuItem(item: any): void {
        const itemName = item.name;
        this.selectedMenuItem.next(itemName);
        // console.log('selectedMenuItem: ', this.selectedMenuItem.getValue());
    }

    /**
     * Preparing the fieldnames for the filter-function for the list-views
     * @param objectType
     * @returns
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
    }

    setIsAddInfoButtonVisible(value: boolean): void {
        this.isAddInfoButtonVisible.next(value);
    }

    setIsAddInfoAreaVisible(value: boolean): void {
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

}
