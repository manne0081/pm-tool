import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Team, TEAM_MOCK } from '../../../mocks/team-mock';

@Injectable({
    providedIn: 'root'
})

export class TeamService {

    constructor() { }

    getTeam(): Observable<Team[]> {
        return of(TEAM_MOCK);
    }

}
