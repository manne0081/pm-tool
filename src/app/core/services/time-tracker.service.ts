import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TimeTrackerServiceGlobal {
    // startTime: number = 0;
    // elapsedSeconds: number = 0;
    // isTimerRunning: boolean = false;
    // isTimerPaused: boolean = false;
    timerInterval: any;

    isRunning$ = new BehaviorSubject<boolean>(false);
    isPaused$ = new BehaviorSubject<boolean>(false);
    startedTime$ = new BehaviorSubject<number>(0);
    elapsedSeconds$ = new BehaviorSubject<number>(0);

    isAnyTimerActive$ = new BehaviorSubject<boolean>(false);
    activeTaskId$ = new BehaviorSubject<number>(0);

    constructor() {
        /**
         * Usecases beim laden der Komponente:
         * - Der Timer läuft nicht > Nichts zu tun
         * - Der Timer lief als der Browser aktualisiert wurde > Die verstichene Zeit ermitteln, speichern und den Timer von neuem starten
         * - Der Timer ist pausiert als der Browser aktualisiert wurde > Nichts weiter zu tun (denke ich)
         */

        const isRunning = localStorage.getItem('isRunning') === 'true';
        const isPaused = localStorage.getItem('isPaused') === 'true';
        const startedTime = parseInt(localStorage.getItem('startedTime') || '0', 10);
        const elapsedSeconds = parseInt(localStorage.getItem('elapsedSeconds') || '0', 10);
        const activeTaskId = Number(localStorage.getItem('activeTaskId')) || 0;

        // console.log('core > timeTrackerService \n isRunning:',this.isRunning$.getValue(), '\n isPaused:', this.isPaused$.getValue(),
        //                                       '\n startedTime:', this.startedTime$.getValue(), '\n elapsedSeconds:', this.elapsedSeconds$.getValue(),
        //                                       '\n isAnyTimerActive:', this.isAnyTimerActive$.getValue());

        if (!isRunning && !isPaused) {
            // console.log('Timer isn't running or paused, so nothing to do here!');

        } else if (isRunning && !isPaused) {
            // console.log('timer is running when reload');

            const now = new Date().getTime();
            const elapsedSeconds = Math.floor((now - startedTime) / 1000); // Verstrichene Zeit in Sekunden

            this.isRunning$.next(true);
            this.elapsedSeconds$.next(elapsedSeconds);
            this.startedTime$.next(startedTime);
            this.isAnyTimerActive$.next(true);
            this.activeTaskId$.next(activeTaskId);

            this.setTimerStart();

        } else if (!isRunning && isPaused) {
            this.isPaused$.next(isPaused);
            this.elapsedSeconds$.next(elapsedSeconds);
            this.isAnyTimerActive$.next(true);
        }
    }

    setTimerStart(taskId?: number) {
        /**
         * Usecases:
         * - Von 0 Starten
         * - Nach einer Pause fortsetzen
         * - Fortsetzen wenn der Browser neu geladen wird und die Zeit am laufen war
         * - Im Pause-Zustand bleiben, wenn beim neuladen des Browsers der Zustand auf Pause war
         */
        if (!this.isRunning$.getValue() && !this.isPaused$.getValue()) {
            console.log('startTimer > from zero');

            this.isRunning$.next(true);
            localStorage.setItem('isRunning', 'true');

            this.startedTime$.next(new Date().getTime());
            localStorage.setItem('startedTime', this.startedTime$.getValue().toString());

            this.isAnyTimerActive$.next(true);
            this.activeTaskId$.next(taskId!);
            localStorage.setItem('activeTaskId', taskId!.toString());


            this.timerInterval = setInterval(() => {
                const now = new Date().getTime();
                this.elapsedSeconds$.next(Math.floor((now - this.startedTime$.getValue()) / 1000));
            }, 1000);

        } else if (!this.isRunning$.getValue() && this.isPaused$.getValue()) {
            // console.log('startTimer > resume after a break');

            this.isRunning$.next(true);
            localStorage.setItem('isRunning', 'true');

            this.isPaused$.next(false);
            localStorage.setItem('isPaused', 'false');

            // Berechne die neue Startzeit unter Berücksichtigung der verstrichenen Zeit
            this.startedTime$.next(new Date().getTime() - (this.elapsedSeconds$.getValue() * 1000));
            localStorage.setItem('startedTime', this.startedTime$.getValue().toString());

            // Setze das Intervall mit der angepassten Startzeit
            this.timerInterval = setInterval(() => {
                const now = new Date().getTime();
                this.elapsedSeconds$.next(Math.floor((now - this.startedTime$.getValue()) / 1000));
            }, 1000);

        } else if (this.isRunning$.getValue() && !this.isPaused$.getValue()) {
            // console.log('startTimer > resume when timer is running and reload');

            clearInterval(this.timerInterval);

            // Hole die gespeicherte Startzeit und den Zustand des Timers
            const savedElapsedTime = this.elapsedSeconds$.getValue();

            // Berechne die aktuelle Startzeit, um die bereits verstrichene Zeit einzubeziehen
            this.startedTime$.next(new Date().getTime() - (savedElapsedTime * 1000));
            this.elapsedSeconds$.next(savedElapsedTime);

            // Timer auf "läuft" setzen
            this.isRunning$.next(true);

            this.timerInterval = setInterval(() => {
                const now = new Date().getTime();
                this.elapsedSeconds$.next(Math.floor((now - this.startedTime$.getValue()) / 1000));
            }, 1000);

        }
    }

    setTimerPause() {
        /**
         *
         */
        if (this.isRunning$.getValue() && !this.isPaused$.getValue()) {
            clearInterval(this.timerInterval);
            const now = new Date().getTime();
            const elapsedSeconds = Math.floor((now - this.startedTime$.getValue()) / 1000); // Verstrichene Zeit in Sekunden

            this.isRunning$.next(false);
            localStorage.setItem('isRunning', 'false');

            this.isPaused$.next(true);
            localStorage.setItem('isPaused', 'true');

            this.elapsedSeconds$.next(elapsedSeconds);
            localStorage.setItem('elapsedSeconds', elapsedSeconds.toString());
        }
    }

    setTimerStop() {
        clearInterval(this.timerInterval);
        localStorage.removeItem('isRunning');
        localStorage.removeItem('isPaused');
        localStorage.removeItem('startedTime');
        localStorage.removeItem('elapsedSeconds');
        localStorage.removeItem('activeTaskId');

        this.isRunning$.next(false);
        this.isPaused$.next(false);
        this.startedTime$.next(0);
        this.isAnyTimerActive$.next(false);
        this.activeTaskId$.next(0);
        this.elapsedSeconds$.next(0);
    }

    getIsTimerRunning() {
        return this.isRunning$.asObservable();
    }

    getIsTimerPaused() {
        return this.isPaused$.asObservable();
    }

    getStartedTime() {
        return this.startedTime$.asObservable();
    }

    getElapsedSeconds() {
        return this.elapsedSeconds$.asObservable();
    }

    getIsAnyTimerActive() {
        return this.isAnyTimerActive$.asObservable();
    }

    getActiveTaskId() {
        return this.activeTaskId$.asObservable();
    }

    getFormatedSeconds(seconds: number): string {
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
