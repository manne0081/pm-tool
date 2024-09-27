import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandardWorkSchedule } from '../../../../../mocks/workSchedule-mock';
import { WorkScheduleService } from '../work-schedule.service';

@Component({
    selector: 'app-work-schedule-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './work-schedule-list.component.html',
    styleUrl: './work-schedule-list.component.scss'
})

export class WorkScheduleListComponent {
    workScheduleItems: StandardWorkSchedule[] = [];
    selectedWorkScheduleId: number | null = null;

    constructor (
        private workScheduleService: WorkScheduleService,
    ) {}

    ngOnInit(): void {
        this.getWorkScheduleItems();
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getWorkScheduleItems(): void {
        this.workScheduleService.getStandardWorkSchedule().subscribe((data: StandardWorkSchedule[]) => {
            this.workScheduleItems = data;
        });
    }

    onSelectWorkSchedule(workSchedule: StandardWorkSchedule):void {
        this.selectedWorkScheduleId = workSchedule.id
    }
}
