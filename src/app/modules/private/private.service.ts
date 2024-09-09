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
     * *******************************************     *
     * - Is the view === dashboard
     * - Is the view === list or detail
     * - Clicked project for add-info
     * - Fieldnames for the filter-function (Dropdown-Values)
     * - Show Quicklinks and show AddInfo, AddInfoButton
     */

    // Use to show or hide the add-info-area or the content-header and actions-area
    private isViewDashboard = new BehaviorSubject<boolean>(true);
    isViewDashboard$ = this.isViewDashboard.asObservable();

    // Use to show or hide the quicklink area
    private areQuicklinksVisible = new BehaviorSubject<boolean>(true);
    areQuicklinksVisible$ = this.areQuicklinksVisible.asObservable();

    // Use to show or hide the addInfoArea
    private isAddInfoAreaVisible = new BehaviorSubject<boolean>(false);
    isAddInfoAreaVisible$ = this.isAddInfoAreaVisible.asObservable();

    // Use to save the current status of the addInfoArea
    private saveIsAddInfoAreaVisible = new BehaviorSubject<boolean>(false);
    saveIsAddInfoAreaVisible$ = this.saveIsAddInfoAreaVisible.asObservable();

    // Use to show or hide the addInfoButton
    private isAddInfoButtonVisible = new BehaviorSubject<boolean>(false);
    isAddInfoButtonVisible$ = this.isAddInfoButtonVisible.asObservable();

    // Use to show the content-header-for-list or content-header-for-detail
    private viewType = new BehaviorSubject<string>('list');
    viewType$ = this.viewType.asObservable();

    // Use for the content-header-list, to get the object-fieldnames there
    // Maybe this doesnt need, only the fieldnames are needed...
    // private choosenMenuItem = new BehaviorSubject<any>('dashboard');
    // choosenMenuItem$ = this.choosenMenuItem.asObservable();

    // Fieldnames of choosen MenuObject
    private fieldNamesForFilter = new BehaviorSubject<any>(undefined);
    fieldNamesForFilter$ = this.fieldNamesForFilter.asObservable();

    constructor() { }

    setViewType (data: string): void {
        this.viewType.next(data);
    }

    setChoosenObjectByMenu (object: any): void {
        // Is clicked dashboard, set true or false to show or hide the content-header and the add-info-area + toggle-button
        if (object.name === 'dashboard') {
            this.isViewDashboard.next(true);
        } else {
            this.isViewDashboard.next(false);
        }



        // Set the clicked object as active to get the fieldnames for the filter-function
        // this.choosenMenuItem = object;
        // this.choosenMenuItem.next(object);

        // Set the viewType to list or detail to change the content-header-type
        this.viewType.next('list');

        // Fieldnames for filter-function
        this.fieldNamesForFilter.next(this.getFieldNamesOfObject(object.name));
    }

    /**
     * Preparing the fieldnames for the filter-function for the list-views
     *
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

    setAreQuicklinksVisible(value: boolean): void {
        this.areQuicklinksVisible.next(value);
    }

    setIsAddInfoAreaVisible(value: boolean): void {
        this.isAddInfoAreaVisible.next(value);
    }

    setSaveIsAddInfoAreaVisible(value: boolean): void {
        this.saveIsAddInfoAreaVisible.next(value);
    }

    setIsAddInfoButtonVisible(value: boolean): void {
        this.isAddInfoButtonVisible.next(value);
    }
}
