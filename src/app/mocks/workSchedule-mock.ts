export interface WorkSchedule {
    employeeId: number;                    // Eindeutige ID des Mitarbeiters
    scheduleHistory: ScheduleVersion[];    // Historie der Arbeitszeitmodelle
}

export interface ScheduleVersion {
    versionId: number;                     // Eindeutige ID der Arbeitszeitversion
    effectiveFrom: Date;                   // Datum, ab dem dieses Modell gültig ist
    effectiveTo?: Date;                    // Optionales Datum, bis wann dieses Modell gültig war (offen für das aktuelle Modell)
    workDays: WorkDay[];                   // Liste von Arbeitstagen mit spezifischen Arbeitsstunden
}

export interface WorkDay {
    dayOfWeek: string;                     // Tag der Woche (z.B. "Monday", "Tuesday", ...)
    startTime: string;                     // Startzeit des Arbeitstages (z.B. "09:00")
    endTime: string;                       // Endzeit des Arbeitstages (z.B. "17:00")
    isWorkingDay: boolean;                 // Gibt an, ob der Mitarbeiter an diesem Tag arbeitet
    breakTime?: string;                    // Optionale Zeit für eine Pause (z.B. "12:00-13:00")
}

export const WORKSCHEDULE_MOCK: WorkSchedule[] = [
    {
        employeeId: 1,
        scheduleHistory: [
            {
                versionId: 1,
                effectiveFrom: new Date('2022-01-01'),
                effectiveTo: new Date('2022-06-30'),
                workDays: [
                    { dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00', isWorkingDay: true },
                    { dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '18:00', isWorkingDay: true },
                    { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '15:00', isWorkingDay: true },
                    { dayOfWeek: 'Thursday', startTime: '09:00', endTime: '17:00', isWorkingDay: true },
                    { dayOfWeek: 'Friday', startTime: '08:00', endTime: '14:00', isWorkingDay: true },
                    { dayOfWeek: 'Saturday', isWorkingDay: false, startTime: '', endTime: '' },
                    { dayOfWeek: 'Sunday', isWorkingDay: false, startTime: '', endTime: '' },
                ]
            },
            {
                versionId: 2,
                effectiveFrom: new Date('2022-07-01'),
                workDays: [
                    { dayOfWeek: 'Monday', startTime: '08:00', endTime: '16:00', isWorkingDay: true },
                    { dayOfWeek: 'Tuesday', startTime: '08:00', endTime: '16:00', isWorkingDay: true },
                    { dayOfWeek: 'Wednesday', startTime: '08:00', endTime: '16:00', isWorkingDay: true },
                    { dayOfWeek: 'Thursday', startTime: '08:00', endTime: '16:00', isWorkingDay: true },
                    { dayOfWeek: 'Friday', startTime: '08:00', endTime: '14:00', isWorkingDay: true },
                    { dayOfWeek: 'Saturday', isWorkingDay: false, startTime: '', endTime: '' },
                    { dayOfWeek: 'Sunday', isWorkingDay: false, startTime: '', endTime: '' },
                ]
            }
        ]
    }
];

