import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project, PROJECT_MOCK } from '../../../mocks/project-mock';
import { PrivateService } from '../private.service';

@Injectable({
    providedIn: 'root'
})

export class ProjectService {

    constructor(
        private privateService: PrivateService,
    ) {
        this.privateService.searchTermFromContentHeader$.subscribe(data => {
            console.log('searchTerm:',data);
        });
    }

    getProjects(): Observable<Project[]> {
        return of(PROJECT_MOCK);
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
