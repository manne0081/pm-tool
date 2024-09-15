import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateService } from '../private.service';

@Component({
    selector: 'app-add-info',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './add-info.component.html',
    styleUrl: './add-info.component.scss'
})

export class AddInfoComponent {
    addInfoObject: any

    constructor(
        private privateService: PrivateService,
    ) {}

    ngOnInit(): void {
        this.privateService.selectedObject$.subscribe(data => {
            this.addInfoObject = data;
        });
    }
}
