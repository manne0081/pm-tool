import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [
        FormsModule,
    ],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})

export class DialogComponent {
    dialogRef = inject<DialogRef<string>>(DialogRef<string>);
    data = inject(DIALOG_DATA);
}
