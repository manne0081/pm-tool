export interface TeamMember {
    id: number;              // Eindeutige Mitarbeiter-ID
    firstName: string;                 // Vorname des Mitarbeiters
    lastName: string;                  // Nachname des Mitarbeiters
    email: string;                     // E-Mail-Adresse
    position: string;                  // Position des Mitarbeiters im Unternehmen
    department: string;                // Abteilung, in der der Mitarbeiter arbeitet
    hireDate: Date;                    // Einstellungsdatum
    status: string;                    // Beschäftigungsstatus (z.B. "Aktiv", "Inaktiv")

    isManager: boolean;                // Gibt an, ob der Mitarbeiter eine Führungsposition hat
    managerId?: number;                // ID des Vorgesetzten, falls zutreffend
    phone?: string;                    // Telefonnummer
    location?: string;                 // Arbeitsstandort (z.B. Bürostandort)
    profilePictureUrl?: string;        // URL zum Profilbild des Mitarbeiters
    birthday?: Date;                   // Geburtstag des Mitarbeiters
    isRemote?: boolean;                // Gibt an, ob der Mitarbeiter remote arbeitet
    notes?: string;                    // Zusätzliche Notizen zum Mitarbeiter

    standardScheduleId?: number; // Optional, falls nicht immer vorhanden
}

export const TEAMMEMBER_MOCK: TeamMember[] = [
    { id: 0, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', position: 'Software Engineer', department: 'Engineering', hireDate: new Date('2019-06-15'), status: 'Aktiv', isManager: false, phone: '+49 123 456789', location: 'Berlin', profilePictureUrl: 'https://example.com/profiles/john_doe.jpg', birthday: new Date('1990-04-23'), isRemote: true },
    { id: 1, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', position: 'Product Manager', department: 'Product', hireDate: new Date('2018-09-10'), status: 'Aktiv', isManager: true, managerId: 1, phone: '+49 987 654321', location: 'Hamburg', profilePictureUrl: 'https://example.com/profiles/jane_smith.jpg', birthday: new Date('1985-12-12'), isRemote: false },
    { id: 2, firstName: 'Alex', lastName: 'Johnson', email: 'alex.johnson@example.com', position: 'UX Designer', department: 'Design', hireDate: new Date('2021-01-05'), status: 'Aktiv', isManager: false, phone: '+49 321 654987', location: 'Berlin', profilePictureUrl: 'https://example.com/profiles/alex_johnson.jpg', birthday: new Date('1992-07-19'), isRemote: false },
    { id: 3, firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com', position: 'DevOps Engineer', department: 'Engineering', hireDate: new Date('2017-03-25'), status: 'Aktiv', isManager: false, phone: '+49 213 987456', location: 'Frankfurt', profilePictureUrl: 'https://example.com/profiles/michael_brown.jpg', birthday: new Date('1987-11-03'), isRemote: true },
    { id: 4, firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@example.com', position: 'HR Manager', department: 'Human Resources', hireDate: new Date('2016-08-17'), status: 'Aktiv', isManager: true, phone: '+49 432 156789', location: 'München', profilePictureUrl: 'https://example.com/profiles/emily_davis.jpg', birthday: new Date('1983-05-29'), isRemote: false },
    { id: 5, firstName: 'Robert', lastName: 'Miller', email: 'robert.miller@example.com', position: 'Marketing Specialist', department: 'Marketing', hireDate: new Date('2020-11-20'), status: 'Aktiv', isManager: false, phone: '+49 654 321987', location: 'Hamburg', profilePictureUrl: 'https://example.com/profiles/robert_miller.jpg', birthday: new Date('1991-08-15'), isRemote: true },
    { id: 6, firstName: 'Olivia', lastName: 'Wilson', email: 'olivia.wilson@example.com', position: 'Sales Manager', department: 'Sales', hireDate: new Date('2015-04-01'), status: 'Aktiv', isManager: true, phone: '+49 765 432198', location: 'Berlin', profilePictureUrl: 'https://example.com/profiles/olivia_wilson.jpg', birthday: new Date('1989-02-10'), isRemote: false },
    { id: 7, firstName: 'David', lastName: 'Martinez', email: 'david.martinez@example.com', position: 'IT Support Specialist', department: 'IT', hireDate: new Date('2019-07-22'), status: 'Aktiv', isManager: false, phone: '+49 876 543219', location: 'München', profilePictureUrl: 'https://example.com/profiles/david_martinez.jpg', birthday: new Date('1993-09-17'), isRemote: true },
    { id: 8, firstName: 'Sophia', lastName: 'Garcia', email: 'sophia.garcia@example.com', position: 'Finance Analyst', department: 'Finance', hireDate: new Date('2018-02-14'), status: 'Aktiv', isManager: false, phone: '+49 321 987654', location: 'Frankfurt', profilePictureUrl: 'https://example.com/profiles/sophia_garcia.jpg', birthday: new Date('1994-11-09'), isRemote: false },
    { id: 9, firstName: 'James', lastName: 'Clark', email: 'james.clark@example.com', position: 'Operations Manager', department: 'Operations', hireDate: new Date('2014-05-30'), status: 'Aktiv', isManager: true, phone: '+49 654 321654', location: 'Hamburg', profilePictureUrl: 'https://example.com/profiles/james_clark.jpg', birthday: new Date('1982-06-18'), isRemote: false },
    { id: 10, firstName: 'Emma', lastName: 'Harris', email: 'emma.harris@example.com', position: 'Content Writer', department: 'Marketing', hireDate: new Date('2022-03-10'), status: 'Aktiv', isManager: false, phone: '+49 789 456123', location: 'Berlin', profilePictureUrl: 'https://example.com/profiles/emma_harris.jpg', birthday: new Date('1995-01-25'), isRemote: true },
    { id: 11, firstName: 'Lucas', lastName: 'Lopez', email: 'lucas.lopez@example.com', position: 'Data Scientist', department: 'Data', hireDate: new Date('2021-12-01'), status: 'Aktiv', isManager: false, phone: '+49 654 789321', location: 'München', profilePictureUrl: 'https://example.com/profiles/lucas_lopez.jpg', birthday: new Date('1992-10-05'), isRemote: true },
    { id: 12, firstName: 'Liam', lastName: 'Rodriguez', email: 'liam.rodriguez@example.com', position: 'Legal Advisor', department: 'Legal', hireDate: new Date('2017-09-15'), status: 'Aktiv', isManager: false, phone: '+49 321 654987', location: 'Frankfurt', profilePictureUrl: 'https://example.com/profiles/liam_rodriguez.jpg', birthday: new Date('1988-03-28'), isRemote: false },
    { id: 13, firstName: 'Ava', lastName: 'Lee', email: 'ava.lee@example.com', position: 'Compliance Officer', department: 'Compliance', hireDate: new Date('2016-06-05'), status: 'Aktiv', isManager: false, phone: '+49 432 789654', location: 'Berlin', profilePictureUrl: 'https://example.com/profiles/ava_lee.jpg', birthday: new Date('1986-07-11'), isRemote: false },
    { id: 14, firstName: 'Mia', lastName: 'Martinez', email: 'mia.martinez@example.com', position: 'Recruiter', department: 'Human Resources', hireDate: new Date('2023-01-15'), status: 'Aktiv', isManager: false, phone: '+49 543 216987', location: 'München', profilePictureUrl: 'https://example.com/profiles/mia_martinez.jpg', birthday: new Date('1998-08-30'), isRemote: true }
];
