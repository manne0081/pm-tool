import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { ContentHeaderForListComponent } from './content-header/content-header-for-list/content-header-for-list.component';
import { ContentHeaderForDetailComponent } from './content-header/content-header-for-detail/content-header-for-detail.component';
import { PrivateService } from './private.service';

@Component({
    selector: 'app-private',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HeaderMenuComponent,
        QuicklinksComponent,
        ContentHeaderForListComponent,
        ContentHeaderForDetailComponent,
    ],
    templateUrl: './private.component.html',
    styleUrl: './private.component.scss'
})

export class PrivateComponent implements OnInit {
    selectedMenuItem: any;
    isViewDashboard?: boolean;

    areQuicklinksVisible?: boolean;
    isAddInfoAreaVisible?: boolean;
    isAddInfoButtonVisible?: boolean;

    viewType: string = 'list'       // list or detail

    constructor(
        private privateService: PrivateService,
        private router: Router,
    ){}

    ngOnInit(): void {
        // this.toggleQuicklinkVisibility();
        // this.toggleAddInfoVisibility();

        //
        this.privateService.isViewDashboard$.subscribe(data => {
            this.isViewDashboard = data;
            console.log('ngOnInit - isViewDashboard: ', this.isViewDashboard);
        });

        // Show and hide the Quicklinks...
        this.privateService.areQuicklinksVisible$.subscribe(data => {
            this.areQuicklinksVisible = data;
            console.log('ngOnInit - areQuicklinksVisible: ', data);
        });

        // Show and hide the Add-Info-Area...
        this.privateService.isAddInfoAreaVisible$.subscribe(data => {
            this.isAddInfoAreaVisible = data;
            console.log('ngOnInit - isAddInfoAreaVisible: ', data);
        });

        // Show and hide the Add-Info-Button...
        this.privateService.isAddInfoButtonVisible$.subscribe(data => {
            this.isAddInfoButtonVisible = data;
            console.log('ngOnInit - isAddInfoButtonVisible: ', data);
        });

        // Load the dashboard by app start
        this.router.navigate(['dashboard']);

        // To show or hide the the content-header / content-actions and the add-info-area
        // this.privateService.isViewDashboard$.subscribe(data => {
        //     this.isViewDashboard = data;
        //     if (data && this.addInfoVisible) {
        //         this.addInfoVisible = false;
        //     } else {
        //         this.addInfoVisible = true;
        //     }
        // });

        // Show the list- or the detail contentHeader
        this.privateService.viewType$.subscribe(data => this.viewType = data);
    }

    /**
     *
     */
    toggleQuicklinkVisibility(): void {
        if (this.areQuicklinksVisible) {
            this.privateService.setAreQuicklinksVisible(false);
        } else {
            this.privateService.setAreQuicklinksVisible(true);
        }
    }

    /**
     *
     */
    toggleAddInfoVisibility(): void {
        if (this.isAddInfoAreaVisible) {
            this.privateService.setIsAddInfoAreaVisible(false);
        } else {
            this.privateService.setIsAddInfoAreaVisible(true);
        }
    }

    /**
     *
     * @param menuItem
     */
    onSelectMenuItem(menuItem: any) {

        // Set selectedMenuItem to Dashboard at App loading
        if (menuItem === 'Dashboard') {
            this.selectedMenuItem = menuItem;
        } else {
            this.selectedMenuItem = menuItem.title;
        }

        // Toggle visibility from the add-info-area and the add-info-button when click header-menu-item
        if (menuItem === 'Dashboard' || menuItem.name === 'dashboard') {
            this.isAddInfoAreaVisible = false;
        } else {
            this.isAddInfoAreaVisible = true;
        }

        this.viewType = 'list'

        // this.setAddInfoObject(menuItem);
        // this.addInfoObject = '';
        // this.removeAllFilterItems();

        // this.loadActiveDataFromMock(menuItem);
    }

    /**
     *
     * @param item
     */
    onSelectQuicklink(item: any): void {
        // this.selectedValueFromMainMenu = item.menuTitle;
        // this.addInfoVisible = true;
        // this.setAddInfoObject(item.title);
        // this.addInfoObject = '';
        // this.removeAllFilterItems();
        // this.activeFilterItems.push({ id: 'searchTerm', name: item.title });
    }

}
