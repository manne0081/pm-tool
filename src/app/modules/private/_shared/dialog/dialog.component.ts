import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';

export interface DialogData {
    // animal: string;
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

    // constructor(
    //     @Inject(DIALOG_DATA) public data: { name: string },  // Hier wird `DialogData` injiziert
    //     private dialogRef: DialogRef<string>  // Hier gibst du den Rückgabewert `string` an
    // ) {}

    // closeDialog() {
    //     this.dialogRef.close('Dialog closed');  // Rückgabewert vom Typ `string`
    // }

    dialogRef = inject<DialogRef<string>>(DialogRef<string>);
    data = inject(DIALOG_DATA);
}
