import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { WorkSchedule, WORKSCHEDULE_MOCK } from '../../../mocks/workSchedule-mock';

@Injectable({
    providedIn: 'root'
})

export class WorkScheduleService {

    constructor() { }

    getWorkSchedule(): Observable<WorkSchedule[]> {
        return of(WORKSCHEDULE_MOCK);
    }

}
