export interface StandardWorkSchedule {
    id: number;
    name: string;                       // Name des Standardmodells (z.B. "Vollzeit", "Teilzeit")
    workDays: WorkDay[];                // Standard-Arbeitstage und Zeiten
}

export interface TeamMemberWorkSchedule {
    teamMemberId: number;               // Eindeutige ID des Mitarbeiters
    standardScheduleId?: number;        // Referenz auf ein Standard-Arbeitszeitmodell
    customWorkDays?: WorkDay[];         // Individuelle Anpassungen für diesen Mitarbeiter
}

export interface WorkDay {
    dayOfWeek: string;                  // Tag der Woche (z.B. "Monday", "Tuesday", ...)
    startTime: string;                  // Startzeit des Arbeitstages (z.B. "09:00")
    endTime: string;                    // Endzeit des Arbeitstages (z.B. "17:00")
    isWorkingDay: boolean;              // Gibt an, ob der Mitarbeiter an diesem Tag arbeitet
    breakTime?: string;                 // Optionale Zeit für eine Pause (z.B. "12:00-13:00")
}

export const STANDARD_WORKSCHEDULE_MOCK: StandardWorkSchedule[] = [
    {
        id: 0,
        name: "Vollzeit",
        workDays: [
            { dayOfWeek: "Monday", startTime: "07:00", endTime: "16:00", breakTime: "01:00", isWorkingDay: true },
            { dayOfWeek: "Tuesday", startTime: "07:00", endTime: "16:00", breakTime: "01:00", isWorkingDay: true },
            { dayOfWeek: "Wednesday", startTime: "07:00", endTime: "16:00", breakTime: "01:00", isWorkingDay: true },
            { dayOfWeek: "Thursday", startTime: "07:00", endTime: "16:00", breakTime: "01:00", isWorkingDay: true },
            { dayOfWeek: "Friday", startTime: "07:00", endTime: "16:00", breakTime: "01:00", isWorkingDay: true },
            { dayOfWeek: "Saturday", startTime: "", endTime: "", isWorkingDay: false },
            { dayOfWeek: "Sunday", startTime: "", endTime: "", isWorkingDay: false }
        ]
    },
    {
        id: 1,
        name: "Teilzeit",
        workDays: [
            { dayOfWeek: "Monday", startTime: "09:00", endTime: "13:15", breakTime: "00:15", isWorkingDay: true },
            { dayOfWeek: "Tuesday", startTime: "09:00", endTime: "13:15", breakTime: "00:15", isWorkingDay: true },
            { dayOfWeek: "Wednesday", startTime: "09:00", endTime: "13:15", breakTime: "00:15", isWorkingDay: true },
            { dayOfWeek: "Thursday", startTime: "09:00", endTime: "13:15", breakTime: "00:15", isWorkingDay: true },
            { dayOfWeek: "Friday", startTime: "09:00", endTime: "13:15", breakTime: "00:15", isWorkingDay: true },
            { dayOfWeek: "Saturday", startTime: "", endTime: "", isWorkingDay: false },
            { dayOfWeek: "Sunday", startTime: "", endTime: "", isWorkingDay: false }
        ]
    },
    {
        id: 2,
        name: "Flex / Mo. - Mi. / 3 x 8h",
        workDays: [
            { dayOfWeek: "Monday", startTime: "09:00", endTime: "17:45", breakTime: "00:45", isWorkingDay: true },
            { dayOfWeek: "Tuesday", startTime: "09:00", endTime: "17:45", breakTime: "00:45", isWorkingDay: true },
            { dayOfWeek: "Wednesday", startTime: "09:00", endTime: "17:45", breakTime: "00:45", isWorkingDay: true },
            { dayOfWeek: "Thursday", startTime: "", endTime: "", isWorkingDay: false },
            { dayOfWeek: "Friday", startTime: "", endTime: "", isWorkingDay: false },
            { dayOfWeek: "Saturday", startTime: "", endTime: "", isWorkingDay: false },
            { dayOfWeek: "Sunday", startTime: "", endTime: "", isWorkingDay: false }
        ]
    }
];

export const TEAMMEMBER_WORKSCHEDULE_MOCK: TeamMemberWorkSchedule[] = [
    {
        teamMemberId: 0,
        standardScheduleId: 0,  // Vollzeit
    },
    {
        teamMemberId: 1,
        standardScheduleId: 0,  // Vollzeit
    },
    {
        teamMemberId: 2,
        standardScheduleId: 1,  // Teilzeit
    },
    {
        teamMemberId: 3,
        standardScheduleId: 0,  // Vollzeit
        customWorkDays: [
            { dayOfWeek: "Friday", startTime: "08:00", endTime: "14:00", isWorkingDay: true }   // Angepasster Freitag
        ]
    },
    {
        teamMemberId: 4,
        standardScheduleId: 3,  // Flexibel
        customWorkDays: [
            { dayOfWeek: "Monday", startTime: "07:00", endTime: "14:00", isWorkingDay: true },
            { dayOfWeek: "Tuesday", startTime: "07:00", endTime: "16:00", isWorkingDay: true },
            { dayOfWeek: "Wednesday", startTime: "09:00", endTime: "17:00", isWorkingDay: true },
            { dayOfWeek: "Thursday", startTime: "08:00", endTime: "16:00", isWorkingDay: true },
            { dayOfWeek: "Friday", startTime: "07:00", endTime: "15:00", isWorkingDay: true }
        ]
    }
];
