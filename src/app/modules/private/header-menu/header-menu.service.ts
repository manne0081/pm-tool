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

    setHeaderSubItemToFavorite(subMenuItem: any): void {
        HEADERSUBMENU_MOCK.forEach(item => {
            if (item.id === subMenuItem.id) {
                if (!item.markAsFavorite) {
                    item.markAsFavorite = true;
                } else {
                    item.markAsFavorite = false;
                }
            }
        });
    }

    addHeaderSubItemToFavorite(item: any): void {
        let numberFavorites: number;
        let newId: number = 0;

        this.getHeaderSubMenu().subscribe((data: HeaderSubMenu[]) => {
            numberFavorites = data.length;
            newId = numberFavorites;
        });

        const favoriteItem = {
            id: newId,
            name: item.name,
            parentName: 'favorites',
            parentForMenuItemState: item.parentName,
            title: item.title,
            markAsFavorite: true,
            route: item.route,
        };
        HEADERSUBMENU_MOCK.push(favoriteItem);
    }

    removeSubItemFromFavorite(item: any): void {

        this.getHeaderSubMenu().subscribe(data => {
            console.log(data);
        });

        console.log('clicked item: ', item.id);

        const index = HEADERSUBMENU_MOCK.findIndex(item => item.id === item.id);
        console.log('array index: ', index);

        if (item.id === index) {
            console.log('gleich...');
            // HEADERSUBMENU_MOCK.splice(index, 1);
        }
        // if (index !== -1) {
        //     HEADERSUBMENU_MOCK.splice(index, 1);
        // }


    }
}
