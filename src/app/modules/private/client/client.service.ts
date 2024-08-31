import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Client, CLIENT_MOCK } from '../../../mocks/client-mock';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

    constructor() { }

    getClients(): Observable<Client[]> {
        return of(CLIENT_MOCK);
    }
}
