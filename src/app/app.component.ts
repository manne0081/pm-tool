import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
    title = 'PM-Tool';

    constructor(private overlayContainer: OverlayContainer) {}
}
