import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor(
        private route: ActivatedRoute,
    ) { }

    /**
     * Sorting Data
     */
    sortObjectItems(objects: any, sortingTerm: string): any {
        const sortedObjects = objects.sort((a: { name: string; id: number; }, b: { name: string; id: number; }) => {
            if (sortingTerm === 'name-asc') {
                return a.name.localeCompare(b.name);
            } else if (sortingTerm === 'name-desc') {
                return b.name.localeCompare(a.name);
            } else if (sortingTerm === 'id-asc') {
                return a.id - b.id;
            } else if (sortingTerm === 'id-desc') {
                return b.id - a.id;
            } else {
                return 0; // Falls kein gültiger Sortierbegriff angegeben ist, bleibt die Reihenfolge unverändert
            }
        });
        return sortedObjects;
    }

    /**
     * Filtering Data
     */
    filterObjectItems(objects: any, searchingTerm: string): any {
        const filteredObjects = objects.filter((item: { name: string; }) => item.name.toLowerCase().includes(searchingTerm.toLowerCase()));
        return filteredObjects;
    }
}
