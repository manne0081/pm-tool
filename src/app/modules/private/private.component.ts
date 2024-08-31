import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

    constructor(
        private router: Router,
    ){}

    ngOnInit(): void {
        this.toggleQuicklinkVisibility();
        this.toggleAddInfoVisibility();

        // To load the dashboard at starting the app
        this.onSelectMenuItem('Dashboard');
        this.router.navigate(['dashboard']);
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
        console.log(menuItem);

        // Set selectedMenuItem to Dashboard at App loading
        if (menuItem === 'Dashboard') {
            this.selectedMenuItem = menuItem;
        } else {
            this.selectedMenuItem = menuItem.title;
        }

        // Toggle visibility from the add-info-area and the add-info-button when click header-menu-item
        if (menuItem === 'Dashboard' || menuItem.name === 'dashboard') {
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
