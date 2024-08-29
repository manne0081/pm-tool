import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkSchedule } from '../../../../mocks/workSchedule-mock';
import { Team } from '../../../../mocks/team-mock';
import { WorkScheduleService } from '../work-schedule.service';
import { TeamService } from '../../team/team.service';

@Component({
    selector: 'app-work-schedule-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './work-schedule-list.component.html',
    styleUrl: './work-schedule-list.component.scss'
})

export class WorkScheduleListComponent implements OnInit {
    WorkScheduleItems: WorkSchedule[] = [];
    teamMembers: Team[] = [ /* Deine teamMember-Daten */ ];

    constructor (
        private workScheduleService: WorkScheduleService,
        private teamService: TeamService,
    ) {}

    ngOnInit(): void {
        this.getWorkScheduleItems();
        this.getTeamItems();
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getWorkScheduleItems(): void {
        this.workScheduleService.getWorkSchedule().subscribe((data: WorkSchedule[]) => {
            this.WorkScheduleItems = data;
        });
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getTeamItems(): void {
        this.teamService.getTeam().subscribe((data: Team[]) => {
            this.teamMembers = data;
        });
    }

    getTeamMemberById(teamMemberId: number): Team | undefined {
        return this.teamMembers.find(member => member.id === teamMemberId);
    }
}
