export interface Project {
    id: number;                 // Eindeutige Projekt-ID
    name: string;               // Name des Projekts
    description: string;        // Beschreibung des Projekts
    clientId: number;           // ID des zugehörigen Clients
    startDate: Date;            // Startdatum des Projekts
    endDate?: Date;             // Enddatum des Projekts (optional)
    status: string;             // Status des Projekts (z.B. "In Progress", "Completed")
    budget: number;             // Budget für das Projekt
    spent: number;              // Bisher ausgegebenes Budget
    projectManager: string;     // Name des Projektmanagers
    teamMembers: string[];      // Liste der Teammitglieder
    milestones: string[];       // Liste der Meilensteine
    createdAt: Date;            // Datum der Erstellung des Projekts
    updatedAt: Date;            // Datum der letzten Aktualisierung
}

export const PROJECT_MOCK: Project[] = [
    { id: 0, name: "Website Redesign", description: "Redesign der Unternehmenswebsite", clientId: 1, startDate: new Date("2023-02-01"), endDate: new Date("2023-05-01"), status: "Completed", budget: 50000, spent: 48000, projectManager: "John Doe", teamMembers: ["Alice", "Bob"], milestones: ["Design Phase", "Development Phase"], createdAt: new Date("2023-01-15"), updatedAt: new Date("2023-05-01") },
    { id: 1, name: "Mobile App Development", description: "Entwicklung einer mobilen App", clientId: 2, startDate: new Date("2023-03-01"), status: "In Progress", budget: 80000, spent: 30000, projectManager: "Jane Smith", teamMembers: ["Charlie", "Dave"], milestones: ["Requirement Gathering", "Prototyping"], createdAt: new Date("2023-02-01"), updatedAt: new Date("2023-08-01") },
    { id: 2, name: "CRM Implementation", description: "Implementierung eines CRM-Systems", clientId: 3, startDate: new Date("2023-04-15"), status: "In Progress", budget: 120000, spent: 60000, projectManager: "Alice Johnson", teamMembers: ["Eve", "Frank"], milestones: ["System Setup", "Data Migration"], createdAt: new Date("2023-03-10"), updatedAt: new Date("2023-08-01") },
    { id: 3, name: "Data Migration", description: "Migration von Daten auf ein neues System", clientId: 4, startDate: new Date("2023-05-01"), status: "In Progress", budget: 70000, spent: 35000, projectManager: "Bob Brown", teamMembers: ["George", "Helen"], milestones: ["Data Mapping", "Data Transfer"], createdAt: new Date("2023-04-01"), updatedAt: new Date("2023-08-01") },
    { id: 4, name: "Network Upgrade", description: "Upgrade des Firmennetzwerks", clientId: 5, startDate: new Date("2023-06-01"), status: "In Progress", budget: 90000, spent: 45000, projectManager: "Charlie Davis", teamMembers: ["Ivan", "Jack"], milestones: ["Hardware Procurement", "Installation"], createdAt: new Date("2023-05-20"), updatedAt: new Date("2023-08-01") },
    { id: 5, name: "Market Research", description: "Durchführung einer Marktforschung", clientId: 6, startDate: new Date("2023-07-01"), status: "In Progress", budget: 60000, spent: 20000, projectManager: "Diane Evans", teamMembers: ["Kathy", "Liam"], milestones: ["Survey Design", "Data Analysis"], createdAt: new Date("2023-06-12"), updatedAt: new Date("2023-08-01") },
    { id: 6, name: "Product Launch", description: "Einführung eines neuen Produkts", clientId: 7, startDate: new Date("2023-08-01"), status: "Planned", budget: 150000, spent: 0, projectManager: "Eve Foster", teamMembers: ["Mona", "Nate"], milestones: ["Product Design", "Marketing Campaign"], createdAt: new Date("2023-07-07"), updatedAt: new Date("2023-08-01") },
    { id: 7, name: "Cloud Migration", description: "Migration der IT-Infrastruktur in die Cloud", clientId: 8, startDate: new Date("2023-09-01"), status: "Planned", budget: 200000, spent: 0, projectManager: "Frank Green", teamMembers: ["Olivia", "Paul"], milestones: ["Infrastructure Assessment", "Cloud Setup"], createdAt: new Date("2023-08-01"), updatedAt: new Date("2023-08-01") },
    { id: 8, name: "ERP Implementation", description: "Implementierung eines ERP-Systems", clientId: 9, startDate: new Date("2023-10-01"), status: "Planned", budget: 250000, spent: 0, projectManager: "Grace Harris", teamMembers: ["Quincy", "Rachel"], milestones: ["Requirement Gathering", "System Configuration"], createdAt: new Date("2023-02-11"), updatedAt: new Date("2023-08-01") },
    { id: 9, name: "Website Localization", description: "Lokalisierung der Unternehmenswebsite", clientId: 10, startDate: new Date("2023-11-01"), status: "Planned", budget: 40000, spent: 0, projectManager: "Henry Johnson", teamMembers: ["Sam", "Tina"], milestones: ["Content Translation", "SEO Optimization"], createdAt: new Date("2023-01-25"), updatedAt: new Date("2023-08-01") },
    { id: 10, name: "AI Integration", description: "Integration von KI in bestehende Systeme", clientId: 11, startDate: new Date("2023-03-01"), status: "In Progress", budget: 300000, spent: 150000, projectManager: "Ivy King", teamMembers: ["Uma", "Vince"], milestones: ["Data Preparation", "Model Training"], createdAt: new Date("2023-03-30"), updatedAt: new Date("2023-08-01") },
    { id: 11, name: "Supply Chain Optimization", description: "Optimierung der Lieferkette", clientId: 12, startDate: new Date("2023-04-15"), status: "In Progress", budget: 120000, spent: 60000, projectManager: "Jack Lee", teamMembers: ["Will", "Xander"], milestones: ["Process Analysis", "Implementation"], createdAt: new Date("2023-04-14"), updatedAt: new Date("2023-08-01") },
    { id: 12, name: "Mobile Payment Integration", description: "Integration von mobilen Zahlungsmethoden", clientId: 13, startDate: new Date("2023-05-01"), status: "In Progress", budget: 90000, spent: 45000, projectManager: "Karen Miller", teamMembers: ["Yara", "Zack"], milestones: ["API Development", "Testing"], createdAt: new Date("2023-05-28"), updatedAt: new Date("2023-08-01") },
    { id: 13, name: "Customer Support Automation", description: "Automatisierung des Kundensupports", clientId: 14, startDate: new Date("2023-06-01"), status: "In Progress", budget: 50000, spent: 25000, projectManager: "Leo Nelson", teamMembers: ["Adam", "Beth"], milestones: ["Chatbot Development", "Integration"], createdAt: new Date("2023-06-20"), updatedAt: new Date("2023-08-01") },
    { id: 14, name: "Digital Transformation", description: "Digitale Transformation des Unternehmens", clientId: 15, startDate: new Date("2023-07-01"), status: "In Progress", budget: 400000, spent: 200000, projectManager: "Mona O'Connor", teamMembers: ["Carl", "Diana"], milestones: ["Process Review", "Technology Upgrade"], createdAt: new Date("2023-07-15"), updatedAt: new Date("2023-08-01") },
    { id: 15, name: "Marketing Automation", description: "Automatisierung des Marketings", clientId: 16, startDate: new Date("2023-08-01"), status: "Planned", budget: 80000, spent: 0, projectManager: "Nina Patel", teamMembers: ["Eli", "Fiona"], milestones: ["Email Campaign Setup", "Social Media Automation"], createdAt: new Date("2023-08-01"), updatedAt: new Date("2023-08-01") },
    { id: 16, name: "Cybersecurity Enhancement", description: "Verbesserung der Cybersicherheit", clientId: 17, startDate: new Date("2023-09-01"), status: "Planned", budget: 100000, spent: 0, projectManager: "Oscar Quinn", teamMembers: ["George", "Hannah"], milestones: ["Vulnerability Assessment", "Implementation"], createdAt: new Date("2023-01-02"), updatedAt: new Date("2023-08-01") },
    { id: 17, name: "E-commerce Platform", description: "Entwicklung einer E-Commerce-Plattform", clientId: 18, startDate: new Date("2023-10-01"), status: "Planned", budget: 200000, spent: 0, projectManager: "Paula Robinson", teamMembers: ["Ivy", "Jack"], milestones: ["Platform Development", "Launch"], createdAt: new Date("2023-02-20"), updatedAt: new Date("2023-08-01") },
    { id: 18, name: "Blockchain Integration", description: "Integration von Blockchain-Technologie", clientId: 19, startDate: new Date("2023-11-01"), status: "Planned", budget: 150000, spent: 0, projectManager: "Quincy Stevens", teamMembers: ["Kim", "Liam"], milestones: ["Technology Selection", "Integration"], createdAt: new Date("2023-03-05"), updatedAt: new Date("2023-08-01") },
    { id: 19, name: "AI-Powered Analytics", description: "Entwicklung einer KI-gestützten Analyseplattform", clientId: 20, startDate: new Date("2023-12-01"), status: "Planned", budget: 300000, spent: 0, projectManager: "Rita Thompson", teamMembers: ["Mia", "Noah"], milestones: ["Data Collection", "Model Training"], createdAt: new Date("2023-04-25"), updatedAt: new Date("2023-08-01") }
];
