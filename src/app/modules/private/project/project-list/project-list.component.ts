import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Project } from '../../../../mocks/project-mock';
import { Client } from '../../../../mocks/client-mock';

import { PrivateService } from '../../private.service';
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

    selectedItemId: number | null = null;       // Needed for UI

    constructor (
        private router: Router,
        private projectService: ProjectService,
        private clientService: ClientService,
    ) {}

    ngOnInit(): void {
        this.getProjectItems();
        this.getClientItems();
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getProjectItems(): void {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            this.projectItems = data;
        });
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
     * Use to show the infos at the ADD-INFO area
     * @param item
     */
    onSelectProject(item: any):void {
        this.selectedItemId = item.id       // Needed for UI
        this.projectService.setSelectedObject(item);
    }

    /**
     * Use to open the item on the detail-page
     * @param item
    */
    onOpenProject(item: any):void {
        this.router.navigate(['private/project', item.id]);     // Navigation zur Detailseite mit der ID
        this.projectService.setViewType('detail');    // Change ContentHeader to detail
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
}
