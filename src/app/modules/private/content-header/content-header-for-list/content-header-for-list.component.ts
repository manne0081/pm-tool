import { Component, OnInit } from '@angular/core';

import { PrivateService } from '../../private.service';

@Component({
    selector: 'app-content-header-for-list',
    standalone: true,
    imports: [
    ],
    templateUrl: './content-header-for-list.component.html',
    styleUrl: './content-header-for-list.component.scss'
})

export class ContentHeaderForListComponent implements OnInit {
    fieldNamesForFilter?: string[];

    constructor(
        private privateService: PrivateService,
    ) {}

    ngOnInit(): void {
        this.privateService.fieldNamesForFilter$.subscribe(data => {
            this.fieldNamesForFilter = data;
            // console.log('contentheaderlist: ', this.fieldNamesForFilter);
        });
    }


}
