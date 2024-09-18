export interface Quicklinks {
    id: number;
    title: string;
    url: string;
    parentName: string;
    menuName: string;
}

export const QUICKLINKS_MOCK: Quicklinks[] = [
    { id: 0, title: 'Projekt enth. pl', url: 'project?search=pl&sort=', parentName: 'project', menuName: 'projekt' },
    { id: 1, title: 'Projekt enth. web', url: 'project?search=web&sort=id-desc', parentName: 'project', menuName: 'projekt' },
    { id: 2, title: 'Kunde enth. he', url: 'client?search=he&sort=', parentName: 'client', menuName: 'client' },
    { id: 3, title: 'TM enth. john', url: 'teamMember?search=john&sort=name-asc', parentName: 'team', menuName: 'teamMember' },
];
