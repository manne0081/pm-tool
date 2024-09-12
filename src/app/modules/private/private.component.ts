import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

    isQuicklinksAreaVisible?: boolean;
    isAddInfoAreaVisible?: boolean;
    isAddInfoButtonVisible?: boolean;

    viewType: string = 'list'       // list or detail

    constructor(
        private privateService: PrivateService,
    ){}

    ngOnInit(): void {
        // Print some informations
        this.privateService.test();

        // Show or hide (AddInfoArea, ContentHeader, ContentActions, AddInfoArea)
        this.privateService.isViewDashboard$.subscribe(data => {
            this.isViewDashboard = data;
        });

        // Show or hide (QuicklinksArea)
        this.privateService.isQuicklinksAreaVisible$.subscribe(data => {
            this.isQuicklinksAreaVisible = data;
        });

        // Show or hide (AddInfoButton)
        this.privateService.isAddInfoButtonVisible$.subscribe(data => {
            this.isAddInfoButtonVisible = data;
        });

        // Show or hide (AddInfoArea)
        this.privateService.isAddInfoAreaVisible$.subscribe(data => {
            this.isAddInfoAreaVisible = data;
        });

        // Show the list- or the detail contentHeader
        this.privateService.viewType$.subscribe(data => this.viewType = data);
    }

    /**
     *
     */
    toggleQuicklinkVisibility(): void {
        if (this.isQuicklinksAreaVisible) {
            this.privateService.setIsQuicklinksAreaVisible(false);
        } else {
            this.privateService.setIsQuicklinksAreaVisible(true);
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

        if (menuItem === 'Dashboard') {
            this.selectedMenuItem = menuItem;
        } else {
            this.selectedMenuItem = menuItem.title;
        }

        // Toggle visibility from the add-info-area and the add-info-button when click header-menu-item
        // if (menuItem === 'Dashboard' || menuItem.name === 'dashboard') {
        //     this.isAddInfoAreaVisible = false;
        // } else {
        //     this.isAddInfoAreaVisible = true;
        // }

        // this.viewType = 'list'

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


    setCookie(cookieName: string, cookieValue: string, duration?: number) {
        if (duration) {
            this.privateService.setCookie(cookieName, cookieValue, duration);
        } else {
            this.privateService.setCookie(cookieName, cookieValue);
        }
    }

    getCookie(cookieName: string): string {
        console.log('cookieName',this.privateService.getCookie(cookieName));
        return (this.privateService.getCookie(cookieName));
    }


    deleteCookie(cookieName: string) {
        this.privateService.deleteCookie(cookieName);
    }
}
