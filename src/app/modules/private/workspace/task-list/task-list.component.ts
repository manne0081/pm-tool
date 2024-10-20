import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4, v4 } from 'uuid';

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
    tileId?: string;
    taskItems: Task[] = [];
    selectedItemId: number | null = null;

    searchTerm: string = '';
    sortingTerm: string = '';

    isAnyTimerActive = false;
    activeTaskId?: number;

    constructor (
        private route: ActivatedRoute,
        private dataService: DataService,
        private workspaceService: WorkspaceService,
        private timeTrackerServiceGlobal: TimeTrackerServiceGlobal,
    ) {}

    ngOnInit(): void {
        // Get sortingTerm and SearchTerm from the url and set them to the variables
        // Load clients
        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search'] || '';
            this.sortingTerm = (params['sort'] || 'id-asc');      // for example: 'name-asc', 'name-desc', 'id-asc', 'id-desc'
            this.getTaskItems();
        });

        // Lade die gespeicherten Task-Zustände aus dem `localStorage`
        const savedTasks = localStorage.getItem('taskItems');

        if (savedTasks) {
            this.taskItems = JSON.parse(savedTasks);
        }

        this.timeTrackerServiceGlobal.getIsAnyTimerActive().subscribe(data => {
            this.isAnyTimerActive = data;
        });
        this.timeTrackerServiceGlobal.getActiveTaskId().subscribe(data => {
            this.activeTaskId = data;
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
        this.selectedItemId = item.id                   // Needed for UI
        this.workspaceService.setSelectedObject(item);     // Needed for AddInfoArea
    }

    setTimerStart(selectedTask: Task): void {
        this.resetAllTasks();
        selectedTask.isRunning = true;
        this.timeTrackerServiceGlobal.setTimerStart(selectedTask.id);
        this.saveTaskStatus();
    }

    setTimerPause(selectedTask: Task): void {
        if (!this.isAnyTimerActive) {
            return;
        }

        this.resetAllTasks();
        selectedTask.isPaused = true;
        this.timeTrackerServiceGlobal.setTimerPause();
        this.saveTaskStatus();
    }

    setTimerStop(selectedTask: Task): void {
        this.resetAllTasks();
        this.timeTrackerServiceGlobal.setTimerStop();
        this.saveTaskStatus();
    }

    resetAllTasks() {
        this.taskItems.forEach(task => {
            task.isRunning = false;
            task.isPaused = false;
        });
    }

    // Speichert den Zustand aller Tasks im `localStorage`
    saveTaskStatus() {
        localStorage.setItem('taskItems', JSON.stringify(this.taskItems));
    }

}
