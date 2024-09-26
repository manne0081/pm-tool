import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TeamMember, TEAMMEMBER_MOCK } from '../../../../mocks/teamMember-mock';

import { PrivateService } from '../../private.service';

@Injectable({
    providedIn: 'root'
})

export class TeamMemberService {

    constructor(
        private privateService: PrivateService,
    ) {}

    getTeamMembers(): Observable<TeamMember[]> {
        return of(TEAMMEMBER_MOCK);
    }

    setSelectedObject(selectedObject: any): void {
        this.privateService.setSelectedObject(selectedObject);
    }
}
