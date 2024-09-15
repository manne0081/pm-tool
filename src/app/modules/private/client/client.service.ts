import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Client, CLIENT_MOCK } from '../../../mocks/client-mock';
import { PrivateService } from '../private.service';


@Injectable({
    providedIn: 'root'
})

export class ClientService {

    constructor(
        private privateService: PrivateService,
    ) {}

    getClients(): Observable<Client[]> {
        return of(CLIENT_MOCK);
    }

    setSelectedObject(selectedObject: any): void {
        this.privateService.setSelectedObject(selectedObject);
    }
}
