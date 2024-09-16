import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { AddInfoComponent } from './add-info/add-info.component';
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
        AddInfoComponent,
        ContentHeaderForListComponent,
        ContentHeaderForDetailComponent,
    ],
    templateUrl: './private.component.html',
    styleUrl: './private.component.scss'
})

export class PrivateComponent implements OnInit {
    selectedMenuItemTitle: any;                                 // Show the object-title at the content-title-container

    isViewDashboard?: boolean;                                  // Save wether view is dashboard to show or hide some stuff

    isQuicklinksAreaVisible?: boolean;                          // Show or hide the QuicklinksArea
    isAddInfoButtonVisible?: boolean;                           // Show or hide the AddInfoButton
    isAddInfoAreaVisible?: boolean;                             // Show or hide the AddInfoArea

    viewType: string = 'list'                                   // list or detail

    constructor(
        private privateService: PrivateService,
    ){}

    ngOnInit(): void {

        // Show or hide (AddInfoArea, ContentHeader, ContentActions, AddInfoArea)
        this.privateService.isViewDashboard$.subscribe(data => {
            this.isViewDashboard = data;
        });

        this.privateService.selectedMenuItemTitle$.subscribe(data => {
            this.selectedMenuItemTitle = data;
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
