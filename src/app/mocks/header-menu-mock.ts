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
    { id: 0, name: 'search', hasDropdown: true, hasLink: false, title: 'Suche', icon: 'icon-search', isFavorite: false, showDropdown: false },
    { id: 1, name: 'favorites', hasDropdown: true, hasLink: false, icon: 'icon-star', isFavorite: true, showDropdown: false, status: 'pre-active' },
    { id: 2, name: 'dashboard', hasDropdown: false, hasLink: true, title: 'Dashboard', icon: 'icon-grid', isFavorite: false, showDropdown: false, status: 'active', route: '/dashboard' },
    { id: 3, name: 'team', hasDropdown: true, hasLink: false, title: 'Team', icon: 'icon-group', showDropdown: false, status: 'post-active' },
    { id: 4, name: 'clients', hasDropdown: false, hasLink: true, title: 'Kunden', icon: 'icon-cube', route: '/clients' },
    { id: 5, name: 'projects', hasDropdown: false, hasLink: true, title: 'Projekte', icon: 'icon-cube', route: '/projects' },
    { id: 6, name: 'placeholder', hasDropdown: false, hasLink: false },
];


export interface HeaderSubMenu {
    id: number;
    name: string;
    parentName: string;
    title: string;
    route: string;

    isFavorite?: boolean;
    parentForMenuItemState?: string;
}

export const HEADERSUBMENU_MOCK: HeaderSubMenu[] = [
    { id: 0, name: 'team-members', parentName: 'team', title: 'Mitarbeiter', route: 'teamMember', isFavorite: false },
    { id: 1, name: 'time-model', parentName: 'team', title: 'Zeitmodelle', route: 'teamMember', isFavorite: false },
];
