import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMember } from '../../../../mocks/teamMember-mock';
import { TeamMemberService } from '../teamMember.service';
import { StandardWorkSchedule, TeamMemberWorkSchedule } from '../../../../mocks/workSchedule-mock';
import { WorkScheduleService } from '../../workSchedule/work-schedule.service';

@Component({
    selector: 'app-teamMember-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './teamMember-list.component.html',
    styleUrl: './teamMember-list.component.scss'
})

export class TeamMemberListComponent implements OnInit {
    teamMemberItems: TeamMember[] = [];
    standardWorkSchedule: StandardWorkSchedule[] = [];
    teamMemberWorkSchedule: TeamMemberWorkSchedule[] = [];

    constructor (
        private teamMemberService: TeamMemberService,
        private workScheduleService: WorkScheduleService,
    ) {}

    ngOnInit(): void {
        this.getTeamMemberItems();
        this.getStandardWorkSchedule();
        this.getTeamMemberWorkSchedule();
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getTeamMemberItems(): void {
        this.teamMemberService.getTeamMembers().subscribe((data: TeamMember[]) => {
            this.teamMemberItems = data;
            console.log(this.teamMemberItems);
        });
    }

    getStandardWorkSchedule(): void {
        this.workScheduleService.getStandardWorkSchedule().subscribe((data: StandardWorkSchedule[]) => {
            this.standardWorkSchedule = data;
            console.log(this.standardWorkSchedule);
        });
    }

    getTeamMemberWorkSchedule(): void {
        this.workScheduleService.getTeamMemberWorkSchedule().subscribe((data: TeamMemberWorkSchedule[]) => {
            this.teamMemberWorkSchedule = data;
            console.log(this.teamMemberWorkSchedule);
        });
    }

    getWorkScheduleForMember(teamMemberId: number) {
        // Finde den entsprechenden Team-Member
        const teamMember = this.teamMemberItems.find(member => member.id === teamMemberId);
        if (!teamMember) {
            return null;
        }

        // Standardmodell finden
        const standardSchedule = this.teamMemberWorkSchedule.find(schedule => schedule.teamMemberId === teamMember.id);
        if (!standardSchedule) {
            return null;
        }

        return standardSchedule
    }

    getStandardWorkScheduleName(scheduleId: number | undefined): string {
        const schedule = this.standardWorkSchedule.find(s => s.id === scheduleId);
        return schedule ? schedule.name : 'Kein Standardmodell';
    }
}
