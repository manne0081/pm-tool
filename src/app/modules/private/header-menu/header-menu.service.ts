import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HeaderMenu, HEADERMENU_MOCK, HeaderSubMenu, HEADERSUBMENU_MOCK } from '../../../mocks/header-menu-mock';

@Injectable({
    providedIn: 'root'
})

export class HeaderMenuService {

    constructor() { }

    getHeaderMenu(): Observable<HeaderMenu[]> {
        return of(HEADERMENU_MOCK);
    }

    getHeaderSubMenu(): Observable<HeaderSubMenu[]> {
        return of(HEADERSUBMENU_MOCK);
    }

    /**
     * If markAsFavorite is false, mark as true and vice versa
     * @param subMenuItem
     */
    setHeaderSubItemToFavorite(subMenuItem: any): void {
        if (subMenuItem.parentName !== 'favorites') {
            HEADERSUBMENU_MOCK.forEach(item => {
                if (item.id === subMenuItem.id) {
                    if (!item.markAsFavorite) {
                        item.markAsFavorite = true;
                    } else {
                        item.markAsFavorite = false;
                    }
                }
            });
        } else {
            HEADERSUBMENU_MOCK.forEach(item => {
                if (item.name === subMenuItem.name) {
                    if (!item.markAsFavorite) {
                        item.markAsFavorite = true;
                    } else {
                        item.markAsFavorite = false;
                    }
                }
            });
        }
    }

    /**
     * If markAsFavorite is false, add a new Item to the HEADERSUBMENU_MOCK
     * @param item
     */
    addHeaderSubItemToFavorite(clickedItem: any): void {
        let numberFavorites: number;
        let newId: number = 0;

        this.getHeaderSubMenu().subscribe((data: HeaderSubMenu[]) => {
            numberFavorites = data.length;
            newId = numberFavorites;
        });

        const favoriteItem = {
            id: newId,
            name: clickedItem.name,
            parentName: 'favorites',
            parentForMenuItemState: clickedItem.parentName,
            title: clickedItem.title,
            markAsFavorite: true,
            route: clickedItem.route,
        };
        HEADERSUBMENU_MOCK.push(favoriteItem);
    }

    /**
     * Remove the item from the array when its not an favorite anymore
     * @param clickedItem
     */
    removeSubItemFromFavorite(clickedItem: any): void {
        const index = HEADERSUBMENU_MOCK.findIndex(item =>
            item.name === clickedItem.name && item.parentName === 'favorites'
        );
        if (index !== -1) {
            HEADERSUBMENU_MOCK.splice(index, 1);
        }
    }
}
