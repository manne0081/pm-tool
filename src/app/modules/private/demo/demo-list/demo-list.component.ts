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
    startTime: number = 0;
    elapsedTime: number = 0;
    timerInterval: any;
    isTimerRunning: boolean = false;
    isTimerPaused: boolean = false;

    ngOnInit() {
        const isRunning = localStorage.getItem('isTimerRunning') === 'true';
        const isPaused = localStorage.getItem('isTimerPaused') === 'true';
        const savedStartTime = localStorage.getItem('startTime');
        const savedElapsedTime = localStorage.getItem('elapsedTime'); // maybe needed?

        console.log(isRunning, isPaused, savedStartTime, savedElapsedTime);

        if (isRunning && !isPaused) {
            console.log('isRunning && !isPaused');

            const now = new Date().getTime(); // aktuelle Zeit
            const startTime = parseInt(savedStartTime || '0');

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
            console.log('startTimer > from zero');
            const currentTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden

            this.startTime = currentTime;
            this.isTimerRunning = true;

            localStorage.setItem('isTimerRunning', 'true');
            localStorage.setItem('startTime', currentTime.toString());

            console.log('localStorage:',
                localStorage.getItem('isTimerRunning'),
                localStorage.getItem('startTime'),
            );

            // Timer-Intervall starten, um die verstrichene Zeit dynamisch zu berechnen
            this.timerInterval = setInterval(() => {
                const now = new Date().getTime();
                // const startTime = parseInt(localStorage.getItem('timerStart') || '0', 10);
                this.elapsedTime = Math.floor((now - this.startTime) / 1000); // Verstrichene Zeit in Sekunden
            }, 1000);
        } else {
            console.log('startTimer > from onInit');
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

    formatTime(seconds: number): string {
        // Zeitstempel in Millisekunden
        const timestampMs = seconds;

        // Erstelle ein neues Date-Objekt basierend auf dem Zeitstempel
        const date = new Date(timestampMs);

        // Formatter für die Zeitzone Europa/Berlin
        const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Berlin',
        hour12: false // 24-Stunden-Format
        };

        // Formatierte Zeit ausgeben
        const formattedTime = new Intl.DateTimeFormat('de-DE', options).format(date);
        return formattedTime
    }
}
