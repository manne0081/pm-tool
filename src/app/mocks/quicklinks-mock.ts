export interface Quicklinks {
    id: number;
    title: string;
    url: string;
    menuItemName: string;
    parentName: string;
}

export const QUICKLINKS_MOCK: Quicklinks[] = [
    { id: 0, title: 'Projekt enth. pl', url: 'project?search=pl&sort=name-asc', menuItemName: 'project', parentName: 'project' },
    { id: 1, title: 'Projekt enth. web', url: 'project?search=web&sort=id-desc', menuItemName: 'project', parentName: 'project' },
    { id: 2, title: 'Kunde enth. he', url: 'client?search=he&sort=name-asc', menuItemName: 'client', parentName: 'client' },
    { id: 3, title: 'TM enth. john', url: 'teamMember?search=john&sort=name-desc', menuItemName: 'teamMember', parentName: 'team' },
];
