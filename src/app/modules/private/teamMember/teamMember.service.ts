import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TeamMember, TEAMMEMBER_MOCK } from '../../../mocks/teamMember-mock';

import { WorkScheduleService } from '../workSchedule/work-schedule.service';
import { TeamMemberWorkSchedule } from '../../../mocks/workSchedule-mock';

@Injectable({
    providedIn: 'root'
})

export class TeamMemberService {

    constructor(
        private workScheduleService: WorkScheduleService,
    ) { }

    getTeamMembers(): Observable<TeamMember[]> {
        return of(TEAMMEMBER_MOCK);
    }
}
