import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef, CdkDialogContainer } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { Quicklinks } from '../../../../../mocks/quicklinks-mock';

@Component({
    selector: 'app-dialog-quicklink-change',
    standalone: true,
    imports: [
        FormsModule,
    ],
    templateUrl: './dialog-quicklink-change.component.html',
    styleUrl: './dialog-quicklink-change.component.scss'
})

export class DialogQuicklinkChangeComponent {
    public editedQuicklink: Quicklinks;

    constructor(
        public dialogRef: DialogRef<Quicklinks>,
        @Inject(DIALOG_DATA) public data: { quicklink: Quicklinks },
    ) {
        this.editedQuicklink = { ...data.quicklink };
    }

    onSave(): void {
        this.dialogRef.close(this.editedQuicklink);
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
