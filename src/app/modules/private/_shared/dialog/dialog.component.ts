import { DIALOG_DATA, DialogRef, CdkDialogContainer } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'my-dialog-container',
    styles: [`
      :host {
        display: block;
        background: #orange;
        border-radius: 8px;
        padding: 16px;
      }
    `],
    templateUrl: './test.html',
})
class MyDialogContainer extends CdkDialogContainer {}

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
    ) {}

}
