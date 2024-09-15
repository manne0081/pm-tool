import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientService } from '../client.service';
import { Client } from '../../../../mocks/client-mock';

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
    selectedItemId: number | null = null;

    constructor (
        private clientService: ClientService,
    ) {}

    ngOnInit(): void {
        this.getClientItems();
    }

    /**
     * Subscribes the Header-Menu-Items from the Mock-Data
     */
    getClientItems(): void {
        this.clientService.getClients().subscribe((data: Client[]) => {
            this.clientItems = data;
        });
    }

    onSelectClient(item: any):void {
        this.selectedItemId = item.id
        this.clientService.setSelectedObject(item);
    }
}
