import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-demo-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './demo-list.component.html',
    styleUrl: './demo-list.component.scss'
})

export class DemoListComponent {

    ngOnInit() {

    }

}
