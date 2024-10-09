import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../../../core/services/data.service';
import { WorkspaceService } from '../workspace.service';
import { Task } from '../../../../mocks/task';
import { TimeTrackerServiceGlobal } from '../../../../core/services/time-tracker.service';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})

export class TaskListComponent {
    taskItems: Task[] = [];
    selectedItemId: number | null = null;

    searchTerm: string = '';
    sortingTerm: string = '';

    constructor (
        private route: ActivatedRoute,
        private dataService: DataService,
        private workspaceService: WorkspaceService,
        private timeTrackerService: TimeTrackerServiceGlobal,
    ) {}

    ngOnInit(): void {
        // Get sortingTerm and SearchTerm from the url and set them to the variables
        // Load clients
        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search'] || '';
            this.sortingTerm = (params['sort'] || 'id-asc');      // for example: 'name-asc', 'name-desc', 'id-asc', 'id-desc'
            this.getTaskItems();
        });
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getTaskItems(): void {
        this.workspaceService.getTasks().subscribe((data: Task[]) => {
            // Set data to items
            this.taskItems = data;
            // Call method to sort the items
            this.sortItems();
            // If searchTerm exists, call method to filter the items
            if (this.searchTerm) {
                this.filterItems();
            }
        });
    }

    /**
     * Sort the items
     */
    sortItems(): void {
        this.taskItems = this.dataService.sortObjectItems(this.taskItems, this.sortingTerm);
    }

    /**
     * Filter the items
     */
    filterItems(): void {
        this.taskItems = this.dataService.filterObjectItems(this.taskItems, this.searchTerm);
    }

    /**
     *
     * @param item
     */
    onSelectTask(event: Event, item: any):void {

        // if ((event.target as HTMLElement).tagName === 'BUTTON') {
        //     return; // Abbrechen, wenn auf den Button geklickt wurde
        // }

        this.selectedItemId = item.id                   // Needed for UI
        this.workspaceService.setSelectedObject(item);     // Needed for AddInfoArea
    }

    setTimerStart(): void {
        this.timeTrackerService.setTimerStart();
    }

    setTimerPause(): void {
        this.timeTrackerService.setTimerPause();
    }

    setTimerStop(): void {
        this.timeTrackerService.setTimerStop();
    }


}
