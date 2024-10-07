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
    startedTime: number = 0;
    elapsedTime: number = 0;
    isTimerRunning: boolean = false;
    isTimerPaused: boolean = false;
    timerInterval: any;

    ngOnInit() {
        /**
         * Usecases beim laden der Komponente:
         * - Der Timer läuft nicht > Nichts zu tun
         * - Der Timer lief als der Browser aktualisiert wurde > Die verstichene Zeit ermitteln, speichern und den Timer von neuem starten
         * - Der Timer ist pausiert als der Browser aktualisiert wurde > Nichts weiter zu tun (denke ich)
         */
        const isTimerRunning = localStorage.getItem('isRunning') === 'true';
        const isTimerPaused = localStorage.getItem('isPaused') === 'true';
        const savedStartTime = localStorage.getItem('startTime');
        const savedElapsedTime = localStorage.getItem('elapsedTime');

        console.log(isTimerRunning, isTimerPaused, savedStartTime, savedElapsedTime);

        if (!isTimerRunning && !isTimerPaused) {
            /**
             * Load Component and the isnt running or paused
             */
            console.log('nothing to do!');

        } else if (isTimerRunning && !isTimerPaused) {
            /**
             * Load component while the timer is running
            */
            console.log('isRunning && !isPaused');



            // const now = new Date().getTime(); // aktuelle Zeit
            // const startTime = parseInt(savedStartTime || '0', 10);
            // Berechne die verstrichene Zeit dynamisch basierend auf der Startzeit
            // this.elapsedTime = Math.floor((now - startTime) / 1000);
            // Setze den Timer fort
            // this.startTimer();

        } else if (!isTimerRunning && isTimerPaused) {
            /**
             * Load component while the timer is paused
             */
            console.log('isPaused && savedElapsedTime');

            this.isTimerRunning = false;
            this.isTimerPaused = true;
            this.elapsedTime = parseInt(savedElapsedTime || '0', 10);


            // this.elapsedTime = parseInt(savedElapsedTime, 10);
            // this.isTimerPaused = true;


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

            // console.log('localStorage:',
            //     localStorage.getItem('isRunning'),
            //     localStorage.getItem('startTime'),
            // );

            // Set timer-intervall
            this.timerInterval = setInterval(() => {
                const now = new Date().getTime();
                this.elapsedTime = Math.floor((now - this.startedTime) / 1000); // Verstrichene Zeit in Sekunden
            }, 1000);

        } else if (!this.isTimerRunning && this.isTimerPaused) {
            console.log('startTimer > resume after a breake');

            this.isTimerRunning = true;
            this.startedTime = new Date().getTime();








        } else {
            console.log('startTimer > from onInit');

        }
    }

    pauseTimer() {
        /**
         *
         */
        if (this.isTimerRunning && !this.isTimerPaused) {
            clearInterval(this.timerInterval);
            const now = new Date().getTime();
            const startTime = parseInt(localStorage.getItem('startTime') || '0', 10);
            const elapsedTime = Math.floor((now - startTime) / 1000); // Verstrichene Zeit in Sekunden

            // Saving elapsed time
            this.isTimerRunning = false;
            this.isTimerPaused = true;
            localStorage.setItem('isRunning', 'false');
            localStorage.setItem('isPaused', 'true');
            localStorage.setItem('elapsedTime', elapsedTime.toString());
        }
    }

    // resumeTimer() {
    //     if (this.isTimerPaused) {
    //         const pausedTime = parseInt(localStorage.getItem('elapsedTime') || '0', 10);
    //         const currentTime = new Date().getTime();
    //         const newStartTime = currentTime - pausedTime * 1000;

    //         localStorage.setItem('startTime', newStartTime.toString());
    //         localStorage.removeItem('isPaused');

    //         this.isTimerPaused = false;
    //         this.isTimerRunning = true;

    //         this.timerInterval = setInterval(() => {
    //           const now = new Date().getTime();
    //           this.elapsedTime = Math.floor((now - newStartTime) / 1000);

    //           // Verstrichene Zeit NICHT im LocalStorage aktualisieren, da sie dynamisch berechnet wird
    //         }, 1000);
    //     }
    // }

    stopTimer() {
        clearInterval(this.timerInterval);
        localStorage.removeItem('startTime');
        localStorage.removeItem('elapsedTime');
        localStorage.removeItem('isRunning');
        localStorage.removeItem('isPaused');

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
