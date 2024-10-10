import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { TimeTrackerService } from './time-tracker.service';
import { TimeTrackerServiceGlobal } from '../../../../core/services/time-tracker.service';

import { DropdownBaseComponent } from '../../_shared/dropdown/dropdown-base/dropdown-base.component';

@Component({
    selector: 'app-time-tracker',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownBaseComponent,
    ],
    templateUrl: './time-tracker.component.html',
    styleUrl: './time-tracker.component.scss'
})

export class TimeTrackerComponent implements OnInit {
    elementId: string = uuidv4();
    timeTrackerForm: FormGroup;
    showContent: boolean = false;

    startedTime: number = 0;
    elapsedSeconds: number = 0;
    runningSeconds: number = 0;
    isTimerRunning: boolean = false;
    isTimerPaused: boolean = false;
    timerInterval: any;

    constructor(
        private fb: FormBuilder,
        private timeTrackerService: TimeTrackerService,
        private timeTrackerServiceGlobal: TimeTrackerServiceGlobal,
    ) {
        this.timeTrackerForm = this.fb.group({
            conditions: this.fb.array([])  // Array für mehrere Bedingungen
        });
        this.timeTrackerService.getActiveDropdown().subscribe(activeDropdown => {
            if (activeDropdown !== this.elementId) {
                this.showContent = false;
            }
        });
    }

    ngOnInit() {
        this.timeTrackerServiceGlobal.getIsTimerRunning().subscribe(data => {
            this.isTimerRunning = data;
        });

        this.timeTrackerServiceGlobal.getIsTimerPaused().subscribe(data => {
            this.isTimerPaused = data;
        });

        this.timeTrackerServiceGlobal.getStartedTime().subscribe(data => {
            this.startedTime = data;
        });

        this.timeTrackerServiceGlobal.getElapsedSeconds().subscribe(data => {
            this.elapsedSeconds = data;
        });

        console.log('time-tracker.component: \n isRunning:',this.isTimerRunning, '\n isPaused:', this.isTimerPaused, '\n startedTime:', this.startedTime, '\n elapsedSeconds:', this.elapsedSeconds);
    }

    toggleContent(event: Event) {
        event.stopPropagation();
        this.showContent = !this.showContent;

        if (this.showContent) {
            this.timeTrackerService.setActiveDropdown(this.elementId);
        } else {
            this.timeTrackerService.setActiveDropdown(null);
        }
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event): void {
        const target = event.target as HTMLElement;

        if (!target.closest('.sort-container') && this.showContent) {
            this.timeTrackerService.setActiveDropdown(null);
        }
    }

    startTimer() {
        this.timeTrackerServiceGlobal.setTimerStart();
    }

    pauseTimer() {
        this.timeTrackerServiceGlobal.setTimerPause();
    }

    stopTimer() {
        this.timeTrackerServiceGlobal.setTimerStop();
    }

    formatSecondToDuration(seconds: number): string {
        // Anzahl der Sekunden
        const totalSeconds = seconds;

        // Berechne Stunden, Minuten und Sekunden
        const formattedHours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const formattedMinutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const formattedSeconds = (totalSeconds % 60).toString().padStart(2, '0');

        // Formatieren in hh:mm:ss
        const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        return formattedTime;
    }

}
