import { Injectable } from '@angular/core';
import { PrivateService } from '../private.service';

@Injectable({
    providedIn: 'root'
})

export class ContentHeaderService {
    fieldNamesForFilter?: string[];

    constructor(
        private privateService: PrivateService
    ) {
        // Read fieldNames for filter-dropdown
        // this.privateService.fieldNamesForFilter$.subscribe(data => {
        //     this.fieldNamesForFilter = data;
        // });
    }

    setSearchTermFromContentHeader(searchTerm: string): void {
        // this.privateService.setSearchTermFromContentHeader(searchTerm);
    }

    setSortingTermFromContentHeader(sortingTerm: string): void {
        // this.privateService.setSortingTermFromContentHeader(sortingTerm);
    }


}
