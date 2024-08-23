export interface HeaderMenu {
    id: number;
    name: string;
    title?: string;
    icon?: string;
}

export const HEADERMENU_MOCK: HeaderMenu[] = [
    { id: 0, name: 'search', icon: 'icon-search' },
    { id: 1, name: 'favorite', icon: 'icon-star' },
    { id: 2, name: 'dashboard', title: 'Dashboard', icon: 'icon-grid' },
    { id: 3, name: 'folder', title: 'Kunden' },
    { id: 4, name: 'project', title: 'Projekte' },
];

// menuItems: { name: string, iconClass: string, hasDropdown: boolean, hasTitle: boolean, title?: string, status?: string, showDropdown?: boolean, isFavorite?: boolean, buttonRef?: ElementRef, dropdownRef?: ElementRef, hasLink: boolean, route?: string } [] = [
//     { name: 'searching', iconClass: 'icon-search', hasDropdown: true, showDropdown: false, hasTitle: false, hasLink: false },
//     { name: 'favorites', iconClass: 'icon-star', hasDropdown: true, showDropdown: false, hasTitle: false, status: 'pre-active', isFavorite: true, hasLink: false },
//     { name: 'dashboard', iconClass: 'icon-grid', hasDropdown: false, hasTitle: true, title: 'Dashboard', status: 'active', hasLink: true, route: '/private/dashboard' },
//     { name: 'workspace', iconClass: 'icon-pencilwrench', hasDropdown: true, hasTitle: true, title: 'Workspace', showDropdown: false, status: 'post-active', hasLink: false },
//     { name: 'contacts', iconClass: 'icon-group', hasDropdown: true, hasTitle: true, title: 'Kontakte', showDropdown: false, hasLink: false },
//     { name: 'placeholder', iconClass: '', hasDropdown: true, showDropdown: false, hasTitle: false, hasLink: false },
// ]


export interface HeaderSubMenu {
    id: number;
    name: string;
}

export const HEADERSUBMENU_MOCK: HeaderSubMenu[] = [
    { id: 0, name: 'Gmbh / Name=desc' },
    { id: 1, name: 'task=web' },
    { id: 2, name: 'Unternehmen=Solution' },
];

// menuSubItems: { parentName: string, name: string, title: string, isFavorite: boolean, route: string, parentForMenuItemState: string } [] = [
//     { parentName: 'searching', name: 'searching', title: 'Test', isFavorite: false, route: '/private/searching', parentForMenuItemState: 'searching' },

//     { parentName: 'workspace', name: 'task', title: 'Aufgaben', isFavorite: false, route: '/private/task', parentForMenuItemState: 'workspace' },
//     { parentName: 'workspace', name: 'planner', title: 'Planner', isFavorite: false, route: '/private/planner', parentForMenuItemState: 'workspace' },
//     { parentName: 'workspace', name: 'campagne', title: 'Kampagnen', isFavorite: false, route: '/private/campagne', parentForMenuItemState: 'workspace' },
//     { parentName: 'workspace', name: 'email', title: 'E-Mail', isFavorite: false, route: '/private/email', parentForMenuItemState: 'workspace' },

//     { parentName: 'contacts', name: 'company', title: 'Unternehmen', isFavorite: false, route: '/private/company', parentForMenuItemState: 'contacts' },
//     { parentName: 'contacts', name: 'supplier', title: 'Lieferanten', isFavorite: false, route: '/private/supplier', parentForMenuItemState: 'contacts' },
//     { parentName: 'contacts', name: 'contact', title: 'Ansprechpartner', isFavorite: false, route: '/private/contact', parentForMenuItemState: 'contacts' },
//     { parentName: 'contacts', name: 'user', title: 'Benutzer', isFavorite: false, route: '/private/user', parentForMenuItemState: 'contacts' },
//     { parentName: 'contacts', name: 'module-auth', title: 'Modulberechtigungen', isFavorite: false, route: '/private/module-auth', parentForMenuItemState: 'contacts' },
//     { parentName: 'contacts', name: 'company-wiki', title: 'Unternehmens-Wiki', isFavorite: false, route: '/private/company-wiki', parentForMenuItemState: 'contacts' },
//     { parentName: 'contacts', name: 'debitor-data', title: 'Debitor Daten', isFavorite: false, route: '/private/debitor-data', parentForMenuItemState: 'contacts' },
//     { parentName: 'contacts', name: 'address', title: 'Adressen', isFavorite: false, route: '/private/address', parentForMenuItemState: 'contacts' },
// ]
