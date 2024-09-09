export interface Client {
    id: number;                 // Eindeutige Client-ID
    name: string;               // Name des Clients oder der Firma
    contactPerson: string;      // Name der Kontaktperson
    email: string;              // E-Mail-Adresse des Clients
    phoneNumber: string;        // Telefonnummer des Clients
    address: string;            // Adresse des Clients
    city: string;               // Stadt
    postCode: string;         // Postleitzahl
    country: string;            // Land
    industry: string;           // Branche, in der der Client tätig ist
    website?: string;           // Website des Clients (optional)
    notes?: string;             // Zusätzliche Notizen (optional)
    createdAt: Date;            // Datum der Erstellung des Client-Datensatzes
    updatedAt: Date;            // Datum der letzten Aktualisierung
}

export const clientFieldNames: (keyof Client)[] = ['id', 'name', 'contactPerson', 'email', 'phoneNumber', 'address', 'city', 'postCode', 'country',
    'industry', 'website', 'notes', 'createdAt', 'updatedAt'];

export const CLIENT_MOCK: Client[] = [
    { id: 0, name: "Acme Corp", contactPerson: "John Doe", email: "john.doe@acme.com", phoneNumber: "+49123456789", address: "123 Main St", city: "Berlin", postCode: "10115", country: "Germany", industry: "Manufacturing", createdAt: new Date("2023-01-01"), updatedAt: new Date("2023-08-01") },
    { id: 1, name: "Beta Solutions", contactPerson: "Jane Smith", email: "jane.smith@beta.com", phoneNumber: "+49123456780", address: "456 Elm St", city: "Munich", postCode: "80331", country: "Germany", industry: "IT Services", createdAt: new Date("2023-02-15"), updatedAt: new Date("2023-08-01") },
    { id: 2, name: "Gamma Enterprises", contactPerson: "Alice Johnson", email: "alice.johnson@gamma.com", phoneNumber: "+49123456781", address: "789 Oak St", city: "Hamburg", postCode: "20095", country: "Germany", industry: "Finance", createdAt: new Date("2023-03-10"), updatedAt: new Date("2023-08-01") },
    { id: 3, name: "Delta Technologies", contactPerson: "Bob Brown", email: "bob.brown@delta.com", phoneNumber: "+49123456782", address: "101 Pine St", city: "Frankfurt", postCode: "60311", country: "Germany", industry: "Technology", createdAt: new Date("2023-04-01"), updatedAt: new Date("2023-08-01") },
    { id: 4, name: "Epsilon Holdings", contactPerson: "Charlie Davis", email: "charlie.davis@epsilon.com", phoneNumber: "+49123456783", address: "202 Birch St", city: "Cologne", postCode: "50667", country: "Germany", industry: "Real Estate", createdAt: new Date("2023-05-20"), updatedAt: new Date("2023-08-01") },
    { id: 5, name: "Zeta Logistics", contactPerson: "Diane Evans", email: "diane.evans@zeta.com", phoneNumber: "+49123456784", address: "303 Cedar St", city: "Stuttgart", postCode: "70173", country: "Germany", industry: "Logistics", createdAt: new Date("2023-06-12"), updatedAt: new Date("2023-08-01") },
    { id: 6, name: "Eta Health", contactPerson: "Eve Foster", email: "eve.foster@eta.com", phoneNumber: "+49123456785", address: "404 Maple St", city: "Düsseldorf", postCode: "40213", country: "Germany", industry: "Healthcare", createdAt: new Date("2023-07-07"), updatedAt: new Date("2023-08-01") },
    { id: 7, name: "Theta Media", contactPerson: "Frank Green", email: "frank.green@theta.com", phoneNumber: "+49123456786", address: "505 Walnut St", city: "Bremen", postCode: "28195", country: "Germany", industry: "Media", createdAt: new Date("2023-08-01"), updatedAt: new Date("2023-08-01") },
    { id: 8, name: "Iota Finance", contactPerson: "Grace Harris", email: "grace.harris@iota.com", phoneNumber: "+49123456787", address: "606 Ash St", city: "Dresden", postCode: "01067", country: "Germany", industry: "Finance", createdAt: new Date("2023-02-11"), updatedAt: new Date("2023-08-01") },
    { id: 9, name: "Kappa Retail", contactPerson: "Henry Johnson", email: "henry.johnson@kappa.com", phoneNumber: "+49123456788", address: "707 Spruce St", city: "Leipzig", postCode: "04109", country: "Germany", industry: "Retail", createdAt: new Date("2023-01-25"), updatedAt: new Date("2023-08-01") },
    { id: 10, name: "Lambda Energy", contactPerson: "Ivy King", email: "ivy.king@lambda.com", phoneNumber: "+49123456789", address: "808 Poplar St", city: "Hannover", postCode: "30159", country: "Germany", industry: "Energy", createdAt: new Date("2023-03-30"), updatedAt: new Date("2023-08-01") },
    { id: 11, name: "Mu Construction", contactPerson: "Jack Lee", email: "jack.lee@mu.com", phoneNumber: "+49123456790", address: "909 Dogwood St", city: "Nuremberg", postCode: "90403", country: "Germany", industry: "Construction", createdAt: new Date("2023-04-14"), updatedAt: new Date("2023-08-01") },
    { id: 12, name: "Nu Automotive", contactPerson: "Karen Miller", email: "karen.miller@nu.com", phoneNumber: "+49123456791", address: "1010 Cherry St", city: "Essen", postCode: "45127", country: "Germany", industry: "Automotive", createdAt: new Date("2023-05-28"), updatedAt: new Date("2023-08-01") },
    { id: 13, name: "Xi Pharma", contactPerson: "Leo Nelson", email: "leo.nelson@xi.com", phoneNumber: "+49123456792", address: "1111 Sycamore St", city: "Dortmund", postCode: "44135", country: "Germany", industry: "Pharmaceuticals", createdAt: new Date("2023-06-20"), updatedAt: new Date("2023-08-01") },
    { id: 14, name: "Omicron Security", contactPerson: "Mona O'Connor", email: "mona.oconnor@omicron.com", phoneNumber: "+49123456793", address: "1212 Chestnut St", city: "Bochum", postCode: "44787", country: "Germany", industry: "Security", createdAt: new Date("2023-07-15"), updatedAt: new Date("2023-08-01") },
    { id: 15, name: "Pi Consulting", contactPerson: "Nina Patel", email: "nina.patel@pi.com", phoneNumber: "+49123456794", address: "1313 Pine St", city: "Bonn", postCode: "53111", country: "Germany", industry: "Consulting", createdAt: new Date("2023-08-01"), updatedAt: new Date("2023-08-01") },
    { id: 16, name: "Rho Telecom", contactPerson: "Oscar Quinn", email: "oscar.quinn@rho.com", phoneNumber: "+49123456795", address: "1414 Cedar St", city: "Mannheim", postCode: "68159", country: "Germany", industry: "Telecommunications", createdAt: new Date("2023-01-02"), updatedAt: new Date("2023-08-01") },
    { id: 17, name: "Sigma Insurance", contactPerson: "Paula Robinson", email: "paula.robinson@sigma.com", phoneNumber: "+49123456796", address: "1515 Elm St", city: "Karlsruhe", postCode: "76131", country: "Germany", industry: "Insurance", createdAt: new Date("2023-02-20"), updatedAt: new Date("2023-08-01") },
    { id: 18, name: "Tau Aviation", contactPerson: "Quincy Stevens", email: "quincy.stevens@tau.com", phoneNumber: "+49123456797", address: "1616 Oak St", city: "Freiburg", postCode: "79098", country: "Germany", industry: "Aviation", createdAt: new Date("2023-03-05"), updatedAt: new Date("2023-08-01") },
    { id: 19, name: "Upsilon Electronics", contactPerson: "Rita Thompson", email: "rita.thompson@upsilon.com", phoneNumber: "+49123456798", address: "1717 Maple St", city: "Aachen", postCode: "52062", country: "Germany", industry: "Electronics", createdAt: new Date("2023-04-25"), updatedAt: new Date("2023-08-01") }
];
