export interface Quicklinks {
    id: number;
    title: string;
    url: string;
    parent: string;
    menuTitle: string;
}

export const QUICKLINKS_MOCK: Quicklinks[] = [
    { id: 0, title: 'Projekt enth. web', url: 'project?search=web&sort=', parent: 'project', menuTitle: 'Projekt' },
    { id: 1, title: 'Projekt enth. up', url: 'project?search=up&sort=id-desc', parent: 'project', menuTitle: 'Projekt' },
    { id: 2, title: 'Kunde enth. he', url: 'client?search=he&sort=', parent: 'client', menuTitle: 'Kunde' },
];
