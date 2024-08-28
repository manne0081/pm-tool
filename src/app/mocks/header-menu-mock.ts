export interface HeaderMenu {
    [x: string]: any;
    id: number;
    name: string;
    hasDropdown: boolean;
    hasLink: boolean;

    title?: string;
    icon?: string;
    status?: string;
    showDropdown?: boolean;
    isFavorite?: boolean;
    route?: string
}

export const HEADERMENU_MOCK: HeaderMenu[] = [
    { id: 0, name: 'search', hasDropdown: true, hasLink: false, title: 'Suche', icon: 'icon-search', isFavorite: false, showDropdown: false },
    { id: 1, name: 'favorite', hasDropdown: true, hasLink: false, icon: 'icon-star', isFavorite: true, showDropdown: false, status: 'pre-active' },
    { id: 2, name: 'dashboard', hasDropdown: false, hasLink: true, title: 'Dashboard', icon: 'icon-grid', isFavorite: false, showDropdown: false, status: 'active', route: '/dashboard' },
    { id: 3, name: 'clients', hasDropdown: true, hasLink: false, title: 'Kunden', icon: 'icon-group', showDropdown: false, status: 'post-active', route: '/clients' },
    { id: 4, name: 'projects', hasDropdown: true, hasLink: false, title: 'Projekte', icon: 'icon-grid', showDropdown: false, route: '/projects' },
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
    parentName: string;
    title: string;
    route: string;

    isFavorite?: boolean;
}

export const HEADERSUBMENU_MOCK: HeaderSubMenu[] = [
    { id: 0, name: 'test-1', parentName: 'clients', title: 'TEST-1', route: 'test' },
    { id: 1, name: 'test-2', parentName: 'clients', title: 'TEST-2', route: 'test' },
    { id: 2, name: 'test-3', parentName: 'projects', title: 'TEST-3', route: 'test' },
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
