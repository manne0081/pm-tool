import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientService } from '../client.service';
import { Client } from '../../../../mocks/client-mock';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../core/services/data.service';

@Component({
    selector: 'app-client-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './client-list.component.html',
    styleUrl: './client-list.component.scss'
})

export class ClientListComponent implements OnInit {
    clientItems: Client[] = [];

    searchTerm: string = '';
    sortingTerm: string = '';

    selectedItemId: number | null = null;       // Needed for UI

    constructor (
        private route: ActivatedRoute,
        private clientService: ClientService,
        private dataService: DataService,
    ) {}

    ngOnInit(): void {
        // Get sortingTerm and SearchTerm from the url and set them to the variables
        // Load clients
        this.route.queryParams.subscribe(params => {
            this.searchTerm = params['search'] || '';
            this.sortingTerm = (params['sort'] || '');      // for example: 'name-asc', 'name-desc', 'id-asc', 'id-desc'
            this.getClientItems();
        });
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getClientItems(): void {
        this.clientService.getClients().subscribe((data: Client[]) => {
            // Set data to items
            this.clientItems = data;
            // Call method to sort the items
            this.sortItems();
            // If searchTerm exists, call method to filter the items
            if (this.searchTerm) {
                this.filterItems();
            }
        });
    }

    /**
     * Sort the items
     */
    sortItems(): void {
        this.clientItems = this.dataService.sortObjectItems(this.clientItems, this.sortingTerm);
    }

    /**
     * Filter the items
     */
    filterItems(): void {
        this.clientItems = this.dataService.filterObjectItems(this.clientItems, this.searchTerm);
    }

    /**
     *
     * @param item
     */
    onSelectClient(item: any):void {
        this.selectedItemId = item.id                   // Needed for UI
        this.clientService.setSelectedObject(item);     // Needed for AddInfoArea
    }
}
