import { Injectable } from '@angular/core';
import { PrivateService } from '../private.service';

@Injectable({
    providedIn: 'root'
})

export class ContentHeaderService {

    constructor(
        private privateService: PrivateService
    ) {}

    setSearchTermFromContentHeader(searchTerm: string): void {
        // this.privateService.setSearchTermFromContentHeader(searchTerm);
    }

    setSortingTermFromContentHeader(sortingTerm: string): void {
        // this.privateService.setSortingTermFromContentHeader(sortingTerm);
    }
}
