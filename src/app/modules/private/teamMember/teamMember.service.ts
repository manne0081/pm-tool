import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TeamMember, TEAMMEMBER_MOCK } from '../../../mocks/teamMember-mock';


@Injectable({
    providedIn: 'root'
})

export class TeamMemberService {

    constructor() { }

    getTeamMembers(): Observable<TeamMember[]> {
        return of(TEAMMEMBER_MOCK);
    }
}
