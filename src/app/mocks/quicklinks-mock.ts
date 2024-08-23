export interface Quicklinks {
    id: number;
    title: string;
    url: string;
    parent: string;
    menuTitle: string;
}

export const QUICKLINKS_MOCK: Quicklinks[] = [
    { id: 0, title: 'Gmbh / Name=desc', url: 'private/company?searchTerm=gmbh&sortingTerm=name-desc', parent: 'contacts', menuTitle: 'Unternehmen' },
    { id: 1, title: 'task=web', url: 'private/task?searchTerm=web&sortingTerm=', parent: 'workspace', menuTitle: 'Aufgaben' },
    { id: 2, title: 'Unternehmen=Solution', url: 'private/company?searchTerm=sol&sortingTerm=id-desc', parent: 'contacts', menuTitle: 'Unternehmen' },
];
