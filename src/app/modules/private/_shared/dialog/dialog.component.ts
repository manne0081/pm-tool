import { DIALOG_DATA, DialogRef, CdkDialogContainer } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    constructor(
        public dialogRef: DialogRef<string>,
        @Inject(DIALOG_DATA) public data: DialogData,
    ) {
        console.log('item: ', data.name);
    }

}
