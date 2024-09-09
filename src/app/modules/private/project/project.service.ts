import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project, PROJECT_MOCK } from '../../../mocks/project-mock';

@Injectable({
    providedIn: 'root'
})

export class ProjectService {

    constructor() { }

    getProjects(): Observable<Project[]> {
        return of(PROJECT_MOCK);
    }

    setFieldnamesForFilter(): void {

    }


}
