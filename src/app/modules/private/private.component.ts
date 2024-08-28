import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';

@Component({
    selector: 'app-private',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HeaderMenuComponent,
        QuicklinksComponent,
    ],
    templateUrl: './private.component.html',
    styleUrl: './private.component.scss'
})

export class PrivateComponent implements OnInit {
    selectedMenuItem: any;
    quicklinksVisible?: boolean;
    addInfoVisible?: boolean;

    ngOnInit(): void {
        this.toggleQuicklinkVisibility();
        this.toggleAddInfoVisibility();
        this.onSelectMenuItem('Dashboard');
    }

    /**
     *
     */
    toggleQuicklinkVisibility(): void {
        this.quicklinksVisible = !this.quicklinksVisible;
    }

    /**
     *
     */
    toggleAddInfoVisibility(): void {
        this.addInfoVisible = !this.addInfoVisible;
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

        // Toggl visibility from the add-info area when selected Item is Dashboard or not
        if (menuItem === 'Dashboard') {
            this.addInfoVisible = false;
        } else {
            this.addInfoVisible = true;
        }

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
