import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project, PROJECT_MOCK } from '../../../mocks/project-mock';
import { PrivateService } from '../private.service';

@Injectable({
    providedIn: 'root'
})

export class ProjectService {
    searchTermFromContentHeader: string = '';

    constructor(
        private privateService: PrivateService,
    ) {
        this.privateService.searchTermFromContentHeader$.subscribe(data => {
            console.log('searchTerm:',data);

            // todo
            // load projects by filter...
        });
    }

    getProjects(): Observable<Project[]> {
        return of(PROJECT_MOCK);
    }

    getSearchTerm(): string {
        return this.searchTermFromContentHeader;
    }

    setFieldnamesForFilter(): void {
    }

    setViewType(viewType: string): void {
        this.privateService.setViewType(viewType);
    }

    setSelectedObject(selectedObject: any): void {
        this.privateService.setSelectedObject(selectedObject);
    }
}
