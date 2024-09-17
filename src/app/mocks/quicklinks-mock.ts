export interface Quicklinks {
    id: number;
    title: string;
    url: string;
    parent: string;
    menuTitle: string;
}

export const QUICKLINKS_MOCK: Quicklinks[] = [
    { id: 0, title: 'Name enth. web', url: 'project?search=web&sortingTerm=name-desc', parent: 'project', menuTitle: 'Projekt' },
    { id: 1, title: 'Name enth. we', url: 'project?search=we&sortingTerm=', parent: 'project', menuTitle: 'Projekt' },
    { id: 2, title: 'Name enth. Fin', url: 'client?search=fin&sortingTerm=', parent: 'client', menuTitle: 'Kunde' },
];
