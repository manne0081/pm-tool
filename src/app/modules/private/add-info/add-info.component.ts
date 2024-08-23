import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    @Input() addInfoObject: any;

    constructor() {
    }

    ngOnInit(): void {
        // console.log('add-info - ngOnInit: ');
        this.addInfoObject = null;
    }
}
