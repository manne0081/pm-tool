import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-demo-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './demo-list.component.html',
    styleUrl: './demo-list.component.scss'
})

export class DemoListComponent {
    startTime?: Time;
    elapsedTime: number = 0;
    timerInterval: any;
    isTimerRunning: boolean = false;
    isTimerPaused: boolean = false;

    ngOnInit() {
        const savedStartTime = localStorage.getItem('timerStart');
        const savedElapsedTime = localStorage.getItem('elapsedTime');
        const isRunning = localStorage.getItem('timerRunning') === 'true';
        const isPaused = localStorage.getItem('timerPaused') === 'true';

        console.log(savedStartTime, savedElapsedTime, isRunning, isPaused);

        if (isRunning && !isPaused) {
            console.log('isRunning && !isPaused');

            const now = new Date().getTime(); // aktuelle Zeit
            const startTime = parseInt(savedStartTime || '0', 10);

            // Berechne die verstrichene Zeit dynamisch basierend auf der Startzeit
            this.elapsedTime = Math.floor((now - startTime) / 1000);

            // Setze den Timer fort
            this.startTimer();
        } else if (isPaused && savedElapsedTime) {
            console.log('isPaused && savedElapsedTime');

            // Wenn der Timer pausiert ist, verstrichene Zeit aus dem LocalStorage übernehmen
            this.elapsedTime = parseInt(savedElapsedTime, 10);
            this.isTimerPaused = true;
        }
    }

    startTimer() {
        if (!this.isTimerRunning) {
            const currentTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden
            console.log('currentTime:', this.formatTime(currentTime));

            localStorage.setItem('timerRunning', 'true');
            this.isTimerRunning = true;

            // Timer-Intervall starten, um die verstrichene Zeit dynamisch zu berechnen
            this.timerInterval = setInterval(() => {

                // Start from zero
                const now = new Date().getTime();
                const startTime = parseInt(localStorage.getItem('timerStart') || '0', 10);
                this.elapsedTime = Math.floor((now - startTime) / 1000); // Verstrichene Zeit in Sekunden
                // console.log('this.runningTime:',this.runningTime);
                // Start now and add the time from the local-storage (when page-reload or closing the browser)


            }, 1000);
        }
    }

    pauseTimer() {
        if (this.isTimerRunning && !this.isTimerPaused) {
            clearInterval(this.timerInterval);
            const now = new Date().getTime();
            const startTime = parseInt(localStorage.getItem('timerStart') || '0', 10);
            const totalElapsedTime = Math.floor((now - startTime) / 1000); // Verstrichene Zeit in Sekunden

            // Verstrichene Zeit speichern
            localStorage.setItem('elapsedTime', totalElapsedTime.toString());
            localStorage.setItem('timerPaused', 'true');
            this.isTimerRunning = false;
            this.isTimerPaused = true;
        }
    }

    resumeTimer() {
        if (this.isTimerPaused) {
            const pausedTime = parseInt(localStorage.getItem('elapsedTime') || '0', 10);
            const currentTime = new Date().getTime();
            const newStartTime = currentTime - pausedTime * 1000;

            localStorage.setItem('timerStart', newStartTime.toString());
            localStorage.removeItem('timerPaused');

            this.isTimerPaused = false;
            this.isTimerRunning = true;

            this.timerInterval = setInterval(() => {
              const now = new Date().getTime();
              this.elapsedTime = Math.floor((now - newStartTime) / 1000);

              // Verstrichene Zeit NICHT im LocalStorage aktualisieren, da sie dynamisch berechnet wird
            }, 1000);
        }
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        localStorage.removeItem('timerStart');
        localStorage.removeItem('elapsedTime');
        localStorage.removeItem('timerRunning');
        localStorage.removeItem('timerPaused');

        this.isTimerRunning = false;
        this.isTimerPaused = false;
        this.elapsedTime = 0;
    }

    formatTime(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        // Stunden, Minuten und Sekunden immer zweistellig formatieren (z.B. 04 statt 4)
        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = secs < 10 ? '0' + secs : secs;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}
