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
    { id: 2, name: 'dashboard', hasDropdown: false, hasLink: true, title: 'Dashboard', icon: 'icon-grid', showDropdown: false, route: '/dashboard' },
    { id: 3, name: 'team', hasDropdown: true, hasLink: false, title: 'Team', icon: 'icon-group', showDropdown: false },
    { id: 4, name: 'client', hasDropdown: false, hasLink: true, title: 'Kunden', icon: 'icon-building', route: '/client' },
    { id: 5, name: 'project', hasDropdown: false, hasLink: true, title: 'Projekte', icon: 'icon-cubes', route: '/project' },
    { id: 6, name: 'placeholder', hasDropdown: false, hasLink: false },
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
    { id: 0, name: 'teamMember', parentName: 'team', title: 'Mitarbeiter', route: 'teamMember', parentForMenuItemState: 'team', markAsFavorite: true },
    { id: 1, name: 'timeModel', parentName: 'team', title: 'Zeitmodelle', route: 'workSchedule', parentForMenuItemState: 'team' },
    { id: 2, name: 'teamMember', parentName: 'favorites', title: 'Mitarbeiter', route: 'teamMember', parentForMenuItemState: 'team', markAsFavorite: true },
];
