import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { STANDARD_WORKSCHEDULE_MOCK, StandardWorkSchedule, TEAMMEMBER_WORKSCHEDULE_MOCK, TeamMemberWorkSchedule } from '../../../../mocks/workSchedule-mock';

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
