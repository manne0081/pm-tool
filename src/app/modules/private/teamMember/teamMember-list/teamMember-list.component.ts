import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../../../core/services/data.service';

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
    selectedTeamMemberId: number | null = null;

    searchTerm: string = '';
    sortingTerm: string = '';

    constructor (
        private route: ActivatedRoute,
        private teamMemberService: TeamMemberService,
        private workScheduleService: WorkScheduleService,
        private dataService: DataService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search'] || '';
            this.sortingTerm = (params['sort'] || 'id-asc');      // for example: 'name-asc', 'name-desc', 'id-asc', 'id-desc'
            this.getTeamMemberItems();
            this.getStandardWorkSchedule();
            this.getTeamMemberWorkSchedule();
        });
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
    */
    getTeamMemberItems(): void {
        this.teamMemberService.getTeamMembers().subscribe((data: TeamMember[]) => {
            // Set data to items
            this.teamMemberItems = data;
            // Call method to sort the items
            this.sortItems();
            // If searchTerm exists, call method to filter the items
            if (this.searchTerm) {
                this.filterItems();
            }
        });
    }

    getStandardWorkSchedule(): void {
        this.workScheduleService.getStandardWorkSchedule().subscribe((data: StandardWorkSchedule[]) => {
            this.standardWorkSchedule = data;
            // console.log(this.standardWorkSchedule);
        });
    }

    getTeamMemberWorkSchedule(): void {
        this.workScheduleService.getTeamMemberWorkSchedule().subscribe((data: TeamMemberWorkSchedule[]) => {
            this.teamMemberWorkSchedule = data;
            // console.log(this.teamMemberWorkSchedule);
        });
    }

    getWorkScheduleForMember(teamMemberId: number) {
        // Finde den entsprechenden Team-Member
        const teamMember = this.teamMemberItems.find(member => member.id === teamMemberId);
        if (!teamMember) {
            return null;
        }

        // Standardmodell finden
        const teamMemberWorkSchedule = this.teamMemberWorkSchedule.find(schedule => schedule.teamMemberId === teamMember.id);
        if (!teamMemberWorkSchedule) {
            return null;
        }
        return teamMemberWorkSchedule
    }

    getStandardWorkScheduleName(scheduleId: number | undefined): string {
        const schedule = this.standardWorkSchedule.find(s => s.id === scheduleId);
        return schedule ? schedule.name : 'Kein Standardmodell';
    }

    /**
     * Sort the items
     */
    sortItems(): void {
        this.teamMemberItems = this.dataService.sortObjectItems(this.teamMemberItems, this.sortingTerm);
    }

    /**
     * Filter the items
     */
    filterItems(): void {
        this.teamMemberItems = this.dataService.filterObjectItems(this.teamMemberItems, this.searchTerm);
    }

    onSelectTeamMember(teamMember: TeamMember):void {
        this.selectedTeamMemberId = teamMember.id
        this.teamMemberService.setSelectedObject(teamMember);
    }
}
