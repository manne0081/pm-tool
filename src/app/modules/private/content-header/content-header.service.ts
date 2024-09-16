import { Injectable } from '@angular/core';
import { PrivateService } from '../private.service';

@Injectable({
    providedIn: 'root'
})

export class ContentHeaderService {

    constructor(
        private privateService: PrivateService
    ) {}

}
