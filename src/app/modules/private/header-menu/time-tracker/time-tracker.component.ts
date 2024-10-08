import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { TimeTrackerService } from './time-tracker.service';

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
        /**
         * Usecases beim laden der Komponente:
         * - Der Timer läuft nicht > Nichts zu tun
         * - Der Timer lief als der Browser aktualisiert wurde > Die verstichene Zeit ermitteln, speichern und den Timer von neuem starten
         * - Der Timer ist pausiert als der Browser aktualisiert wurde > Nichts weiter zu tun (denke ich)
         */
        const isTimerRunning = localStorage.getItem('isRunning') === 'true';
        const isTimerPaused = localStorage.getItem('isPaused') === 'true';
        const startedTime = parseInt(localStorage.getItem('startTime') || '0', 10);
        const elapsedSeconds = parseInt(localStorage.getItem('elapsedSeconds') || '0', 10);

        console.log(isTimerRunning, isTimerPaused, startedTime, elapsedSeconds);

        if (!isTimerRunning && !isTimerPaused) {
            // When isnt running or paused
            console.log('nothing to do!');

        } else if (isTimerRunning && !isTimerPaused) {
            // When is running
            console.log('timer is running when reload');

            const now = new Date().getTime();
            const startedTime = parseInt(localStorage.getItem('startTime') || '0', 10);
            const elapsedSeconds = Math.floor((now - startedTime) / 1000); // Verstrichene Zeit in Sekunden

            this.isTimerRunning = isTimerRunning;
            this.elapsedSeconds = elapsedSeconds;
            this.startTimer();

        } else if (!isTimerRunning && isTimerPaused) {
            // When is paused
            console.log('timer is paused when reload');
            this.isTimerPaused = isTimerPaused;
            this.elapsedSeconds = elapsedSeconds;

        }
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
        /**
         * Usecases:
         * - Von 0 Starten
         * - Nach einer Pause fortsetzen
         * - Fortsetzen wenn der Browser neu geladen wird und die Zeit am laufen war
         * - Im Pause-Zustand bleiben, wenn beim neuladen des Browsers der Zustand auf Pause war
         */
        if (!this.isTimerRunning && !this.isTimerPaused) {
            console.log('startTimer > from zero');

            this.isTimerRunning = true;
            this.startedTime = new Date().getTime();

            localStorage.setItem('isRunning', 'true');
            localStorage.setItem('startTime', this.startedTime.toString());

            this.timerInterval = setInterval(() => {
                const now = new Date().getTime();
                this.elapsedSeconds = Math.floor((now - this.startedTime) / 1000); // Verstrichene Zeit in Sekunden
            }, 1000);

        } else if (!this.isTimerRunning && this.isTimerPaused) {
            console.log('startTimer > resume after a break');

            this.isTimerRunning = true;
            this.isTimerPaused = false;

            // Berechne die neue Startzeit unter Berücksichtigung der verstrichenen Zeit
            this.startedTime = new Date().getTime() - (this.elapsedSeconds * 1000);

            localStorage.setItem('isRunning', 'true');
            localStorage.setItem('isPaused', 'false');
            localStorage.setItem('startTime', this.startedTime.toString());

            // Setze das Intervall mit der angepassten Startzeit
            this.timerInterval = setInterval(() => {
                const now = new Date().getTime();
                this.elapsedSeconds = Math.floor((now - this.startedTime) / 1000); // Verstrichene Zeit in Sekunden
            }, 1000);

        } else if (this.isTimerRunning) {
            // Wiederherstellen des Timers nach einem Browser-Neustart
            console.log('startTimer > resume when timer is running and reload');

            // Hole die gespeicherte Startzeit und den Zustand des Timers
            const savedElapsedTime = this.elapsedSeconds;

            // Berechne die aktuelle Startzeit, um die bereits verstrichene Zeit einzubeziehen
            this.startedTime = new Date().getTime() - (savedElapsedTime * 1000);
            this.elapsedSeconds = savedElapsedTime;


            // Timer auf "läuft" setzen
            this.isTimerRunning = true;

            this.timerInterval = setInterval(() => {
                const now = new Date().getTime();
                this.elapsedSeconds = Math.floor((now - this.startedTime) / 1000); // Verstrichene Zeit in Sekunden
            }, 1000);

        }
    }

    pauseTimer() {
        /**
         *
         */
        if (this.isTimerRunning && !this.isTimerPaused) {
            clearInterval(this.timerInterval);
            const now = new Date().getTime();
            const elapsedSeconds = Math.floor((now - this.startedTime) / 1000); // Verstrichene Zeit in Sekunden

            // Saving elapsed time
            this.isTimerRunning = false;
            this.isTimerPaused = true;
            localStorage.setItem('isRunning', 'false');
            localStorage.setItem('isPaused', 'true');
            localStorage.setItem('elapsedSeconds', elapsedSeconds.toString());
        }
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        localStorage.removeItem('startTime');
        localStorage.removeItem('elapsedSeconds');
        localStorage.removeItem('isRunning');
        localStorage.removeItem('isPaused');

        this.isTimerRunning = false;
        this.isTimerPaused = false;
        this.elapsedSeconds = 0;
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
