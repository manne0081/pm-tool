import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    elapsedTime: number = 0;
    timerInterval: any;
    timerRunning: boolean = false;
    timerPaused: boolean = false;

    ngOnInit() {
        const savedStartTime = localStorage.getItem('timerStart');
        const savedElapsedTime = localStorage.getItem('elapsedTime');
        const isRunning = localStorage.getItem('timerRunning') === 'true';
        const isPaused = localStorage.getItem('timerPaused') === 'true';

        if (isRunning && !isPaused) {
            const now = new Date().getTime(); // aktuelle Zeit
            const startTime = parseInt(savedStartTime || '0', 10);

            // Berechne die verstrichene Zeit dynamisch basierend auf der Startzeit
            this.elapsedTime = Math.floor((now - startTime) / 1000);

            // Setze den Timer fort
            this.startTimer();
        } else if (isPaused && savedElapsedTime) {
            // Wenn der Timer pausiert ist, verstrichene Zeit aus dem LocalStorage übernehmen
            this.elapsedTime = parseInt(savedElapsedTime, 10);
            this.timerPaused = true;
        }
    }

    startTimer() {
        if (!this.timerRunning) {
            const currentTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden

            const savedStartTime = parseInt(localStorage.getItem('timerStart') || '0', 10);
            const savedElapsedTime = parseInt(localStorage.getItem('elapsedTime') || '0', 10);

            if (!savedStartTime) {
              // Wenn keine Startzeit gespeichert wurde, die Startzeit als aktuelle Zeit setzen
              localStorage.setItem('timerStart', currentTime.toString());
            } else {
              // Wenn eine verstrichene Zeit gespeichert wurde, neue Startzeit berechnen
              const adjustedStartTime = currentTime - savedElapsedTime * 1000;
              localStorage.setItem('timerStart', adjustedStartTime.toString());
            }

            localStorage.setItem('timerRunning', 'true');
            this.timerRunning = true;
            this.timerPaused = false;

            // Timer-Intervall starten, um die verstrichene Zeit dynamisch zu berechnen
            this.timerInterval = setInterval(() => {
              const now = new Date().getTime();
              const startTime = parseInt(localStorage.getItem('timerStart') || '0', 10);
              this.elapsedTime = Math.floor((now - startTime) / 1000); // Verstrichene Zeit in Sekunden

              // Verstrichene Zeit NICHT im LocalStorage aktualisieren, da sie dynamisch berechnet wird
            }, 1000);
        }
    }

    pauseTimer() {
        if (this.timerRunning && !this.timerPaused) {
            clearInterval(this.timerInterval);
            const now = new Date().getTime();
            const startTime = parseInt(localStorage.getItem('timerStart') || '0', 10);
            const totalElapsedTime = Math.floor((now - startTime) / 1000); // Verstrichene Zeit in Sekunden

            // Verstrichene Zeit speichern
            localStorage.setItem('elapsedTime', totalElapsedTime.toString());
            localStorage.setItem('timerPaused', 'true');
            this.timerPaused = true;
        }
    }

    resumeTimer() {
        if (this.timerPaused) {
            const pausedTime = parseInt(localStorage.getItem('elapsedTime') || '0', 10);
            const currentTime = new Date().getTime();
            const newStartTime = currentTime - pausedTime * 1000;

            localStorage.setItem('timerStart', newStartTime.toString());
            localStorage.removeItem('timerPaused');

            this.timerPaused = false;
            this.timerRunning = true;

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

        this.timerRunning = false;
        this.timerPaused = false;
        this.elapsedTime = 0;
    }

    formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
}
