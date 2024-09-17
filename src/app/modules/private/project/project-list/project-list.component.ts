import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from '../../../../mocks/project-mock';
import { Client } from '../../../../mocks/client-mock';

import { DataService } from '../../../../core/services/data.service';
import { ProjectService } from '../project.service';
import { ClientService } from '../../client/client.service';

@Component({
    selector: 'app-project-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.scss'
})

export class ProjectListComponent implements OnInit {
    projectItems: Project[] = [];
    clientItems: Client[] = [];

    searchTerm: string = '';
    sortingTerm: string = '';

    selectedItemId: number | null = null;       // Needed for UI

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private clientService: ClientService,
        private dataService: DataService,
    ) {}

    ngOnInit(): void {
        // Get sortingTerm and SearchTerm from the url set to the variables
        // Load projects and clients
        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search'] || '';
            this.sortingTerm = (params['sort'] || '');      // for example: 'name-asc', 'name-desc', 'id-asc', 'id-desc'
            this.getProjectItems();
            this.getClientItems();
        });
    }

    /**
     * Subscribes the items from the mock-data
     */
    getProjectItems(): void {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            // Set data to items
            this.projectItems = data;
            // Call method to sort the items
            this.sortProjectItems();
            // If searchTerm exists, call method to filter the items
            if (this.searchTerm) {
                this.filterProjectItems();
            }
        });
    }

    /**
     * Sort the items
     */
    sortProjectItems(): void {
        this.projectItems = this.dataService.sortObjectItems(this.projectItems, this.sortingTerm);
    }

    /**
     * Filter the items
     */
    filterProjectItems(): void {
        this.projectItems = this.dataService.filterObjectItems(this.projectItems, this.searchTerm);
    }

    /**
     *
     */
    getClientItems(): void {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clientItems = data;
        });
    }

    /**
     * Use to show the client-name on the tile
     * @param clientId
     * @returns
     */
    getClientName(clientId: number): string | undefined {
        const client = this.clientItems.find(client => client.id === clientId);
        return client ? client.name : undefined;
    }

    /**
     * Use to show the infos at the ADD-INFO area
     * @param item
     */
    onSelectProject(item: any):void {
        this.selectedItemId = item.id                       // Needed for UI
        this.projectService.setSelectedObject(item);        // Needed for AddInfoArea
    }

    /**
     * Use to open the item on the detail-page
     * @param item
    */
    onOpenProject(item: any):void {
        this.router.navigate(['private/project', item.id]);     // Navigation zur Detailseite mit der ID
        this.projectService.setViewType('detail');              // Change ContentHeader to detail
    }

}
