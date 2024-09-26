import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task, TASK_MOCK } from '../../../mocks/task';
import { PrivateService } from '../private.service';

@Injectable({
    providedIn: 'root'
})

export class WorkspaceService {

    constructor(
        private privateService: PrivateService,
    ) { }

    getTasks(): Observable<Task[]> {
        return of(TASK_MOCK);
    }

    setSelectedObject(selectedObject: any): void {
        this.privateService.setSelectedObject(selectedObject);
    }
}
