import { ElementRef } from "@angular/core";
export interface HeaderMenu {
    id: number;
    name: string;
    hasDropdown: boolean;
    hasLink: boolean;
    title?: string;
    icon?: string;
    status?: string;
    showDropdown?: boolean;
    isFavorite?: boolean;
    route?: string;
    buttonRef?: ElementRef;
    dropdownRef?: ElementRef;
}

export const HEADERMENU_MOCK: HeaderMenu[] = [
    { id: 0, name: 'searching', hasDropdown: true, hasLink: false, title: 'Suche', icon: 'icon-search', showDropdown: false },
    { id: 1, name: 'favorite', hasDropdown: true, hasLink: false, icon: 'icon-star', showDropdown: false, isFavorite: true },
    { id: 2, name: 'dashboard', hasDropdown: false, hasLink: true, title: 'Dashboard', icon: 'icon-grid', showDropdown: false, route: 'dashboard' },
    { id: 3, name: 'task', hasDropdown: true, hasLink: false, title: 'Aufgaben', icon: 'icon-box-filled', showDropdown: false },
    { id: 4, name: 'team', hasDropdown: true, hasLink: false, title: 'Team', icon: 'icon-group', showDropdown: false },
    { id: 5, name: 'client', hasDropdown: false, hasLink: true, title: 'Kunden', icon: 'icon-building', route: 'client' },
    { id: 6, name: 'project', hasDropdown: false, hasLink: true, title: 'Projekte', icon: 'icon-cubes', route: 'project' },
    { id: 7, name: 'placeholder', hasDropdown: false, hasLink: false },
];

export interface HeaderSubMenu {
    id: number;
    name: string;
    parentName: string;     // can be favorite, the parent for the headermenu-ui is the parentForMenuItemState
    title: string;
    route: string;
    parentForMenuItemState: string;
    markAsFavorite?: boolean;
}

export const HEADERSUBMENU_MOCK: HeaderSubMenu[] = [
    { id: 0, name: 'task', parentName: 'task', title: 'Tickets', route: 'demo', parentForMenuItemState: 'task', markAsFavorite: false },
    { id: 1, name: 'calendar', parentName: 'task', title: 'Kalender', route: 'demo', parentForMenuItemState: 'task', markAsFavorite: false },
    { id: 2, name: 'message', parentName: 'task', title: 'Nachrichten', route: 'demo', parentForMenuItemState: 'task', markAsFavorite: false },
    { id: 3, name: 'teamMember', parentName: 'team', title: 'Mitarbeiter', route: 'teamMember', parentForMenuItemState: 'team', markAsFavorite: false },
    { id: 4, name: 'workSchedule', parentName: 'team', title: 'Zeitmodelle', route: 'workSchedule', parentForMenuItemState: 'team', markAsFavorite: false },
];
