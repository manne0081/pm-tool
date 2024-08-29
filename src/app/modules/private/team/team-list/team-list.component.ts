import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Team } from '../../../../mocks/team-mock';
import { TeamService } from '../team.service';

@Component({
    selector: 'app-team-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './team-list.component.html',
    styleUrl: './team-list.component.scss'
})

export class TeamListComponent {
    teamItems: Team[] = [];

    constructor (
        private teamService: TeamService,
    ) {}

    ngOnInit(): void {
        this.getHeaderMenuItems();
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getHeaderMenuItems(): void {
        this.teamService.getTeam().subscribe((data: Team[]) => {
            this.teamItems = data;
        });
    }
}
