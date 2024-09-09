import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { clientFieldNames } from '../../mocks/client-mock';
import { projectFieldNames } from '../../mocks/project-mock';
import { teamMemberFieldNames } from '../../mocks/teamMember-mock';

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

    // Save the current Status (AddInfoArea)
    private saveIsAddInfoAreaVisible: boolean = true;

    // Show the different content-headers (contentHeaderForList, contentHeaderForDetail)
    private viewType = new BehaviorSubject<string>('list');
    viewType$ = this.viewType.asObservable();

    // Fieldnames of choosen MenuObject
    private fieldNamesForFilter = new BehaviorSubject<any>(undefined);
    fieldNamesForFilter$ = this.fieldNamesForFilter.asObservable();

    test(): void {
        console.log('isViewDashboard: ', this.isViewDashboard.getValue());
        console.log('isQuicklinksAreaVisible: ', this.isQuicklinksAreaVisible.getValue());
        console.log('isAddInfoButtonVisible: ', this.isAddInfoButtonVisible.getValue());
        console.log('isAddInfoAreaVisible: ', this.isAddInfoAreaVisible.getValue());
        console.log('saveIsAddInfoAreaVisible: ', this.saveIsAddInfoAreaVisible);
        console.log('viewType: ', this.viewType.getValue());
        console.log('fieldNamesForFilter: ', this.fieldNamesForFilter.getValue());
    }

    constructor() {}

    /**
     * Set isDashboard to 'true' or 'false'
     * Set visibility of AddInfoArea to 'true' or 'false'
     * Set viewType to 'list' or 'detail'
     * @param object
     */
    setChoosenObjectByMenu (object: any): void {
        //
        if (object.name === 'dashboard') {
            // console.log('object.name:\n', object.name);
            this.isViewDashboard.next(true);
            this.setIsAddInfoAreaVisible(false);
        } else {
            // console.log('object.name:\n', object.name);
            this.isViewDashboard.next(false);
            this.setIsAddInfoAreaVisible(this.saveIsAddInfoAreaVisible);
        }

        // Set the viewType to list or detail to change the content-header-type
        this.setViewType('list');

        // Fieldnames for filter-function
        this.fieldNamesForFilter.next(this.getFieldNamesOfObject(object.name));
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
        this.saveIsAddInfoAreaVisible = value;
    }

    getSaveIsAddInfoAreaVisible(): boolean {
        return this.saveIsAddInfoAreaVisible;
    }

    /**
     * Set viewType to 'detail' by double-click on a object-tile
     * @param data
     */
    setViewType (data: string): void {
        this.viewType.next(data);
    }

}
