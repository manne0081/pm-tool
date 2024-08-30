import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { StandardWorkSchedule, STANDARD_WORKSCHEDULE_MOCK, TeamMemberWorkSchedule, TEAMMEMBER_WORKSCHEDULE_MOCK } from '../../../mocks/workSchedule-mock';

@Injectable({
    providedIn: 'root'
})

export class WorkScheduleService {

    constructor() { }

    getStandardWorkSchedule(): Observable<StandardWorkSchedule[]> {
        return of(STANDARD_WORKSCHEDULE_MOCK);
    }

    getTeamMemberWorkSchedule(): Observable<TeamMemberWorkSchedule[]> {
        return of(TEAMMEMBER_WORKSCHEDULE_MOCK);
    }
}
